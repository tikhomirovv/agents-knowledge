# Emotional design — brain, habits, biases

## Description
How emotions, cognitive limits, and habit loops drive product adoption — not rational utility alone. Use when ideating products, designing engagement/retention, interpreting user research, or diagnosing "useful but unused" products. Complements `value_creation_cognitive_model.md` (investment/benefit framing); this file covers affect, automatic behavior, and variable-reward mechanics.

## Main sections

### Product value stack (evolution of models)
1. **Rational utility** — benefit per cost; insufficient alone.
2. **+ Subjective / collective value** — ease, delight, interest, status, emotional payoff.
3. **Emotion can dominate** — without positive affect, utilitarian tools fail (task managers → guilt; users prefer mental/paper lists).

**Rule:** Do not start only from problem→solution frameworks. Model **emotions triggered**, cognitive ease, and habit fit before scaling hypothesis tests.

### Two problem types (Thiel framing)
| Type | Examples | PM focus |
|------|----------|----------|
| **Secrets of nature** | Cheaper rockets, self-driving tech | Engineering, physics |
| **Secrets of people** | Will anyone use it? In what context? | Most consumer/internet products |

People secrets are often **unknown to users themselves** — not fully extractable by direct questions.

### Why direct user answers fail
| Source | Finding | Implication |
|--------|---------|-------------|
| **Future affect** (wedding study) | Expected happiness spikes before event, returns to baseline after | "Would you use/buy?" overstates demand |
| **Past behavior recall** (lane-change demo) | ~70% wrong on how they perform automatic actions | Self-report on habits is unreliable |
| **Relationship attribution** (Gottman-style) | Partners overcount own contribution (sums >100%) | Emotional salience distorts memory |

**Use:** interviews for exploration, not truth; validate with behavior, logs, experiments.

### Learning and ideation modes
- **Focused mode:** absorb rules, examples — cannot invent non-template solutions.
- **Diffuse mode:** insight when relaxed — requires prior **chunks** (concepts with many application links).
- **Implication:** rote frameworks without lived context → local maxima; build deep models + apply in work, teaching, writing.

### Brain energy economy
- Brain optimizes to **avoid thinking** — glucose-expensive; evolution favored fast heuristics over full analysis.
- **Decision fatigue:** each micro-choice (what to wear, which app) drains capacity; automate routines to preserve energy.
- **Product rule:** minimize cognitive cost per interaction (copy, flows, defaults); every forced decision is a tax users resent.

### Cognitive biases (selected — persist even when known)
| Bias | Pattern | Product/market effect |
|------|---------|------------------------|
| **Halo** | One trait (looks, suit, car) → unrelated traits (competence) | Brand, design, trust signals |
| **Anchoring / first number** | First price/number skews later estimates | Pricing, negotiations, auctions |
| **Illusory pattern** | Brain matches partial cues like trained classifier | "Intuition" in hiring, UX opinions |
| **Negativity bias** | Bad events weighted > good | Media, reviews, one criticism vs many praises (~6:1 praise to offset) |
| **Peak–end rule** | Memory = emotional peaks + ending, not duration integral | Trip length, ride ETA experience |

Knowing a bias **does not remove it** — redesign environment (defaults, delegation, process), not willpower alone.

### Decision architecture (layers)
- **Fast/emotional systems** (limbic, older structures) drive wants; **neocortex** often **confabulates** reasons afterward.
- **Present self ≠ future self** — use **commitment devices** (Ulysses contracts: self-bans, pre-commitments) when predicting weak follow-through.
- Users (and PMs) operate in **zombie mode** much of the time — design for automatic habits, not continuous rational choice.

### Plasticity and segments
- Every experience strengthens some neural paths ("ski tracks").
- **Younger users:** more plastic → easier new habits.
- **Older / entrenched audiences:** rigid paths (e.g. 40+ booking users) → tiny UI changes are high-risk.
- **Implication:** match change magnitude to audience plasticity; QWERTY-style lock-in — objective improvements may fail if relearning cost is huge.

### Context effects on decisions
- Environment shifts judgment: smell, temperature, safety, hunger (judges: parole rates correlate with time since meal / serotonin).
- **Defaults:** opt-in vs opt-out (organ donation) → large conversion deltas without "new motivation."
- **Learned context skills:** e.g. messaging literacy from free SMS → new channel habits to build on.

