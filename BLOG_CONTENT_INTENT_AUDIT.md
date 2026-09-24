# Blog content intent audit

This audit compares each guide's current subject with the other UTMCraft guides. “Distinct query” describes the separate task the page should answer; it is an editorial target, not a claim about Search Console performance. Check impressions, clicks, and conversions before making further URL consolidations.

## Strategy and taxonomy

| Guide | Distinct query or task | Decision |
|---|---|---|
| UTM Strategy Guide | Build an organization-wide UTM governance system | Keep as the strategy overview |
| UTM Naming Conventions | Choose naming formats, delimiters, and taxonomy rules | Keep; focus on naming standards |
| Agency UTM Governance | Standardize tagging across multiple agency clients | Keep; agency operating model is specific |
| Pre-Launch UTM QA Checklist | Validate a campaign URL before launch | Keep; checklist intent differs from strategy |
| Complete UTM Parameters Guide for GA4 | Understand all standard and GA4-specific UTM fields | Keep as the parameter reference |
| What Is utm_source? | Choose and standardize source values | Keep; one parameter and its taxonomy |
| What Is utm_medium? | Map medium values to GA4 channel groups | Keep; channel classification intent |
| What Is utm_campaign? | Structure campaign names and use campaign IDs | Keep; campaign naming intent |

## GA4 troubleshooting

| Guide | Distinct query or task | Decision |
|---|---|---|
| GA4 UTM Tracking Troubleshooting Guide | Diagnose campaign tracking failures across causes | Keep as the troubleshooting overview |
| Why UTMs Don't Appear in GA4 | Find why expected UTM values are missing | Keep; missing-data diagnosis |
| Why Campaign Traffic Shows as Direct in GA4 | Diagnose unexpected Direct attribution | Keep; Direct-specific diagnosis |
| How to Fix Unassigned Traffic in GA4 | Identify invalid source/medium channel mapping | Keep; Unassigned-specific diagnosis |
| How to Fix (not set) Campaign and Source Data | Diagnose missing dimension values in reports | Keep; `(not set)` has a separate cause set |
| Why HTTP Redirects Strip UTM Parameters | Preserve query strings through web redirects | Keep; server and redirect configuration |
| How to Test and QA UTM Parameters in GA4 | Verify events in DebugView, Realtime, and DevTools | Keep; pre-launch test procedure |

## Google Ads

| Guide | Distinct query or task | Decision |
|---|---|---|
| Google Ads UTM Tracking Guide | Configure ValueTrack, suffixes, and GA4 integration | Keep as the platform overview |
| Google Ads Auto-Tagging vs UTMs | Decide when to use GCLID, UTMs, or both | Keep; focused comparison |
| GCLID Tracking in Safari | Understand ITP limits and capture click IDs for CRM/offline conversions | Keep; refocused on privacy and CRM capture, not a second general comparison |
| Google Ads Tracking Template Setup | Configure custom parameters and parallel tracking | Keep; refocused on the implementation details beyond the overview |

## Meta Ads

| Guide | Distinct query or task | Decision |
|---|---|---|
| Meta Ads UTM Tracking Guide | Set up Meta UTMs and reconcile Meta reporting with GA4 | Keep as the platform overview |
| Meta Ads UTM Tracking: Setup, Placement Tracking & Reporting | Same general setup and reporting task as the overview | Merge into the overview; redirect the old URL |
| Meta Dynamic Parameters Not Working? | Diagnose raw, unexpanded Meta URL tokens and syntax | Keep; focused on macro expansion and QA |

## LinkedIn Ads

| Guide | Distinct query or task | Decision |
|---|---|---|
| LinkedIn Ads UTM Tracking Guide | Configure LinkedIn tracking for web and Lead Gen Forms | Keep as the platform overview |
| LinkedIn Ads UTM Tracking: B2B Attribution & Hierarchy Setup | Same general setup and hierarchy task as the overview | Merge into the overview; redirect the old URL |
| LinkedIn Dynamic URL Parameters | Check token syntax and QA dynamic values before launch | Keep; focused on token reference and verification |

## Email

| Guide | Distinct query or task | Decision |
|---|---|---|
| Email UTM Tracking Guide | Standardize newsletters and automated-flow UTMs across ESPs | Keep as the email tracking overview |
| Email UTM Link Wrappers | Find where ESP click redirects drop UTM query parameters | Keep; narrowed to redirect diagnosis and validation |

