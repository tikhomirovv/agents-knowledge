---
name: vikunja-api
description: >-
  Interacts with Vikunja (self-hosted or cloud) via its REST API to manage tasks, projects, labels, and related resources. Uses VIKUNJA_BASE_URL and VIKUNJA_TOKEN from the process environment; fetches /api/v1/docs.json only when the conversation lacks enough API detail for the request. On failed requests, diagnoses missing config and points to persistent (global) env setup. Use when the user mentions Vikunja, wants task/project CRUD, imports, or API operations against their Vikunja instance.
license: MIT
compatibility: >-
  Any OS where the agent can run shell commands. Prefers curl (including curl.exe on Windows 10+); falls back to PowerShell Invoke-RestMethod on Windows if curl is unavailable.
---

# Vikunja API

Operate on **Vikunja** through its **HTTP API** (`/api/v1`). Prefer **existing conversation context** (paths, payloads, prior successful calls) when it is enough for the current request. If context is **insufficient** or **contradicted** by errors, align calls with the instance **OpenAPI** document (**§3**).

## 0. Default workflow (no pre-flight confirmation)

**Do not** start with a dedicated “check env vars only” shell command. That pattern wastes turns and may trigger unnecessary **confirmations** in the host environment.

Instead:

1. **Go straight to the user’s goal** — build the request using `VIKUNJA_BASE_URL` and `VIKUNJA_TOKEN` from the **same shell** the agent already uses (e.g. expand `$env:VIKUNJA_BASE_URL` in PowerShell, `$VIKUNJA_BASE_URL` in bash).
2. **Normalize base URL** when composing URLs: trim spaces; strip trailing `/`. Never put `/api/v1` inside the env value — append paths below.
3. **OpenAPI (`docs.json`) — only when needed:** fetch **§3** if the **current conversation** does not already give you enough to call the right **path, method, query, and body** for this request. If you already have that knowledge (from earlier in the thread, from the user’s pasted snippet, or from a prior successful call on the same base URL for the same operation type), **skip** downloading the spec to save time and tokens.
4. **Only if something fails** (see **§0.1**): run **diagnosis** and user guidance — especially **§6 (persistent / global first)**. Do not ask the user to paste secrets into chat.

### 0.1 What counts as failure (then diagnose)

Run **env verification** (see **§0.1** steps) and **§6** only after one of these:

- HTTP **401** / **403**, or missing/invalid auth behavior from the API.
- Network errors (unreachable host, DNS, TLS), or **obviously wrong** URL (e.g. empty host after expanding env).
- Shell/command errors that indicate **unset** variables (e.g. empty expansion, `curl` URL is empty).
- Repeated **404** on `/api/v1/...`, or **400** with unclear validation — if you still lack a reliable path/body from context, **then** fetch **§3** before retrying; also verify base URL is the **instance origin**, not a subpath.

**Diagnosis steps (after failure):**

1. Determine OS (see **§4**).
2. Verify `VIKUNJA_BASE_URL` and `VIKUNJA_TOKEN` exist and are non-empty in **that** shell **without** printing token value (e.g. test length / `Test-Path` style checks, or “is blank” only).
3. Tell the user **which** variable is missing or which class of error it is (`401` vs network vs blank URL).
4. Give **§6**: recommend **persistent user-level** (or system-level) setup for their OS; mention opening a **new shell** or restarting the **agent host process** after changing user/machine variables so it picks up updates.

**Optional quick test (only when §6 was applied):** user may set vars for **current session** once to verify — see **§6** “Quick session-only test” at the end.

## 1. Environment variables (reference)

| Variable | Meaning |
|----------|---------|
| `VIKUNJA_BASE_URL` | Instance **origin** only (scheme + host, optional port). **No** path suffix. Examples: `https://tasks.example.com`, `http://localhost:3456`. |
| `VIKUNJA_TOKEN` | API token from Vikunja UI: **Settings → API Tokens**. Sent as `Authorization: Bearer <token>`. |

