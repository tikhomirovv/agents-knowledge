# Hypothesis-driven PM — Lean Canvas, validation, metrics

## Description
Framework for building products under uncertainty: structure ideas as testable hypotheses (Lean Canvas blocks), validate in risk order, target early adopters, measure with AARRR/HEART. Use when planning validation, prioritizing what to test first, choosing metrics, or structuring a new product idea.

## Main sections

### Core premise: uncertainty
- Most product ideas fail because decisions rest on **unconfirmed assumptions** about present and future.
- Treat every opinion, canvas cell, and roadmap item as a **hypothesis** until tested with data or experiments.
- Goal: reduce time spent on wrong directions; test **riskiest beliefs first**.

### Business model blocks (Lean Canvas / similar BMC tools)
Answer each block explicitly; fit on one page/slide.

| Block | What to define | Validation focus |
|-------|----------------|------------------|
| **Problem** | Top user problems; how users solve today; problem importance; affected user count | Do users have this pain? Do they already spend effort solving it? |
| **Users / segments** | Who has the problem; which segments feel it most | Segment specificity and priority |
| **Solution** | Proposed approach; tradeoffs vs alternatives | Does solution fit the problem? Usability/clarity |
| **Competitive advantage** | Why your team wins (tech, talent, distribution, data, audience) | Can others copy quickly? |
| **Channels** | How product reaches users | CAC feasibility |
| **Costs / revenue** | Spend areas; monetization model | Unit economics sanity |
| **Metrics** | Success measures per block | Can you observe progress? |

**Problem block is first and highest priority.**

### Problem importance — operational signals
- User **already solves** the problem → likely real and important.
- User **does not act** on the problem → likely low priority ("vitamin", not painkiller).
- **Effort already spent** on workarounds → proxy for importance.
- Estimate **how many users** share the problem for prioritization among 5–20 candidate problems.

### Validation priority order
1. **Problem** — real, important, for defined users?
2. **Solution** — does proposed approach solve it acceptably?
3. **Channels, monetization, cost structure** — optimization after problem–solution fit is plausible.

Anti-pattern: long build on unvalidated "mega idea" while skipping user problem checks.

### Cost of late feedback
- Fixed requirements over long horizons compound error cost (dependencies pyramid).
- Show users/customers **early**; delay increases rework risk.
- Start with **cheapest tests** on **riskiest assumptions** (problem/solution), not full engineering.

### Early adopter focus (Rogers diffusion)
| Group | Traits | PM use |
|-------|--------|--------|
| **Innovators** | Try early builds; ideological; rich qualitative feedback; low rational ROI | Ideas, deep feedback — not primary revenue |
| **Early adopters** | Clear use case; problem critical to survival/efficiency; will try new tools | **Primary launch target** — revenue + iteration |
| **Early / late majority** | Need polish, reviews, integrations | Scale phase |
| **Laggards** | Last to adopt | Low priority early |

Rule: win early adopters before optimizing for mass market.

### Product lifecycle stages
1. **Development** — discover problem and solution with users (garage stage).
2. **Optimization** — tune channels, revenue, costs.
3. **Scaling** — invest when model works (ads, capital).
4. **Saturation / maturity** — slow growth; product may run years (evolve or decline).
5. **Evolution** — adapt to new problems/market (rebrand, franchise cycles, new tech layers).

Maturity tactics differ by category: FMCG packaging refresh vs content franchises (e.g. recurring IP launches) vs tech pivot (e.g. search → assistants).

### Growth engines (pick primary)
1. **Sticky / retention** — users return over long periods (email, subscriptions). Growth when **new users > churn** month over month. Tactics: engagement loops, churn prediction, win-back.
2. **Viral** — each active user brings **>1** new user (social, referrals). Tactics: invite rewards, network effects.
3. **Paid / marginal** — infrequent purchases; profit when **LTV per transaction > acquisition cost**. Tactics: efficient paid channels.

### Metrics — AARRR (pirate funnel)
Top-to-bottom funnel; tie spend to LTV.

