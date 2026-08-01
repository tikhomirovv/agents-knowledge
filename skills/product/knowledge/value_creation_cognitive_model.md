# Value creation — cognitive model

## Description
Operational model of product value grounded in brain resource economics (allostasis, investment–benefit tradeoff). Use when defining value propositions, prioritizing features, arguing product decisions, or mapping client goal structures. Source: conference talk on value mechanics (simplified framework; not a complete behavioral model).

## Main sections

### Brain baseline (resource economics)
- Primary function: **allostasis** — regulate internal resource balance (glucose, oxygen, neurotransmitters, etc.).
- Core algorithm: **invest resources now → higher resource return later**.
- In humans, investment/return is directed by **need satisfaction** (food, sleep, safety, contact, belonging, status, self-actualization, etc.).
- High-level cognition (goals, planning, product use) runs on this substrate.

### Purchase decision (neuroscience proxy)
- Study: *Neural Predictors of Purchases* (2007, fMRI).
- **Offer shown** → regions linked to future resource/benefit anticipation activate.
- **Price shown** → insula activates (pain / resource expenditure).
- **Buy/no-buy** → integrative evaluation: **expected benefit vs required investment**.
- Rule of thumb: if perceived benefit > investment → higher purchase likelihood.
- Product choice follows the same investment–benefit logic.

### Value — formal definition
- **Value = Δ(benefit − investment)** for a specific user, goal, and context.
- Investment units: time, effort, money, cognitive load, attention, emotional cost.
- Benefit units: goal progress, need satisfaction, risk reduction, status, comfort, etc.
- Product value proposition: **complete important client goals with less total investment and/or more benefit** than alternatives.
- Business implication: allocate limited build/market resources to maximize value created per segment.
- Open problem: exact aggregation formula (subtraction vs ratio vs ROI-style) is not settled; treat as directional model.

### Client structure: segments → goals → sub-goals
- **Segment** = users sharing a core **goal** (JTBD-compatible; "goal" ≈ "job").
- Each goal decomposes into **sub-goals / sub-tasks** (action steps).
- Multiple segments exist per product; each has its own goal tree.
- PM work: map goal trees per segment; choose focus segment + focus goals; apply value mechanics below.
- Prioritization (small vs large goals, fast vs slow build) depends on segment attractiveness: reachable share, value delta vs competitors, acquisition/retention economics — not on mechanics alone.

### Failure mode: broken expectations and tax tasks
- User invests before receiving benefit (e.g., drove to gas station, product loaded, workflow started).
- If core goal fails: **expectation violated** → frustration; prior investment is sunk.
- User must perform **tax tasks** — extra sub-goals they did not want — to still reach the main goal.
- Outcome: churn to alternatives. Fixing core job reliability is baseline value, not a bonus.

### Value creation mechanics

#### 1. Core job reliability
- Ensure the primary goal completes without failure.
- Audit problems in own product and alternatives; position on "we complete the job you expect."

#### 2. Goal bundling (feature integration)
- User has multiple goals with **overlapping sub-tasks** (e.g., fuel + coffee: arrive, pay, leave).
- Bundle into one flow: **same or lower total investment, summed benefit**.
- Marginal investment for existing users is often lower (already onboarded, paid, in session).
- Typical "add a feature" pattern: move an awkward external step into the product.

#### 3. Sub-task elimination (convenience / simplification)
- Map all sub-tasks for a goal in detail.
- Remove sub-tasks entirely (not just faster UI): fewer steps beats slightly faster steps.
- **Convenience** = same core goal with **fewer required sub-goals** vs prior version or competitor.
- Large value jumps come from order-of-magnitude sub-task reduction, not micro-optimizations.

#### 4. Price discount
- Same outcome, lower monetary investment. Simplest mechanic; same benefit/investment framing.

#### 5. Dormant / unmet goal activation
- Serve goals the user already has but current solutions do not address (e.g., status signaling on top of functional job).
- Often adds benefit without proportional investment increase.

#### 6. Segment expansion
- Apply same mechanics to adjacent segments with different goal trees (e.g., long-haul drivers: extra fluids, rest facilities).
- Requires segment-specific goal research, not feature copying.

#### ~12 mechanics total
- Speaker cites ~12 patterns; above are the core operational ones. Others follow the same principle: shift benefit↑ and/or investment↓ on mapped goals.

### Habits and switching costs
- Habit = neural optimization so **frequent goals cost less resources over time** (physical brain structure change).
- Users rarely switch for marginal improvement; competitor must offer **large value delta**.
- Product changes that break habitual flows trigger strong negative reaction (identity/safety attachment to familiar tool).
- **Do not ship disruptive UX changes abruptly** — metrics become uninterpretable; retention damage is predictable.
- Still must evolve value over time vs competitors and past product versions.

### Super-app / complexity trap
- Cramming many scenarios into limited UI (e.g., mobile screen) raises cognitive investment per scenario.
- Tradeoff: breadth of goals served vs clarity and activation of each core flow.
- Treat as product design constraint, not user fault.

### Relation to JTBD
- Same object of analysis: segment by jobs/goals, job graph, value hypotheses from graph operations.
- "Value" here names the **direction of optimization** over the job graph: more efficient goal completion.

## Practical examples

### Example 1 — Gas station evolution
- Base: sell fuel (core goal).
- Broken pump → tax tasks (find another station) → churn.
- Add coffee: bundle overlapping sub-tasks → higher benefit, similar trip cost.
- Attendant brings coffee at pump: eliminate walk/queue sub-tasks → convenience mechanic.

### Example 2 — Research workflow
- Google: query crafting, scanning many pages, ads, verification → high investment for complex topics.
- Conversational AI (for structured exploration): fewer sub-tasks for "map a topic one level deep"; investment includes subscription/setup and fact-checking cost.
- Value assessment is **goal-specific**, not product-global.

### Example 3 — Smartphone (multi-mechanic)
- One device bundles many goals (communication, camera, navigation, etc.) → bundling.
- Simple I/O + app ecosystem → sub-task reduction per goal vs separate devices.
- Status layer (materials, brand) → dormant goal activation.
- Mechanics stack; no single lever explains the product.

## Links and resources
- Lisa Feldman Barrett — *Seven and a Half Lessons About the Brain* (allostasis, brain function framing).
- Lisa Feldman Barrett — *How Emotions Are Made*.
- Knutson et al. — *Neural Predictors of Purchases* (2007).
- Compatible with Jobs-to-be-Done segmentation and job-graph analysis.

## Notes
- Model is a **core structure**, not full behavioral coverage: unconscious needs, biases, dopamine loops, lying in interviews, builder psychology — handle separately.
- Use goal trees + mechanics to replace pure intuition in prioritization debates.
- When arguing against a feature: ask which segment goal it serves, which sub-tasks it removes or bundles, and vs which alternative.
- Measuring benefit/investment in common units remains research/engineering problem; use relative comparisons and qualitative sub-task counts when quant data is missing.