These are read **implicitly** when issuing HTTP requests. Formal “are they set?” checks belong in **§0.1**, not before the first attempt.

## 2. Token scope, expiry, and errors

- **Effective permissions** depend entirely on the **Vikunja user** tied to that token and instance policies. The agent cannot “elevate” rights.
- Tokens can be **revoked** or **expire** (per instance / admin rules). `401` / `403` may mean wrong token, expired token, or insufficient rights — say that plainly; suggest checking **Settings → API Tokens** and token scopes/labels if the UI offers them.
- Do not blame Vikunja for “broken API” until configuration and auth are ruled out (**§0.1** + **§6**).

## 3. OpenAPI specification (when you need it)

The live spec is **canonical** whenever you choose to load it — but loading it is **optional** if **§3.1** says you can skip.

- **Spec URL:** `{VIKUNJA_BASE_URL}/api/v1/docs.json`
- **Interactive docs (human):** `{VIKUNJA_BASE_URL}/api/v1/docs`

### 3.1 When to fetch `docs.json` (and when not to)

**Fetch** (`GET` the JSON) when **any** of these holds:

- You are **not sure** which endpoint, HTTP method, required fields, or query parameters apply.
- The user asks for something **niche** (views, buckets, webhooks, migrations, etc.) and you have **no** matching detail in the thread.
- An API response indicates **wrong shape** (e.g. unexpected **404** / **400** / empty list when the user expects data) and you do **not** already have the correct contract in context.

**Skip the fetch** when **all** of these hold:

- The conversation already contains **enough** concrete API usage for this step (your own or the user’s), **or** you are repeating the **same** operation pattern on the **same** `VIKUNJA_BASE_URL` you already used successfully earlier in the thread.

**Workflow after you decide to fetch:**

1. `GET` `docs.json` with the same `Authorization: Bearer` header used for API calls (sending the header is fine even if docs are public).
2. Use it to choose **paths, methods, query params, and request bodies**.
3. If `docs.json` cannot be fetched: treat as **failure** → **§0.1** (may be bad base URL, network, or auth).

## 4. HTTP client by operating system

Detect OS from the shell the agent uses (e.g. `uname` on Unix; `$IsWindows` / `cmd /c ver` on Windows).

| OS family | Preferred tool | Notes |
|-----------|----------------|--------|
| **Windows** | `curl.exe` | Prefer **curl.exe** (bundled on Windows 10+). Use `-sS` for scriptable output. |
| **Windows (fallback)** | PowerShell `Invoke-RestMethod` / `Invoke-WebRequest` | When `curl.exe` is missing or blocked. Headers: `-Headers @{ Authorization = "Bearer $env:VIKUNJA_TOKEN" }`. |
| **Linux / macOS** | `curl` | Standard `-sS -H` patterns. |

**Always** send for JSON APIs unless the spec says otherwise:

```http
Authorization: Bearer <VIKUNJA_TOKEN>
Accept: application/json
Content-Type: application/json
```

**Safety:** avoid printing full tokens in transcripts; redact in logs/examples.

### 4.1 Rich text: what format to send (`description`, `comment`, …)

`docs.json` models these fields as plain **`string`** — it does **not** say “Markdown” or “HTML”. In practice the Vikunja **web UI** uses a **rich-text editor (Tiptap)** for long-form text, and values are stored and returned as **HTML fragments** (you will see tags like `<p>`, `<ul>`, `<li>`, `<strong>`, `<a href="…">` on tasks fetched via the API). Markdown-style typing or paste in the **browser** may be converted by the editor, but **do not rely on raw Markdown** in JSON API bodies for layout: bullets like `•`, lines starting with `-`, or `**bold**` will usually show as **plain text** unless you send HTML.

**When creating or updating via the API** and the user expects lists, emphasis, or links, put **HTML** in the payload (keep tags minimal and well-formed; escape quotes inside JSON).

