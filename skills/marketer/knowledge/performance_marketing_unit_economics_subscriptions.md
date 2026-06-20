# Performance marketing unit economics for subscription products

## Description
How to model a paid acquisition funnel end-to-end (CPM → CTR → click→install/signup → trial → paid), estimate CAC/payback, and identify the highest-leverage optimization points (often creative/CTR).

## Main sections
### Core funnel model (from impressions to revenue)
Use a simple multiplicative funnel. Define each step as a conversion rate.

- **Impressions**: \(I\)
- **CPM**: cost per 1,000 impressions
- **CTR**: click-through rate
- **CR\_click→action**: click to install/signup
- **CR\_action→trial**: install/signup to trial
- **CR\_trial→paid**: trial to paid
- **Price**: subscription price (weekly/monthly/annual)
- **Platform fee**: e.g. 30% store fee (if applicable)

Formulas:

- **Impressions**: \(I = \frac{\text{Spend}}{\text{CPM}} \times 1000\)
- **Clicks**: \(C = I \times \text{CTR}\)
- **Actions** (installs/signups): \(A = C \times \text{CR}_{click\to action}\)
- **Trials**: \(T = A \times \text{CR}_{action\to trial}\)
- **Paid users**: \(P = T \times \text{CR}_{trial\to paid}\)
- **Gross revenue** (first period): \(R = P \times \text{Price}\)
- **Net revenue**: \(R_{net} = R \times (1 - \text{Fee})\)
- **CAC**: \(CAC = \frac{\text{Spend}}{P}\)

### Typical benchmark ranges (directional, not guarantees)
Use these as sanity checks and to spot “fantasy metrics”.

- **CPM**: varies heavily by geo/placement; model with a range, not a point.
- **CTR**: mobile ads often land in the **~1–4%** band; **creative** is the main lever.
- **CR click→install/signup**: commonly **~20–40%** (product + store page + targeting).
- **CR install→trial**: commonly **~10–15%** (onboarding + trial offer).
- **CR trial→paid**: commonly **~40–60%** (pricing, value, paywall, retention during trial).

### The highest-leverage insight: CTR multiplies the whole funnel
Because the funnel is multiplicative, improving the **earliest** step often yields the biggest absolute gains.

Rule of thumb:
- If you double **CTR** (with all other rates unchanged), you approximately double paid users and roughly halve CAC.

Implication for marketers:
- Don’t over-invest in “mid-funnel polishing” (onboarding/paywall tweaks) **before** your creative consistently hits competitive CTR.

### Creative recipe: pain → emotional hook → solution → action
A practical structure for direct-response creatives:

1. **Identify the real pain** (specific, vivid, recognizable)
2. **Emotional hook** (relief, hope, fear of loss, shame reduction, “you’re not broken” reframes)
3. **Show the solution** (what changes, how it works at a high level)
4. **Call to action** (single next step)

Checklist for a marketer reviewing a creative:
- Is the pain stated in user language?
- Does it remove friction/blame (when appropriate)?
- Is the promise specific but not absurd?
- Is the CTA singular and obvious?

### Subscription pricing: simplify choice, anchor with periods
Common subscription pattern:
- One core product, multiple billing periods (weekly/monthly/annual).
- Avoid too many feature-tier permutations early; reduce cognitive load.

Practical pricing notes:
- Weekly can be the “impulse” plan; annual is for confident users.
- Use annual as an anchor for value, but ensure weekly/monthly has clear perceived benefit.

## Practical examples
### Example 1 — quick viability check (paid funnel)
Given:
- Spend = $1,000
- CPM = $10
- CTR = 1.67%
- CR click→install = 30%
- CR install→trial = 12%
- CR trial→paid = 50%

Compute:
- Impressions = 100,000
- Clicks ≈ 1,670
- Installs ≈ 501
- Trials ≈ 60
- Paid ≈ 30

If net revenue per paid user in month 1 is < \(CAC\), you need either:
- better creative (CTR), or
- better economics (ARPU/LTV), or
- cheaper acquisition (CPM/targeting/geo), or
- higher conversion downstream.

### Example 2 — why creative wins
If CTR rises from 1.67% to 4% (same spend/CPM and downstream rates), paid users scale roughly by \(4/1.67 \approx 2.4x\).

## Links and resources
- Use your ad platforms’ built-in breakdowns: CPM/CTR by creative, audience, placement, geo.

## Notes
- Treat all benchmarks as ranges; your job is to build a model, test small, and let data pick winners.
- Start with a spreadsheet model; if the math can’t work on paper, it won’t work in ads.