- **Acquisition** — traffic volume; filter junk (bounce, bots).
- **Activation** — user reaches first valuable action (signup, week-1 survival, etc.).
- **Retention** — repeat valuable actions period over period.
- **Referral** — invites, viral coefficient where relevant.
- **Revenue** — ARPU, revenue per period.

**LTV use:** if average user lifespan × monthly revenue is known → caps affordable CAC for acquisition.

### Metrics — HEART (long-lived products)
| Letter | Meaning | Notes |
|--------|---------|-------|
| **H** | Happiness | Qualitative; noisy version-to-version (surveys, in-app ratings) |
| **E** | Engagement | Frequency, sessions, depth of use |
| **A** | Adoption | Uptake of new product/feature (e.g. % staying on new design vs rollback) |
| **R** | Retention | Cohort survival over time |
| **T** | Task success | Outcome quality on **key scenarios** (scenario-specific metrics) |

Define **key scenarios** per product; measure each with domain metrics (e.g. search: mean position of first click — high position = poor ranking).

### Validation methods ladder
Use in sequence by cost/risk; **do not over-apply** expensive methods to trivial changes.

| Tier | Method | Cost / time | Scope | Limits |
|------|--------|-------------|-------|--------|
| 1 | **Log / analytics review** | Minutes–days | Existing product | Kills many bad ideas fast; incomplete alone |
| 2 | **Qualitative research / interviews** | Days–2 weeks | 10–20 users | Depth, not scale; prototype tests cheap (sketches, clickable mock) |
| 3 | **Quantitative / A/B test** | Engineering + traffic | % of audience (1k–10k+) | Comparable groups; statistical significance |

**A/B basics:** control vs experiment, equal-sized groups, pre-defined metrics, significance threshold (e.g. 95–99.9% depending on traffic and risk).

Example trivial change (banner color): skip interviews → ship A/B.

### Interview rules (problem discovery)
- Use a **topic map**, not a rigid interrogation script.
- Elicit **past concrete situations**; let user narrate; avoid leading questions that confirm your assumptions.
- **Screen respondents:** verify real product use (logs, permissioned demo, sanity checks) — reject professional or fake participants.

### Team roles (context-dependent)
- PM / project / analyst split depends on **where the bottleneck is** (delivery ops vs hypothesis quality vs analytics).
- Optimize for **output on current team config**, not ideal org chart.
- Trend: combine skills in one person when feasible; hire specialists when a gap blocks value creation.

### Manager credibility
- Authority comes from **creating value for the team**, not faking domain expertise.
- Valid expertise vectors: communication, conflict resolution, design, engineering depth, or orchestration — at least one real strength.

## Practical examples

### Example 1 — Email unsubscribe (validation chain)
1. **Logs:** many users hit broken unsubscribe flows; repeated failed attempts.
2. **Interviews:** confirm frustration; uncover bad patterns (fake unsubscribe, login walls).
3. **Cheap solution test:** one-click unsubscribe from message actions list.
4. **A/B:** measure adoption, complaints, engagement vs control.

### Example 2 — Canvas → test plan
Fill canvas in 1–2 hours → mark **riskiest cells** → assign methods (10 user interviews for problem; prototype click-test for solution; defer channel tests).

## Links and resources
- Ash Maurya — Lean Canvas.
- Jeff Sutherland — *Sentinel* case (FBI; long fixed spec vs iterative delivery).
- Everett Rogers — *Diffusion of Innovations* (adopter categories).
- Eric Ries — growth engines (sticky, viral, paid).
- Dave McClure — AARRR.
- Google — HEART framework.
- Related internal KB: `mvp_approaches_and_dvf_framework.md`, `b2c_ideation_validation_traffic_tests.md`, `value_creation_cognitive_model.md`.

## Notes
- "Organized skepticism" toward your own beliefs improves team decisions and reduces argument without data.
- Data alone rarely gives full answers; combine tiers (logs → qual → quant).
- Channels and monetization matter, but **after** problem and solution hypotheses survive contact with users.
