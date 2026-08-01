# Customer development — interview methodology

## Description
Operational guide to customer development (CustDev): when to talk to users, which tools to use, how to run interviews, and what signals to trust. Use before building features, for MVP/pricing validation, and after launch when retention fails. Complements `hypothesis_driven_pm_lean_canvas_metrics.md` (quant ladder) and `emotional_design_brain_habits_biases.md` (why users misreport).

## Main sections

### Why CustDev exists
- **#1 startup failure driver:** no market need / no PMF (CB Insights-style founder surveys).
- Related failures: wrong pricing, bad product with no feedback channel, ignoring customers.
- **Stealth building** → no feedback until launch spike → ~90% churn ("valley of death").
- **Steve Blank rule:** get out of the building — talk to users in their context, not only inside the team.

### PMF metaphor
- Market = lock; product = key; CustDev = discover lock shape before forging the key.

### When to apply CustDev
| Situation | Goal |
|-----------|------|
| New product / idea | Validate hypothesis, audience, problem |
| MVP | Not landing emails alone — **interview** signups; test value and price framing |
| New feature | Need/understanding before engineering |
| Pricing | Will this version sell at this price |
| Iteration | Cheaper course correction each release |

**Cadence:** continuous — at idea stage, each feature, each sprint; not only week 1.

### Tool stack (simple → advanced)
| Tool | Cost | Use |
|------|------|-----|
| **1:1 interview** | ~30 min your time | Default; best with video for nonverbals |
| **Survey** (Forms/bot) | Low | After interviews; pick between options; bot often ~4× response vs email form |
| **Loyal user chat** (Telegram/FB) | Low | Fast feedback on ships; power users opt in |
| **Corridor test** (~5 people) | Minutes | Comprehension of mock/prototype |
| **Usability study** | Higher skill | Competitive UX markets; learn over 10–30 sessions |

**Anti-pattern:** expensive agency report (weeks, thick PDF, zero actionable insight). Prefer 3–5 interviews in sprint week 1.

### Qualitative sample size
- Goal: **surface patterns**, not statistical proof.
- **5–10 interviews** — usually enough when answers repeat.
- At ~20, fatigue; repetition = pattern found — stop and build.
- Mark themes that recur and moments with emotional emphasis.

### Lean Startup placement
| Phase | CustDev role |
|-------|----------------|
| **Learn** | Talk first; verify you understood the person |
| **Build** | Paper → Balsamiq → design → code; validate each step |
| **Measure** | Segment-specific metrics (e.g. RSS plugin adoption among news bots), not only global retention |

### Hard boundary: no future fiction
**Never treat as facts:**
- "I will buy / use"
- "I would pay X"
- Hypothetical feature opinions from non-experts
- Optimistic promises (user optimizes **your feelings in the moment**, not their future behavior)

**Extract instead:**
- What they **do now**
- How strong the need is (**effort already spent** — search duration, workarounds)
- **Context:** place, time, who was nearby, what blocked them
- **Observation** in situ (queue at café, dirty gloves on tablet)

**Price validation:** sell **now** (money, pre-order, concrete commitment) — not stated willingness.

### Interview prep workflow
1. **Define target segment hypothesis** — who must have the need.
2. **Screening questions first** — filter out no-need (saves both sides time).
3. **List product hypotheses** broadly (what could move key metric).
4. **Drill one level** per hypothesis (if yes → what exactly).
5. **Convert closed → open** questions.
6. Add **"why" × ~5** on motivations, not opinions.
7. Prepare **scenario script** — not a rigid interrogation list.

### Good vs bad questions

