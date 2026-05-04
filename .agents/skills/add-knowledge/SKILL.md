---
name: add-knowledge
description: >-
  Adds a new knowledge file to a skill under the repo-root `skills/` directory and updates that skill's SKILL.md index.
  Use this project-local skill to maintain **public, shareable** skills shipped in this repository (skills others can copy or install).
  If nothing in the conversation names the target skill yet, **ask once** which `skills/<name>/` to update—do not guess silently.
license: MIT
compatibility: >-
  **This repo:** workspace skills live only in **`skills/<skill_name>/`** at the **repository root** (public skills for any user).
  This `add-knowledge` skill lives under **`.agents/skills/`** inside the project; it does **not** receive new knowledge files—only **`skills/*/knowledge/`** does.
  Requires write access to `skills/` and each target skill's `SKILL.md`.
---

# Add Knowledge

Adds a new knowledge file to a **public** skill under **`skills/`** (repo root) and updates that skill's knowledge index in its **`SKILL.md`**.

## Role in this project

| What | Where | Purpose |
|------|--------|--------|
| **This skill** (`add-knowledge`) | `.agents/skills/add-knowledge/` in the repo | Instructions for agents working **in this project** |
| **Skills you update** | `skills/<skill_name>/` at **repo root** | **Shareable** skills: other people can install or copy them from the repository |

- All new knowledge MUST go into **`skills/<skill_name>/knowledge/`**. Do **not** treat **`add-knowledge`** as the destination folder for KB files unless the user explicitly says so (unusual).

## What you need

- **Target skill** — the folder name under **`skills/`** (e.g. `marketer`, `designer`). **Mandatory clarification:** if neither the **current user message** nor **earlier messages in this same conversation** name the skill to update, **stop and ask once**: which **`skills/<name>/`** should receive the knowledge? Never silently choose a skill only because the topic "fits".
- **Content** — transcript, pasted text, file, or a brief to expand.
- **Filename** — optional; if missing, choose a descriptive English `snake_case` name (see **File naming**).

## Workflow

### 1. Locate the skill's knowledge directory and index

- Knowledge files live in **`skills/<skill_name>/knowledge/`** (repository root **`skills/`** only for this project's convention).
- The target skill's **`skills/<skill_name>/SKILL.md`** must list knowledge files in its index section ("Knowledge base" or equivalent). Match the heading level and bullet style already used in that file.

### 2. Create the knowledge file

- Create **`skills/<skill_name>/knowledge/<filename>.md`**.
- Use the structure in **[references/knowledge-template.md](references/knowledge-template.md)**. Keep one main theme per file; split if approaching ~2000 words or mixed topics.

### 3. Update the index in the skill's SKILL.md

- Open **`skills/<skill_name>/SKILL.md`** and add one entry consistent with existing index entries.

Example pattern (adapt to whatever the skill already uses):

```markdown
### [filename].md
Short description of what the file contains and when to use it.
```

- Place the entry in sensible order (theme or alphabetical).

## File naming

- **English** filenames, **`words_with_underscores.md`**. No spaces or stray punctuation.

**Good:** `attention_traps.md`, `content_strategies.md`, `bernays_propaganda_engineering_of_consent.md`  
**Bad:** `file1.md`, `new file.md`, `tips & tricks.md`

## Edge cases

- **Target skill omitted in the prompt** — **Ask once** which **`skills/<skill_name>/`** to use. Do **not** write into a random skill.
- **`knowledge/` missing** — create **`skills/<skill_name>/knowledge/`**. If **`skills/<skill_name>/`** does not exist, tell the user and stop (or confirm they meant a different skill name).
- **No index section in SKILL.md** — add a section (e.g. `## Knowledge base`) aligned with other headings in that file.
- **Duplicate filename** — propose a different name or ask the user.

## Organization

- One topic per file; self-contained. Split oversized or unrelated bundles.

## Checklist

- [ ] Target **`skills/<skill_name>/`** is named in this conversation **before** writing files; if it never was named, user was asked once.
- [ ] New file in **`skills/<skill_name>/knowledge/`** using **knowledge-template.md** structure.
- [ ] **`skills/<skill_name>/SKILL.md`** index updated.
- [ ] Filename is descriptive English **`snake_case`**.
