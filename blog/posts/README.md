# UTMCraft Blog Articles Directory

All 49 active production guides are organized in this directory as individual HTML files.

## URL Architecture & Routing Governance

- **Source File:** `blog/posts/[slug].html`
- **Production Canonical URL:** `https://utmcraft.com/[slug]/` (flat URL, no category in slug)
- **Category Hubs:** `https://utmcraft.com/blog/[category-slug]/`
- **Blog Homepage:** `https://utmcraft.com/blog/`

Both the Vite development server and the production build automatically route requests for `/[slug]/` and `/blog/[slug]/` to these files without broken links.

## Complete Article Roster

| Category | Type | Title | File | Canonical URL |
| :--- | :--- | :--- | :--- | :--- |
| UTM Strategy & Governance | **Pillar** | UTM Strategy Guide: How to Build a Tracking System That Stays Clean at Scale | `utm-strategy-guide.html` | [/utm-strategy-guide/](https://utmcraft.com/utm-strategy-guide/) |
| UTM Strategy & Governance | Supporting | UTM Naming Conventions: Frameworks, Formats, and Governance Rules | `utm-naming-conventions-guide.html` | [/utm-naming-conventions-guide/](https://utmcraft.com/utm-naming-conventions-guide/) |
| UTM Strategy & Governance | Supporting | Agency UTM Governance: Standardizing Campaign Tagging Across Clients and Teams | `agency-utm-governance.html` | [/agency-utm-governance/](https://utmcraft.com/agency-utm-governance/) |
| UTM Strategy & Governance | Supporting | Pre-Launch UTM QA Checklist: 16 Steps to Prevent Broken Campaign Attribution | `utm-qa-checklist.html` | [/utm-qa-checklist/](https://utmcraft.com/utm-qa-checklist/) |
| UTM Parameters | **Pillar** | Complete UTM Parameters Guide for GA4: Manual Campaign Dimensions & Best Practices | `ga4-utm-parameters-guide.html` | [/ga4-utm-parameters-guide/](https://utmcraft.com/ga4-utm-parameters-guide/) |
| UTM Parameters | Supporting | What Is utm_source? Naming Standards, Taxonomy & Common Mistakes | `utm-source-guide.html` | [/utm-source-guide/](https://utmcraft.com/utm-source-guide/) |
| UTM Parameters | Supporting | What Is utm_medium? GA4 Default Channel Grouping Rules & Standards | `utm-medium-guide.html` | [/utm-medium-guide/](https://utmcraft.com/utm-medium-guide/) |
| UTM Parameters | Supporting | What Is utm_campaign? Campaign Naming Frameworks, IDs & Taxonomy | `utm-campaign-guide.html` | [/utm-campaign-guide/](https://utmcraft.com/utm-campaign-guide/) |
| GA4 Attribution & Troubleshooting | **Pillar** | GA4 UTM Tracking Troubleshooting Guide: Root Causes, Debugging & Solutions | `ga4-utm-troubleshooting-guide.html` | [/ga4-utm-troubleshooting-guide/](https://utmcraft.com/ga4-utm-troubleshooting-guide/) |
| GA4 Attribution & Troubleshooting | Supporting | Why UTMs Don't Appear in GA4: 9 Causes and Step-by-Step Fixes | `ga4-utms-not-showing.html` | [/ga4-utms-not-showing/](https://utmcraft.com/ga4-utms-not-showing/) |
| GA4 Attribution & Troubleshooting | Supporting | Why Campaign Traffic Shows as Direct in GA4 (and How to Fix It) | `ga4-direct-traffic-troubleshooting.html` | [/ga4-direct-traffic-troubleshooting/](https://utmcraft.com/ga4-direct-traffic-troubleshooting/) |
| GA4 Attribution & Troubleshooting | Supporting | How to Fix "Unassigned" Traffic in GA4: Complete Diagnosis Guide | `ga4-unassigned-traffic.html` | [/ga4-unassigned-traffic/](https://utmcraft.com/ga4-unassigned-traffic/) |
| GA4 Attribution & Troubleshooting | Supporting | How to Fix (not set) Campaign and Source Data in GA4 Reports | `ga4-not-set.html` | [/ga4-not-set/](https://utmcraft.com/ga4-not-set/) |
| GA4 Attribution & Troubleshooting | Supporting | Why HTTP Redirects Strip UTM Parameters (and How to Preserve Query Strings) | `redirects-removing-utms.html` | [/redirects-removing-utms/](https://utmcraft.com/redirects-removing-utms/) |
| GA4 Attribution & Troubleshooting | Supporting | How to Test and QA UTM Parameters in GA4 DebugView and Realtime | `how-to-test-utms.html` | [/how-to-test-utms/](https://utmcraft.com/how-to-test-utms/) |
| Google Ads Tracking | **Pillar** | Google Ads UTM Tracking Guide: ValueTrack, Tracking Templates & GA4 Attribution | `google-ads-utm-guide.html` | [/google-ads-utm-guide/](https://utmcraft.com/google-ads-utm-guide/) |
| Google Ads Tracking | Supporting | Google Ads Auto-Tagging vs UTMs: When to Use GCLID, UTMs, or Both | `google-ads-auto-tagging-vs-utms.html` | [/google-ads-auto-tagging-vs-utms/](https://utmcraft.com/google-ads-auto-tagging-vs-utms/) |
| Google Ads Tracking | Supporting | GCLID vs UTM Parameters: Safari Privacy & Offline Conversion Tracking | `gclid-vs-utms.html` | [/gclid-vs-utms/](https://utmcraft.com/gclid-vs-utms/) |
| Google Ads Tracking | Supporting | Google Ads Tracking Template Setup: Custom Parameters & Parallel Tracking | `google-ads-tracking-templates.html` | [/google-ads-tracking-templates/](https://utmcraft.com/google-ads-tracking-templates/) |
| Meta Ads Tracking | **Pillar** | Meta Ads UTM Tracking Guide: Dynamic Parameters, Attribution Discrepancies & Setup | `meta-ads-utm-guide.html` | [/meta-ads-utm-guide/](https://utmcraft.com/meta-ads-utm-guide/) |
| Meta Ads Tracking | Supporting | Meta Dynamic Parameters Not Working? Fix Raw Tokens & Syntax | `meta-dynamic-url-parameters.html` | [/meta-dynamic-url-parameters/](https://utmcraft.com/meta-dynamic-url-parameters/) |
| LinkedIn Ads Tracking | **Pillar** | LinkedIn Ads UTM Tracking Guide: Dynamic Tokens, B2B Attribution & Campaign Setup | `linkedin-ads-utm-guide.html` | [/linkedin-ads-utm-guide/](https://utmcraft.com/linkedin-ads-utm-guide/) |
| LinkedIn Ads Tracking | Supporting | LinkedIn Dynamic URL Parameters: Token Syntax & QA Guide | `linkedin-dynamic-parameters.html` | [/linkedin-dynamic-parameters/](https://utmcraft.com/linkedin-dynamic-parameters/) |
| Email Marketing Tracking | **Pillar** | Email UTM Tracking Guide: Automated Flows, ESP Integration & Bot Filtering | `email-utm-guide.html` | [/email-utm-guide/](https://utmcraft.com/email-utm-guide/) |
| Email Marketing Tracking | Supporting | Email UTM Link Wrappers: Preserve Tags Through ESP Redirects | `email-utm-tracking.html` | [/email-utm-tracking/](https://utmcraft.com/email-utm-tracking/) |
| Organic Social, Influencer, PR & Partnerships | **Pillar** | How to Track Non-Paid Marketing With UTMs: Organic Social, PR & Partnerships | `non-paid-marketing-utm-tracking.html` | [/non-paid-marketing-utm-tracking/](https://utmcraft.com/non-paid-marketing-utm-tracking/) |
| Organic Social, Influencer, PR & Partnerships | Supporting | Influencer & Creator UTM Tracking: Promo Codes, Bio Links & Partner Governance | `influencer-utm-tracking.html` | [/influencer-utm-tracking/](https://utmcraft.com/influencer-utm-tracking/) |
| Offline & QR Tracking | **Pillar** | Offline Campaign Tracking With UTMs and QR Codes: Print, Events & Packaging | `offline-qr-utm-tracking.html` | [/offline-qr-utm-tracking/](https://utmcraft.com/offline-qr-utm-tracking/) |
| Offline & QR Tracking | Supporting | QR Code UTM Tracking: How to Track Print, Events, and Offline Clicks in GA4 | `qr-code-utm-tracking.html` | [/qr-code-utm-tracking/](https://utmcraft.com/qr-code-utm-tracking/) |
| UTM Operations, Automation & QA | **Pillar** | UTM Operations: How to Build a Reliable Campaign Tracking Workflow | `utm-operations-workflow.html` | [/utm-operations-workflow/](https://utmcraft.com/utm-operations-workflow/) |
| UTM Operations, Automation & QA | Supporting | Bulk UTM Creation Workflow: Generating Hundreds of Tagged Links Without Errors | `bulk-utm-workflow.html` | [/bulk-utm-workflow/](https://utmcraft.com/bulk-utm-workflow/) |
| UTM Operations, Automation & QA | Supporting | First-Touch vs Last-Touch UTM Attribution: Capture Models, Cookies & CRM Sync | `first-touch-vs-last-touch-utm.html` | [/first-touch-vs-last-touch-utm/](https://utmcraft.com/first-touch-vs-last-touch-utm/) |
| UTM Operations, Automation & QA | Supporting | How to Store UTM Parameters in CRM Hidden Fields (Salesforce, HubSpot & Forms) | `storing-utm-parameters-in-crm.html` | [/storing-utm-parameters-in-crm/](https://utmcraft.com/storing-utm-parameters-in-crm/) |
| UTM Mistakes & Tracking Audits | **Pillar** | 15 UTM Tracking Mistakes That Ruin Your GA4 Data (and How to Fix Them) | `utm-tracking-mistakes.html` | [/utm-tracking-mistakes/](https://utmcraft.com/utm-tracking-mistakes/) |
| UTM Mistakes & Tracking Audits | Supporting | 7 UTM Naming Mistakes Marketing Teams Keep Making | `utm-naming-mistakes.html` | [/utm-naming-mistakes/](https://utmcraft.com/utm-naming-mistakes/) |
| UTM Mistakes & Tracking Audits | Supporting | 5 utm_source Mistakes That Break Attribution in GA4 | `utm-source-mistakes.html` | [/utm-source-mistakes/](https://utmcraft.com/utm-source-mistakes/) |
| UTM Mistakes & Tracking Audits | Supporting | 5 utm_medium Mistakes That Send Traffic to the Wrong GA4 Channel | `utm-medium-mistakes.html` | [/utm-medium-mistakes/](https://utmcraft.com/utm-medium-mistakes/) |
| UTM Mistakes & Tracking Audits | Supporting | 10 Facebook Ads UTM Mistakes to Avoid in Meta Campaigns | `facebook-ads-utm-mistakes.html` | [/facebook-ads-utm-mistakes/](https://utmcraft.com/facebook-ads-utm-mistakes/) |
| UTM Mistakes & Tracking Audits | Supporting | 7 Google Ads Tracking Mistakes That Cause Bad Attribution | `google-ads-tracking-mistakes.html` | [/google-ads-tracking-mistakes/](https://utmcraft.com/google-ads-tracking-mistakes/) |
| UTM Mistakes & Tracking Audits | Supporting | 6 LinkedIn UTM Mistakes That Make Campaign Reporting Messy | `linkedin-utm-mistakes.html` | [/linkedin-utm-mistakes/](https://utmcraft.com/linkedin-utm-mistakes/) |
| UTM Mistakes & Tracking Audits | Supporting | 8 Email UTM Mistakes That Create Direct or Unassigned Traffic | `email-utm-mistakes.html` | [/email-utm-mistakes/](https://utmcraft.com/email-utm-mistakes/) |
| UTM Mistakes & Tracking Audits | Supporting | 5 QR Code Tracking Mistakes to Avoid in Print & Offline Campaigns | `qr-code-tracking-mistakes.html` | [/qr-code-tracking-mistakes/](https://utmcraft.com/qr-code-tracking-mistakes/) |
| UTM Mistakes & Tracking Audits | Supporting | 7 UTM Mistakes Agencies Make Across Client Accounts | `agency-utm-mistakes.html` | [/agency-utm-mistakes/](https://utmcraft.com/agency-utm-mistakes/) |
| UTM Mistakes & Tracking Audits | Supporting | 5 UTM Mistakes SaaS Companies Make in Lead Generation | `saas-utm-mistakes.html` | [/saas-utm-mistakes/](https://utmcraft.com/saas-utm-mistakes/) |
| UTM Mistakes & Tracking Audits | Supporting | 6 Ecommerce UTM Mistakes That Make Revenue Attribution Harder | `ecommerce-utm-mistakes.html` | [/ecommerce-utm-mistakes/](https://utmcraft.com/ecommerce-utm-mistakes/) |
| UTM Mistakes & Tracking Audits | Supporting | 5 Redirect Mistakes That Strip UTM Parameters and GCLIDs | `redirect-utm-mistakes.html` | [/redirect-utm-mistakes/](https://utmcraft.com/redirect-utm-mistakes/) |
| UTM Mistakes & Tracking Audits | Supporting | 7 Campaign Naming Mistakes That Fragment GA4 Reports | `campaign-naming-mistakes.html` | [/campaign-naming-mistakes/](https://utmcraft.com/campaign-naming-mistakes/) |
| UTM Mistakes & Tracking Audits | Supporting | 5 UTM Mistakes to Fix Before Launching a Paid Campaign | `pre-launch-utm-mistakes.html` | [/pre-launch-utm-mistakes/](https://utmcraft.com/pre-launch-utm-mistakes/) |
| UTM Mistakes & Tracking Audits | Supporting | 10 Signs Your UTM Tracking System Needs an Immediate Audit | `utm-tracking-audit-signs.html` | [/utm-tracking-audit-signs/](https://utmcraft.com/utm-tracking-audit-signs/) |
