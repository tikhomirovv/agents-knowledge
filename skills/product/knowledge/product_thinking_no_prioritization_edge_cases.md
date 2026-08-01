# Product thinking — saying no, prioritization, edge cases

## Description
Decision framework for what to build and how to design for real-world use: reject low-value work, filter features with five questions, cover non-happy-path UI states, avoid scope/documentation failures. Use when prioritizing backlog, reviewing designs, or pushing back on stakeholder requests.

## Main sections

### Saying no — core PM duty
- Feature pressure sources (weak signals): "users asked", "competitors have it", "leadership wants it", "team has spare capacity".
- Stakeholders pursue **their** goals; PM owns **product** outcomes.
- Expect pushback: complaints, escalation, conflict — still required.
- **What you do not ship** matters as much as what you ship.

### Five questions — feature filter
Apply before committing engineering. A feature should pass several, not just one.

| # | Question | Pass signal | Fail signal |
|---|----------|-------------|-------------|
| 1 | **Vision fit** — does it match what this product is (and is not)? | Advances defined product identity | Chases generic metrics/research anyone can copy |
| 2 | **5-year test** — will it matter in 5 years? | Solves core user job | One-off campaign, vanity UI, ego polish |
| 3 | **Skip cost** — what breaks if we do not build it? | Product/competitive harm without it | Nothing material; optional promo tie-in |
| 4 | **Profit link** — does it increase profit, and is the mechanism clear? | Causal path to revenue/retention/LTV | No explainable business link |
| 5 | **Support cost** — cost to maintain next year / 10 years? | Sustainable ops burden | Small UI tip of large maintenance iceberg |

Note: retention/engagement features can increase profit — but mechanism must be explicit.

### Ideal funnel vs real usage
- Standard funnel (awareness → acquisition → activation → conversion → retention) describes an **ideal** path.
- Users routinely deviate: unexpected contexts, hardware positions, regional differences, interruptions.
- **Worst failure:** activated user ready to pay hits a blocker (e.g. phone validation only `+7`).
- Assume users **do not read instructions**.

### Non-happy-path design checklist
For each screen in a flow, ask: **can this step fail or diverge?**

| Category | What to handle |
|----------|----------------|
| **Empty states** | First launch, no history/bookmarks — use for onboarding + CTA to first valuable action |
| **Zero results** | Search/find nothing — offer alternatives (related items, recommendations), not blank dead-end |
| **Errors — validation** | Invalid phone, card, address input |
| **Errors — fetch** | Network/load failure when reading data |
| **Errors — send** | Server timeout, failed submit |
| **Connection loss** | Offline / flaky mobile — can user still progress on core job? |
| **Geolocation / region** | Feature unavailable in city/region — graceful fallback (e.g. taxi app lists local cab numbers if service absent) |
| **User context** | On-the-go vs relaxed use (maps: rushing, metro, charging phone upside-down in cup holder) |
| **Localization** | Translated strings break layout (DE/FI longer than RU) — test real locales |

### Per-step interruption questions
- Connection drops during **send**?
- User **interrupted** mid-task (call, app switch)?
- At this mockup step, what if behavior is **not** as designed?
- **Place/context** changes mid-flow (city, market, device orientation)?

Test outside lab defaults (multiple cities, real devices, non-ideal conditions).

### Inverted thinking (anti-design)
- Ask: **how would we make this maximally bad/unusable?** (Lebedev-style inversion.)
- Listing failure modes surfaces constraints and real requirements faster than polishing happy path only.
- Use for UX, flows, and organizational process — not only visual design.

### Vasa ship — delivery anti-patterns
Historical case: flagship ship sank on first voyage after scope churn, no stability testing, no surviving architect/docs.

| Failure | PM rule |
|---------|---------|
| Scope changed repeatedly (length, guns, decks) | **Freeze scope** at stages; stop mid-build requirement inflation |
| No documentation; architect died | **Document** behavior before memory fades (weeks/months post-launch) |
| "Test" = 30 people walking deck once | **Test with real users** under realistic load/stress |
| Builders secretly widened hull — still insufficient ballast | **Understand system mechanics** (physics, tech, ops) — not "magic inside" |
| Blamed "act of God" | Root cause was structural; investigate, do not stop at surface excuse |

### Five Whys — root cause
- On a problem, ask **why** up to ~5 times to reach actionable root cause (Toyota method).
- Surface symptom ≠ fix (e.g. conveyor stopped → storage for workers' belongings).
- Use for product bugs, process failures, and prioritization debates.

### Technical literacy
- PM/design should understand **how the product actually works** (stack, data flow, constraints).
- Weak signal: hand-wavy explanations; strong signal: can explain core systems (e.g. how the internet works at a practical level).

## Practical examples

### Example 1 — Reject integration request
Promotional map pins (historical figures, animated routes) for anniversary campaign.
- Vision fit: weak for maps core job.
- 5-year test: no.
- Skip cost: none for maps users.
- Profit: unclear.
- Support: non-trivial.
→ **No.**

### Example 2 — Upside-down maps
Beta user charged phone in cup holder, screen inverted — maps didn't rotate. Real context → ship orientation support.

### Example 3 — Taxi comments Moscow vs St Petersburg
Same UI strings; regional fleet reality differs (child seat, smoking, A/C options). Test in multiple cities or show region-appropriate options.

### Example 4 — Empty search
E-commerce "nothing found" → show related products or query suggestions (Amazon pattern), not empty page.

## Links and resources
- John Gall — complex systems quote: start simple and working; complexity accumulates.
- Steve Jobs — pride in what Apple **chooses not to do**.
- Sakichi Toyoda — Five Whys.
- Related internal KB: `hypothesis_driven_pm_lean_canvas_metrics.md`, `value_creation_cognitive_model.md`, `mvp_approaches_and_dvf_framework.md`.

## Notes
- Metrics, surveys, and competitor research **inform** hypotheses; they do not replace product vision ownership.
- Complexity grows with audience — default to simple working systems early.
- Lecture meta-frame: good PM work = **better questions**, not premature answers.