### Dopamine and variable reward
- Dopamine drives **seeking / anticipation**, not guaranteed pleasure.
- **Uncertainty amplifies motivation** — predictable rewards feel worthless (pre-announced bonuses, fully known outcomes).
- **Cheap dopamine:** minimal effort → reward (infinite scroll, likes, feeds, unpredictable news/sports/politics).
- **Check loops:** post → check metrics soon after — variable social validation.
- **Product lever:** variable, non-guaranteed rewards + low-friction action — powerful and ethically sensitive.

### Habit design — BJ Fogg (B=MAP)
**Behavior = Motivation × Ability × Prompt**

| Lever | Notes |
|-------|-------|
| **Ability** | **Primary hack** — reduce steps, friction, cognitive load (Instagram vs mobile Facebook upload pain). |
| **Motivation** | Hard to inject long-term; discounts/popups often ignored (banner blindness). |
| **Trigger** | External → internal over time (see Hook model). |

**Habit formation rules:**
- Start **absurdly small** steps (open book, not 30 pages; 5-min meditation, not 15).
- Attach to **high-ability moments** (in bed, not while driving).
- Avoid guilt/shame loops — brain rationalizes quitting.
- Remove **decision points** (calendar blocks for gym vs daily "should I go?").
- Prefer **internal triggers** (emotion/context → automatic open) over paid nudges.

### Hook model (simplified loop)
1. **Trigger** (external → internal)
2. **Action** (low ability cost)
3. **Variable reward**
4. **Investment** (user puts in effort/data → IKEA effect, sunk attachment)

**Instagram path:** upload friction removed (ability) → likes (variable reward) → investment in profile/graph.

### Painkillers vs vitamins (product framing)
- **Vitamin:** nice-to-have; weak retention if no emotional loop.
- **Painkiller / hook product:** embeds in dopamine/reward cycle (high frequency use).
- Ethical choice: same brain mechanisms as harmful loops — designer responsibility in how applied.

### Applied patterns

#### Navigation (peak–end)
- User remembers **end state** of trip (late vs on-time), not full drive.
- Slight **variable optimistic ETA** can create occasional "beat the estimate" wins → positive association (must not become predictable/gameable).

#### Tinder (social validation)
- Core job: **validation desire**, not marriage optimization.
- Swipe = low cost + uncertain match (variable reward).
- **Hidden rejections** — avoid negative peak; user attributes silence to app/timing, not self.
- **Anti-pattern:** guaranteed "super like" visibility removes uncertainty → kills loop.

#### Houzz (aspiration content)
- Primary value = **dopamine content** (imagine better home), not SKU catalog alone.
- Reducing email frequency hurt engagement — content cadence was the product.

#### Houzz / browsing categories
- **Desire phase** often more engaging than ownership — design for browsing/imagination, not only checkout.

### Research and team hygiene
- Do not trust unstructured "gut" interviews — same biological noise as users (hunger, sleep, bias).
- Screen respondents; verify real product use via logs/actions when possible.
- When pitching/stakeholder decks: too many slides → audience preserves self-image by rejecting presenter.

### Ethical guardrails (designer)
- Avoid training your own **cheap dopamine** habits while optimizing products.
- TED/summary consumption can mimic progress without behavior change (dopamine without chunk building).

## Practical examples

### Example 1 — Instagram launch
Existing motivation: share photos. Blocker: mobile upload to Facebook. Fix **ability** first; layer social validation after.

### Example 2 — Reading habit failure
Alarm at 3pm + "read 30 pages" → low ability context. Fix: in-bed trigger + "pick up book" micro-habit → expand organically.

### Example 3 — Feature with no emotional path
Task manager adds tasks → evening guilt. Unless paired with positive reward loop or guilt removal, utility alone loses to avoidance.

## Links and resources
- Daniel Kahneman — cognitive biases, System 1/2.
- BJ Fogg — behavior model.
- Nir Eyal — Hook model (use critically).
- Peter Thiel — secrets (people vs nature).
- Related: `value_creation_cognitive_model.md`, `hypothesis_driven_pm_lean_canvas_metrics.md`, `b2c_ideation_validation_traffic_tests.md`.

## Notes
- Frameworks (Lean Startup, etc.) help **select** ideas; they do not generate direction — need emotional/behavioral model to avoid random walk.
- "Filters of perception" — once named, patterns (biases, hooks) become visible in products and self-behavior.
- Re-teach concepts (present, write) to build chunks — passive re-reading weak for retention.