## Non-paid, offline, and operations

| Guide | Distinct query or task | Decision |
|---|---|---|
| Track Non-Paid Marketing With UTMs | Tag organic social, PR, and partnership traffic | Keep as the non-paid channel overview |
| Influencer & Creator UTM Tracking | Attribute creator campaigns, bio links, and promo codes | Keep; creator-specific workflows |
| Offline Campaign Tracking With UTMs and QR Codes | Plan tracking across print, events, and packaging | Keep as the offline overview |
| QR Code UTM Tracking | Generate, print, and test campaign QR codes | Keep; QR implementation task |
| UTM Operations Workflow | Build an end-to-end campaign tracking operation | Keep as the operations overview |
| Bulk UTM Creation Workflow | Generate and distribute many campaign URLs consistently | Keep; bulk-production task |
| First-Touch vs Last-Touch UTM Attribution | Store and report first- and last-touch attribution | Keep; attribution capture model comparison |
| Store UTM Parameters in CRM Hidden Fields | Capture landing-page UTMs in forms and CRM fields | Keep; form and CRM implementation |

## UTM Mistakes & Tracking Audits

| Guide | Distinct query or task | Decision |
|---|---|---|
| 15 UTM Tracking Mistakes That Ruin Your GA4 Data | Comprehensive catalog of destructive tracking errors across platforms | Keep as the cluster pillar guide |
| 7 UTM Naming Mistakes Marketing Teams Keep Making | Diagnose and fix team naming drift, inconsistent casing, and delimiters | Keep; naming and taxonomy governance focus |
| 5 utm_source Mistakes That Break Attribution | Eliminate entity vs channel confusion and fragmented source rows | Keep; source-specific parameter diagnosis |
| 5 utm_medium Mistakes That Send Traffic to the Wrong GA4 Channel | Prevent Unassigned traffic caused by non-standard mediums and casing | Keep; channel grouping compliance focus |
| 10 Facebook Ads UTM Mistakes to Avoid | Fix Meta Ads Manager URL parameters, dynamic tokens, and link shims | Keep; Meta-specific ad attribution focus |
| 7 Google Ads Tracking Mistakes That Cause Bad Attribution | Resolve ValueTrack syntax, auto-tagging conflicts, and suffix errors | Keep; Google Ads tracking template focus |
| 6 LinkedIn UTM Mistakes That Make Campaign Reporting Messy | Fix uppercase macro tokens and prevent lnkd.in referral categorization | Keep; LinkedIn B2B ad attribution focus |
| 8 Email UTM Mistakes That Create Direct or Unassigned Traffic | Fix referrerless clicks, ESP link wrapper drops, and security bot skew | Keep; email channel attribution focus |
| 5 QR Code Tracking Mistakes to Avoid | Prevent offline print and packaging scans from turning into Direct | Keep; offline QR implementation focus |
| 7 UTM Mistakes Agencies Make Across Client Accounts | Enforce cross-client naming standards and prevent client taxonomy overwrites | Keep; agency media operations focus |
| 5 UTM Mistakes SaaS Companies Make in Lead Generation | Bridge marketing site to app subdomain drops and preserve lead attribution | Keep; B2B SaaS pipeline attribution focus |
| 6 Ecommerce UTM Mistakes That Make Revenue Attribution Harder | Eliminate payment gateway referral overwrites and internal promo drops | Keep; ecommerce purchase attribution focus |
| 5 Redirect Mistakes That Strip UTM Parameters | Fix 301 server rewrites, protocol upgrades, and trailing slash drops | Keep; web server & redirect architecture focus |
| 7 Campaign Naming Mistakes That Fragment GA4 Reports | Prevent duplicate campaign rows and design durable naming formulas | Keep; campaign taxonomy structure focus |
| 5 UTM Mistakes to Fix Before Launching a Paid Campaign | Run pre-flight QA testing in DebugView and incognito browser checks | Keep; pre-launch verification checklist focus |
| 10 Signs Your UTM Tracking System Needs an Audit | Recognize early warning signals of failing attribution data hygiene | Keep; diagnostic triage & audit trigger focus |

