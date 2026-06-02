---
name: project-workflow
description: Universal project workflow — brainstorming, documentation, task planning, and implementation. Works with GitHub and GitLab. Use when starting a new project, discussing a feature, updating project docs, decomposing work into issues, or implementing tasks from a backlog. Triggers on "project workflow", "start project", "update docs", "create issues", "implement task", "take issue", "work on feature", or when the user wants end-to-end project support at any stage.
---

# Project Workflow

End-to-end skill for software projects — from first idea to shipped feature. Works at any project stage with GitHub or GitLab.

## Entry Point

Read the repository state first. Choose the entry point based on context:

| Signal | Phase |
|--------|-------|
| Empty repo / greenfield, user wants to explore an idea | [1 — Brainstorm](phases/1-brainstorm.md) |
| Code exists but `.docs/` is missing or incomplete | [2 — Docs](phases/2-docs.md) |
| `.docs/` exists, no issues in tracker yet | [3 — Planning](phases/3-planning.md) |
| Backlog exists, user wants to build something | [4 — Implementation](phases/4-implementation.md) |
| "update docs" / "fix documentation" / "актуализируй документацию" | [2 — Docs](phases/2-docs.md) |
| User names a specific issue or task number | [4 — Implementation](phases/4-implementation.md) |
| User wants to discuss a feature before planning | [1 — Brainstorm](phases/1-brainstorm.md) |

If context is ambiguous, ask once with these options before proceeding.

## Sequential Flow (New Project)

For greenfield projects, run phases in order:

```
Phase 1 → Phase 2 → Phase 3 → Phase 4
```

Each phase produces artifacts that feed the next:
- **Phase 1** outputs: validated concept, requirements, design decisions
- **Phase 2** outputs: `.docs/` files, `README.md`
- **Phase 3** outputs: issues with milestones and dependency graph
- **Phase 4** outputs: branches, pull/merge requests, merged features

## Jump-In (Existing Project)

Each phase is independently enterable. No need to replay earlier phases.

Before jumping in to any phase:
1. Check for `.docs/` — read `project-overview.md` → `prd.md` → `technical-design.md` if present.
2. Read `README.md` if present.
3. Check issue tracker for open issues, milestones, and blockers.
4. Use whatever is found as context. Do not re-run earlier phases unless the user asks.

## Platform Detection

Detect the hosting platform from git remotes:

```bash
git remote -v
```

- Remote contains `github.com` → **GitHub**. CLI: `gh`. Read [platforms/github.md](platforms/github.md) before running any platform-specific commands.
- Remote contains `gitlab.com` or a known GitLab host → **GitLab**. CLI: `glab`. Read [platforms/gitlab.md](platforms/gitlab.md) before running any platform-specific commands.

Read only the file that matches the detected platform. Do not load both.

Always discover command syntax at runtime via `<cli> <command> --help`. Do not rely on memorized flags.

## Phases

Read the relevant phase file when entering that phase:

- [Phase 1 — Brainstorm & PRD](phases/1-brainstorm.md)
- [Phase 2 — Documentation](phases/2-docs.md)
- [Phase 3 — Planning](phases/3-planning.md)
- [Phase 4 — Implementation](phases/4-implementation.md)
