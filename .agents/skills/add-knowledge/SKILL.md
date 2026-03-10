---
name: add-knowledge
description: Adds a new knowledge file to an existing skill and updates that skill's knowledge index in its SKILL.md. Use when the user wants to add knowledge to a skill, create a new knowledge file for a skill, document something for a skill's knowledge base, or turn content (transcript, text, document) into skill knowledge. Apply whenever the user says "add knowledge", "new knowledge file", "add to skill knowledge", or provides content to store as skill knowledge.
license: MIT
compatibility: For use where skills live in a skills directory (e.g. .agents/skills/ or project skills/). Requires write access to that directory and to each skill's SKILL.md.
---

# Add Knowledge

Adds a new knowledge file to a skill and updates the skill's knowledge index so the skill can discover and use the new content.

## What you need

- **Target skill** — which skill in the skills directory the knowledge belongs to (e.g. `marketer`, `designer`). If unclear, ask or infer from the content.
- **Content** — what to turn into knowledge: from a file (transcript, doc), from the conversation, or a brief to expand.
- **Filename** — optional; if not given, pick a descriptive name (see naming rules below).

## Workflow

### 1. Locate the skill's knowledge directory and index

- Knowledge files live in **`<skills_root>/<skill_name>/knowledge/`** (e.g. `.agents/skills/marketer/knowledge/` or `skills/designer/knowledge/`).
- The skill's **SKILL.md** has a **knowledge index**: a section that lists all knowledge files with a short description and when to use each (e.g. "Knowledge base", "Available knowledge files").

### 2. Create the knowledge file

- Create a new file in **`<skills_root>/<skill_name>/knowledge/`**.
- Use the structure in **[references/knowledge-template.md](references/knowledge-template.md)**. Fill it with the user's content: main concepts, clear sections, under ~2000 words per file; split into several files if the topic is large.

### 3. Update the index in the skill's SKILL.md

- Open **`<skills_root>/<skill_name>/SKILL.md`** and find the knowledge index section.
- Add one entry in the same format as existing entries:

```markdown
### [filename].md
Short description of what the file contains and when to use it.
```

- Place the new entry in a logical order (e.g. by theme or alphabetically).

## File naming

- **Descriptive** names in **English**, words separated by **underscores**. No spaces or special characters.

**Good:** `attention_traps.md`, `content_strategies.md`, `best_practices.md`  
**Avoid:** `file1.md`, `new file.md`, `tips & tricks.md`

## Edge cases

- **Target skill or knowledge folder missing** — Create the `knowledge/` directory under the skill folder if it does not exist. If the skill itself is missing, tell the user and stop.
- **No knowledge index in SKILL.md** — Add a section (e.g. `## Knowledge base`) and list the new file there. Match the heading level used elsewhere in that SKILL.md.
- **Duplicate filename** — If a file with the same name already exists, suggest a different name or ask the user.

## Organization

- One main topic or theme per file. Each file should be self-contained. Split when a file would get too long or cover unrelated themes.

## Checklist

- [ ] New file created in `<skill_name>/knowledge/` using the structure from references/knowledge-template.md.
- [ ] SKILL.md updated: new entry in the knowledge index with filename and short description.
- [ ] Filename follows naming rules.
- [ ] Content has clear headings and, where useful, examples.
