# Sales pipeline and minimal CRM (from lead to close)

## Description
A founder-friendly sales pipeline: 5 stages, benchmark conversion ranges, a minimal CRM schema, and simple automations so leads don’t get lost.

## Main sections
### Why pipeline matters
Marketing brings people to the door. Pipeline decides what happens next.

### 5-stage pipeline (default)
Use a simple linear pipe:

**LEAD → FIRST CONTACT → SCHEDULED DEMO → OFFER → CLOSED**

Add final status split:
- **Closed Won**
- **Closed Lost**

### Benchmark conversions (directional)
Use as diagnostics, not “truth”:

- Lead → Contact: 40–50% (good: 60–70%+)
- Contact → Demo: 15–20% (good: 25–30%+)
- Demo → Offer: 50–60% (good: 70–80%+)
- Offer → Close: 20–25% (good: 30–40%+)
- Lead → Close: 5–8% (good: 12–15%+)

Red flags:
- Lead→Close < 5%: likely PMF/targeting/offer issues.
- Demo→Close < 15%: likely demo/closing skill or mismatch.

### Minimal CRM schema
You can run this in Airtable/Notion/NocoDB/HubSpot.

Table: `Leads`
- Name
- Email
- Company
- Role
- Company size (select)
- Stage (select)
- Notes (long text)
- Source (UTM / channel)
- Created date
- Next step (text)
- Next step due date

Stages:
- Lead
- First Contact
- Scheduled Demo
- Offer Sent
- Closed Won
- Closed Lost

### Must-have automations
1. **Welcome / scheduling email** on new lead
2. **Team notification** on new lead
3. **Follow-up reminders** when next-step date is missing/overdue

## Practical examples
### Example 1 — welcome email template
“Hi {Name},

Thanks for your interest in {product}. Let’s discuss how it can help with {problem from form}.

Pick a time: {calendar link}

— {Signature}”

## Links and resources
- Keep a weekly pipeline review: every card must have a next step + due date.

## Notes
- A “simple pipeline fully used” beats an “enterprise pipeline ignored”.