| Bad | Why | Better |
|-----|-----|--------|
| "Would you pay 2000₽ for cleaning on weekends?" | Future + solution embedded | Past: "When did you last order cleaning? What bothered you?" |
| "How much would you pay?" | Anchored guess, easy to misread as fact | Pre-sell now OR observe current spend |
| "Ideal internet bank features?" | Feature laundry from non-experts | Only if expert; else five whys on **last concrete episode** |
| "Will you use our new feature?" | Pleasing interviewer | Show prototype; watch behavior; pre-commit action |
| Leading UI copy ("won't X worry you?") | Plants concern | Neutral: "What do you see here? What would you do next?" |

| Good | Why |
|------|-----|
| "What bothers you about X?" → recall last time | Open, factual, surfaces scenario detail |
| "What happens if we don't build this?" | Cuts emotion; reveals real stakes |
| "Tell about last experience with…" | Concrete narrative |
| "Did you look for a solution? How long?" | 2 years on Google = strong need; never searched = weak |
| "What did you try instead? Why?" | Competitor/alternative insight |

### Listening hygiene

#### Social pleasing
- Interview = social transaction (attention, flattery) → inflated positivity.
- **Red flags:** "everyone loved it", compliments about your product/employer, VC-style praise.
- Do **not** open with "I'm from [famous brand], we're building X" — triggers pleasing mode.

#### Generalizations → facts
Watch for: *usually, often, never, I would, I will, in general*.
→ Ask: "When did you last…? Walk me through step by step."

#### PTAP (pitch to validate)
- Fear drives seeking reassurance ("I sold grandma's flat for this — it's good, right?").
- Outcome: comfort, zero facts, worse decisions.
- **Talk less**; tolerate silence; you came to listen.

#### Ideal 30-min structure (new feature)
1. **Informal context** — problem in their life (queue chat, workflow).
2. **Show solution** — do they understand it?
3. **Pre-sell** — pay, email, signup, real action **now**.

### Pattern synthesis after interviews
- Bullet notes per session.
- Highlight **repeated** items and **emotional** emphasis.
- Top 3–5 themes = CustDev output → backlog input.
- Share 5-min clip/summary with team so micro-decisions align with user context.

### Finding respondents
- Personal network, social graph (friends of friends).
- Existing users: email (~1% interview conversion at scale); phone better.
- **Where they are** — not your office (malls, queues, venues).
- Meetups, talks (collect contacts).
- Cold outreach — low conversion but works.
- Incentives optional (small payment, food) for hard-to-reach segments.

### Why teams skip CustDev
- Fear of "nobody needs this"
- Comfort of builder mode
- Laziness; brain rationalizes delay ("need 3 weeks to find people")
- Idea-theft fear (usually overstated pre-PMF)

**Counter:** skill like any other; 8h practice + first conversations breaks the block.

### Organizational habit
- **Intercom model:** monthly "face-to-face support" — every employee talks to users.
- Minimum: PM interviews + **broadcast insights** to dev/design.

## Practical examples

### Example 1 — POS in café rush
Observe owner during lunch queue: stress, clicks, customers leaving = revenue loss per minute. Not discoverable in office.

### Example 2 — "Need pie chart" feature request
Without five whys: ship chart. With whys: real need = "I spend too much on coffee; want one line to shame me into investing." Different solution.

### Example 3 — Sprint CustDev vs agency
3 users × 90 min week 1 → ship feature week 2 vs 2 months + $$$ + zero memory retention.

## Links and resources
- Steve Blank — Customer Development, "get out of the building".
- CB Insights — top reasons startups fail (no market need).
- Related: `hypothesis_driven_pm_lean_canvas_metrics.md`, `b2c_ideation_validation_traffic_tests.md`, `emotional_design_brain_habits_biases.md`, `product_thinking_no_prioritization_edge_cases.md` (Five Whys).

## Notes
- CustDev is a **hammer** — know boundaries: past/current behavior yes; future promises no.
- Compliments and unanimous praise → **redo** interview approach.
- End every interview: **"What didn't I ask?"** / **"Who else should I talk to?"**
- Expert feature questions OK only with deep **why** chain; otherwise you collect undifferentiated feature lists.