| Model (OpenAPI) | Field | Typical use |
|-----------------|-------|-------------|
| `models.Task` | `description` | Task body text in the UI |
| `models.TaskComment` | `comment` | Thread under a task (`PUT /tasks/{taskID}/comments` to create; `POST /tasks/{taskID}/comments/{commentID}` to update) |
| `models.Project` | `description` | Project blurb — **same HTML pattern** when the instance shows a rich editor (if unsure, `GET` a project edited in the UI and mirror its markup) |
| `models.Team` | `description` | Team description — treat like project when rich text is used in UI |

Titles, labels, filter queries, and similar **short strings** are plain text, not HTML.

**Windows + `curl.exe`:** avoid fragile inline `-d '{"comment":"…"}'` in PowerShell; write the JSON body to a **UTF-8 file** and use `--data-binary "@path"` so HTML and Cyrillic are not mangled.

**Official context (UI):** [Vikunja help — Tasks](https://vikunja.io/help/tasks). OpenAPI field types alone do not document the rich-text wire format; align with HTML as returned by `GET` on real entities when in doubt.

## 5. Executing the user’s task

1. Follow **§0** — attempt the task immediately; no standalone env pre-check.
2. Apply **§3.1**: fetch `docs.json` **only** if the thread does not already give you enough API knowledge; otherwise proceed with calls directly.
3. Call the minimal set of endpoints (list → detail/mutate as needed).
4. Summarize outcomes in plain language. On HTTP errors, include status and a short message from the body when present; if that leads to **§0.1**, add **§6** guidance. If the error suggests a **wrong or unknown contract**, fetch **§3** (if not loaded yet) before blind retries.

## 6. Setting variables globally (recommended)

**Prefer persistent configuration** so the user does not re-export variables every session. Give **only** the subsection that matches their OS.

### Windows — recommended: persist for your user (PowerShell)

```powershell
[System.Environment]::SetEnvironmentVariable("VIKUNJA_BASE_URL", "https://your-instance.example", "User")
[System.Environment]::SetEnvironmentVariable("VIKUNJA_TOKEN", "your-token-here", "User")
```

Then **restart the process that runs the agent** (or at least open a **new** terminal in the same user session) so new processes inherit **User** variables.

### Windows — GUI (same effect as User scope)

**Settings → System → About → Advanced system settings → Environment Variables** → under **User variables** → New: `VIKUNJA_BASE_URL`, `VIKUNJA_TOKEN`. Restart the agent host or open a new terminal afterward so variables are visible.

### Windows — all users on the machine (optional, elevated)

```powershell
[System.Environment]::SetEnvironmentVariable("VIKUNJA_BASE_URL", "https://your-instance.example", "Machine")
[System.Environment]::SetEnvironmentVariable("VIKUNJA_TOKEN", "your-token-here", "Machine")
```

Run PowerShell **as Administrator**. **Security:** `Machine` variables are visible broadly — prefer **User** scope unless there is a clear shared-machine need.

### Linux — persistent for your user

Add to `~/.profile`, `~/.bashrc`, or `~/.config/environment.d/*.conf` (depends on distro/DE):

```bash
export VIKUNJA_BASE_URL="https://your-instance.example"
export VIKUNJA_TOKEN="your-token-here"
```

Log out/in or restart the session manager (or the service that spawns the agent) so GUI and new shells pick them up where applicable.

### macOS — persistent (zsh default)

Add the same `export` lines to `~/.zshrc`, then `source ~/.zshrc` or open a new terminal; if the agent host does not load shell profile for subprocesses, restart that host or set variables in the launch configuration it actually uses.

### Quick session-only test (not the main recommendation)

Use only to verify connectivity after setting globals, or for a one-off debug session:

**PowerShell:** `$env:VIKUNJA_BASE_URL = "..."`; `$env:VIKUNJA_TOKEN = "..."`  
**bash:** `export VIKUNJA_BASE_URL=...` etc.

---

**Official overview:** [Vikunja API documentation](https://vikunja.io/docs/api-documentation) (authentication, `/api/v1/docs`, `/api/v1/docs.json`).
