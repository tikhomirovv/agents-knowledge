# GitLab — Platform Details

Read this file when the repository is hosted on GitLab (remote contains `gitlab.com` or a self-managed GitLab host). CLI: `glab`.

## Authentication

Authenticate once via `glab auth login`. All subsequent `glab` and `glab api` calls use this token automatically — no separate API credentials needed.

Check current auth status:
```bash
glab auth status
```

`glab` also respects the `GITLAB_TOKEN` environment variable if set.

## Core CLI Commands

Always discover flags at runtime: `glab <command> --help`

| Task | Command |
|------|---------|
| List issues | `glab issue list` |
| Create issue | `glab issue create` |
| View issue | `glab issue view N` |
| Close issue | `glab issue close N` |
| Create MR | `glab mr create` |
| Merge MR | `glab mr merge` |
| View MR status | `glab mr view` |
| Create milestone | `glab milestone create` |
| List milestones | `glab milestone list` |
| Create label | `glab label create` |
| List CI pipelines | `glab ci list` |
| View pipeline | `glab ci view` |

## Issue Dependencies (Blockers)

`glab` does not have a dedicated CLI command for linking issues as blockers. Use the REST API via `glab api` — authentication is handled automatically.

**Set issue A as blocking issue B:**
```bash
# POST to issue A's links — mark it as "blocks" issue B
glab api projects/:fullpath/issues/A_IID/links \
  --method POST \
  -f target_project_id=":fullpath" \
  -f target_issue_iid=B_IID \
  -f link_type="blocks"
```

Replace `:fullpath` with the project path in the format `namespace%2Frepo` (URL-encoded slash).

**Check blockers of an issue:**
```bash
glab api projects/:fullpath/issues/N/links --jq '.[] | select(.link_type=="is_blocked_by") | .iid'
```

**Link types:**
| Value | Meaning |
|-------|---------|
| `relates_to` | Related (no enforcement) |
| `blocks` | This issue blocks the target |
| `is_blocked_by` | This issue is blocked by the target |

When an issue has open blockers, GitLab shows a visual icon on issue lists and boards. When you try to close a blocked issue via the UI, GitLab shows a warning.

## MR-Level Dependencies

⚠️ **Premium / Ultimate only.** Not available on the Free tier.

On Premium+, you can set a MR to be unmergeable until another MR merges first. If your project is on the Free tier, enforce execution order at the issue level (blockers) and through team process instead.

## Issue Boards

GitLab's visual boards are built into the project — not a separate product. Boards can be organised by labels, milestones, assignees, or (Premium+) iterations.

Boards are managed primarily through the GitLab UI. To interact with board lists via API:
```bash
glab api projects/:fullpath/boards
glab api projects/:fullpath/boards/BOARD_ID/lists
```

Free tier: multiple boards per project. Premium+: configurable board scope, assignee lists, iteration lists.

## Iterations (Premium / Ultimate only)

GitLab Iterations are time-boxed planning cycles (like sprints). Not available on the Free tier.

```bash
glab iteration list
```

If your project is on the Free tier, use milestones for phase grouping instead.

## Milestones

Available on all tiers. Milestones can belong to a project or a group.

```bash
glab milestone create --title "MVP" --due-date "2026-07-01"
glab milestone list
```

Assign a milestone to an issue:
```bash
glab issue update N --milestone MILESTONE_ID
```

## Closing Issues via MR

In the MR description, use:
```
Closes #N
```
Also accepted as a slash command in comments:
```
/close #N
```
The issue closes automatically when the MR is merged.

## Checking CI Status

```bash
glab ci list
glab ci view
glab pipeline ci view   # watch in progress
```
