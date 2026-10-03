// Published campaign workflow guides.
export const campaignWorkflowPosts = [
  {
    "slug": "how-to-bulk-add-utm-parameters-to-google-ads",
    "title": "How to Bulk Add UTM Parameters to Google Ads",
    "seoTitle": "Bulk Add UTM Parameters to Google Ads | UTMCraft",
    "description": "Add UTMs across Google Ads campaigns using a shared final URL suffix or campaign-specific CSV changes. Includes examples, checks and rollback steps.",
    "category": "google-ads",
    "isPillar": false,
    "author": {
      "name": "Dinesh Jeengar",
      "role": "Founder, UTMCraft",
      "url": "https://utmcraft.com/about/"
    },
    "datePublished": "2026-10-03",
    "dateModified": "2026-10-03",
    "reviewedDate": "October 3, 2026",
    "readingTime": "6 min read",
    "primaryKeyword": "how to bulk add utm parameters to google ads",
    "secondaryKeywords": [],
    "semanticKeywords": [],
    "relatedEntities": [
      "Google Analytics 4",
      "UTM parameters"
    ],
    "searchIntent": "Practical implementation guide",
    "featuredImage": "/blog/images/how-to-bulk-add-utm-parameters-to-google-ads.webp",
    "featuredImageAlt": "Illustration of bulk UTM campaign tagging in Google Ads",
    "featuredImageCaption": "Illustrative banner, not an actual Google Ads screenshot. Follow the article for the documented settings and bulk-edit workflow.",
    "tableOfContents": [
      {
        "id": "choose-the-setup-that-matches-your-account",
        "title": "Choose the setup that matches your account",
        "level": 2
      },
      {
        "id": "start-with-an-inventory-and-backup",
        "title": "Start with an inventory and backup",
        "level": 2
      },
      {
        "id": "option-1-use-a-shared-account-level-suffix",
        "title": "Option 1: Use a shared account-level suffix",
        "level": 2
      },
      {
        "id": "option-2-prepare-different-suffixes-for-different-campaigns",
        "title": "Option 2: Prepare different suffixes for different campaigns",
        "level": 2
      },
      {
        "id": "test-three-layers-before-expanding-the-rollout",
        "title": "Test three layers before expanding the rollout",
        "level": 2
      },
      {
        "id": "keep-auto-tagging-and-manual-campaign-values-separate-in-your-review",
        "title": "Keep auto-tagging and manual campaign values separate in your review",
        "level": 2
      },
      {
        "id": "roll-back-using-the-saved-values",
        "title": "Roll back using the saved values",
        "level": 2
      },
      {
        "id": "questions-before-you-launch",
        "title": "Questions before you launch",
        "level": 2
      }
    ],
    "toolCta": {
      "title": "Prepare Google Ads campaign parameters",
      "description": "Prepare or review the URL, then verify the relevant platform settings and measurement separately.",
      "link": "/utm-builder/google-ads/",
      "buttonText": "Open tool"
    },
    "relatedSlugs": [
      "google-ads-utm-guide",
      "google-ads-tracking-templates",
      "google-ads-auto-tagging-vs-utms"
    ],
    "references": [
      {
        "title": "Google Ads tracking tests",
        "url": "https://support.google.com/google-ads/answer/6076199",
        "publisher": "Google Help"
      },
      {
        "title": "ValueTrack reference",
        "url": "https://support.google.com/google-ads/answer/6305348",
        "publisher": "Google Help"
      },
      {
        "title": "Add a final URL suffix",
        "url": "https://support.google.com/google-ads/answer/9054021",
        "publisher": "Google Help"
      },
      {
        "title": "Editor CSV columns",
        "url": "https://support.google.com/google-ads/editor/answer/57747",
        "publisher": "Google Help"
      },
      {
        "title": "Edit campaign settings in Editor",
        "url": "https://support.google.com/google-ads/editor/answer/30570",
        "publisher": "Google Help"
      },
      {
        "title": "GA4 manual and automatic tagging",
        "url": "https://support.google.com/analytics/answer/11242870",
        "publisher": "Google Help"
      }
    ],
    "contentHtml": "<p>You do not need to open every ad to add campaign tracking parameters. For a shared tagging format, you can use a final URL suffix at account level. If campaigns need different values, prepare campaign-level changes in Google Ads Editor and review them before posting.</p>\n<p>The important decision is where the tagging should live. Appending the same UTM string to every final URL may create duplicates if the account already adds those parameters elsewhere.</p>\n<p>This guide covers website campaign tagging. It does not replace Google Ads conversion tracking, and adding UTMs does not automatically configure GA4 or a CRM.</p>\n<h2 id=\"choose-the-setup-that-matches-your-account\">Choose the setup that matches your account</h2>\n<div class=\"editorial-table-wrap\"><table class=\"editorial-table\">\n<thead>\n<tr>\n<th>Situation</th>\n<th>Suggested approach</th>\n<th>Check first</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Campaigns share one tagging format</td>\n<td>Account-level final URL suffix with supported dynamic parameters</td>\n<td>Existing URL options and campaign exceptions</td>\n</tr>\n<tr>\n<td>Campaigns need readable, distinct names</td>\n<td>Campaign-level suffixes, prepared in Editor</td>\n<td>Names match the campaigns already in the account</td>\n</tr>\n<tr>\n<td>A third-party click tracker is installed</td>\n<td>Review its required template and suffix together</td>\n<td>Who maintains the tracker and which parameters it needs</td>\n</tr>\n<tr>\n<td>You need tagged URLs for newsletters or social posts</td>\n<td>Build complete campaign URLs separately</td>\n<td>Those links are not Google Ads suffixes</td>\n</tr>\n</tbody></table></div>\n<p>Google distinguishes the landing-page URL, tracking template and final URL suffix. A suffix adds parameters to the destination, while a template can involve a tracking service. Read the account&#39;s existing settings before choosing a replacement. <a href=\"https://support.google.com/google-ads/answer/6076199\">About tracking in Google Ads</a></p>\n<h2 id=\"start-with-an-inventory-and-backup\">Start with an inventory and backup</h2>\n<p>Create a record of your current URL configuration before applying changes. Include the account, campaigns, ad groups, ads, keywords and sitelinks that use tracking settings. Look for UTMs already in final URLs, custom parameters, existing suffixes and third-party templates.</p>\n<p>For each planned change, record the entity, previous value, proposed value and reason. This makes rollback possible without guessing what used to be there.</p>\n<p>Do not assume a shared account setting will produce the same effective URL for every entity. Audit lower-level settings and test representative examples, including any exceptions.</p>\n<h2 id=\"option-1-use-a-shared-account-level-suffix\">Option 1: Use a shared account-level suffix</h2>\n<p>A useful starting example is:</p>\n<div class=\"code-block-wrap\"><pre><code class=\"language-text\">utm_source=google&amp;utm_medium=cpc&amp;utm_campaign={campaignid}&amp;utm_id={campaignid}&amp;utm_source_platform=google_ads\n</code></pre><button class=\"copy-code-btn\" data-copy=\"utm_source=google&amp;utm_medium=cpc&amp;utm_campaign={campaignid}&amp;utm_id={campaignid}&amp;utm_source_platform=google_ads\" aria-label=\"Copy example\">Copy</button></div>\n<p>This is a suffix, not a complete URL. It contains no website address, leading question mark or <code>{lpurl}</code> placeholder.</p>\n<p><code>{campaignid}</code> is a supported Google Ads ValueTrack parameter. It produces an identifier rather than a readable campaign name. Keep a campaign-ID lookup if people consuming your CRM data need names. Dynamic parameters have different availability across campaign types; check any additional token against Google&#39;s reference. <a href=\"https://support.google.com/google-ads/answer/6305348\">ValueTrack reference</a></p>\n<p>In Google Ads, open <strong>Admin → Account settings</strong>, open the tracking settings, and place the parameter string in <strong>Final URL suffix</strong>. Check the existing value before saving. Google documents suffix setup at account and other entity levels. <a href=\"https://support.google.com/google-ads/answer/9054021\">Add a final URL suffix</a></p>\n<p>For an illustrative campaign ID of <code>123456789</code>, a destination could resolve to:</p>\n<div class=\"code-block-wrap\"><pre><code class=\"language-text\">https://example.com/demo?utm_source=google&amp;utm_medium=cpc&amp;utm_campaign=123456789&amp;utm_id=123456789&amp;utm_source_platform=google_ads\n</code></pre><button class=\"copy-code-btn\" data-copy=\"https://example.com/demo?utm_source=google&amp;utm_medium=cpc&amp;utm_campaign=123456789&amp;utm_id=123456789&amp;utm_source_platform=google_ads\" aria-label=\"Copy example\">Copy</button></div>\n<p>The ID is an example, not a real campaign or a measured result. An auto-tagged click can also include click identifiers; do not remove them as part of a UTM cleanup.</p>\n<h2 id=\"option-2-prepare-different-suffixes-for-different-campaigns\">Option 2: Prepare different suffixes for different campaigns</h2>\n<p>If your reporting convention requires readable campaign names, use a planning table like this:</p>\n<div class=\"editorial-table-wrap\"><table class=\"editorial-table\">\n<thead>\n<tr>\n<th>Existing campaign</th>\n<th>Intended campaign value</th>\n<th>Proposed suffix</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Search - Brand - UAE</td>\n<td>brand-search-uae</td>\n<td><code>utm_source=google&amp;utm_medium=cpc&amp;utm_campaign=brand-search-uae&amp;utm_id={campaignid}&amp;utm_source_platform=google_ads</code></td>\n</tr>\n<tr>\n<td>Search - Demo - UAE</td>\n<td>demo-search-uae</td>\n<td><code>utm_source=google&amp;utm_medium=cpc&amp;utm_campaign=demo-search-uae&amp;utm_id={campaignid}&amp;utm_source_platform=google_ads</code></td>\n</tr>\n</tbody></table></div>\n<p>These are fictional campaign names. Substitute names from your account, not new names you expect the import to create.</p>\n<p>In Google Ads Editor:</p>\n<ol>\n<li>Download current account changes and select the intended campaigns.</li>\n<li>Export the relevant existing campaign data as your backup and working starting point.</li>\n<li>Prepare the <strong>Campaign</strong> and <strong>Final URL suffix</strong> columns for the existing campaign rows. Keep identity fields required by your export or import workflow.</li>\n<li>Import the file and check column mapping and the proposed changes.</li>\n<li>Confirm the preview edits the intended campaigns, with no unexpected additions or changes to other fields.</li>\n<li>Resolve errors, review the diff and post only after a small pilot passes.</li>\n</ol>\n<p>Editor recognises a <strong>Final URL suffix</strong> column. A blank imported field normally means no change; <code>[]</code> instructs Editor to erase an existing value. Do not treat those as interchangeable when preparing a rollback. <a href=\"https://support.google.com/google-ads/editor/answer/57747\">Editor CSV columns</a></p>\n<p>For a shared value, Editor also supports editing multiple selected campaigns together. Review what is selected before changing a field. <a href=\"https://support.google.com/google-ads/editor/answer/30570\">Edit campaign settings in Editor</a></p>\n<h2 id=\"test-three-layers-before-expanding-the-rollout\">Test three layers before expanding the rollout</h2>\n<p><strong>Configuration:</strong> Check one ordinary campaign and one with custom URL options. Use Google Ads&#39; available URL testing function, which checks the assembled destination. A successful destination test is not proof that GA4 received the visit. <a href=\"https://support.google.com/google-ads/answer/6076199\">Google Ads tracking tests</a></p>\n<p><strong>Landing page:</strong> Inspect the resulting URL and its redirect chain. Confirm the intended UTMs survive, required non-UTM query parameters remain, and each tracking key appears once. Avoid repeatedly clicking your own live ads to perform QA.</p>\n<p><strong>Measurement:</strong> Separately confirm your website tag receives the intended page location. After processing, inspect the appropriate campaign dimensions in GA4 and any fields collected by your CRM. Manual URL testing confirms collection behaviour; it cannot simulate every part of a genuine auto-tagged ad click.</p>\n<h2 id=\"keep-auto-tagging-and-manual-campaign-values-separate-in-your-review\">Keep auto-tagging and manual campaign values separate in your review</h2>\n<p>With Google Ads and GA4 integrated, auto-tagging supplies advertising dimensions. GA4 can use auto-tagged information for its cross-channel traffic classification while retaining supported manual fields. Do not assume a manually supplied campaign string must replace the Google Ads campaign name everywhere. <a href=\"https://support.google.com/analytics/answer/11242870\">GA4 manual and automatic tagging</a></p>\n<h2 id=\"roll-back-using-the-saved-values\">Roll back using the saved values</h2>\n<p>If the pilot produces incorrect destinations or campaign values, restore the settings for the entities you changed. Re-test the destination and collection after restoration. A configuration rollback does not rewrite already collected analytics data.</p>\n<p>Use the <a href=\"https://utmcraft.com/utm-builder/google-ads/\">Google Ads UTM builder</a> to prepare candidate parameters. For the broader setup, read the <a href=\"https://utmcraft.com/google-ads-utm-guide/\">Google Ads UTM tracking guide</a>. Always distinguish a full generated URL from the parameter string required by a suffix field.</p>\n<h2 id=\"questions-before-you-launch\">Questions before you launch</h2>\n<p><strong>Should I add <code>{keyword}</code> to every campaign?</strong></p>\n<p>Only when it serves a reporting purpose and is supported for your traffic. Keyword availability is not universal, and a ValueTrack keyword is not a promise of the user&#39;s exact search query.</p>\n<p><strong>Can I use the same UTMs in the final URL and suffix?</strong></p>\n<p>Avoid defining the same keys in multiple places. Inspect the assembled URL rather than relying on a presumed precedence rule.</p>\n<p><strong>Does adding a suffix activate conversion tracking?</strong></p>\n<p>No. Conversion measurement requires its own configuration and validation.</p>\n",
    "preserveFeaturedImage": true,
    "featuredImageMetadata": {
      "width": 1200,
      "height": 630,
      "type": "image/webp"
    }
  },
  {
    "slug": "duplicate-utm-parameters",
    "title": "Duplicate UTM Parameters: How to Find and Fix Them",
    "seoTitle": "Duplicate UTM Parameters: Find and Fix Conflicts | UTMCraft",
    "description": "Spot repeated UTM keys, choose the intended campaign values, and rebuild clean links without losing other query parameters or URL fragments.",
    "category": "utm-operations",
    "isPillar": false,
    "author": {
      "name": "Dinesh Jeengar",
      "role": "Founder, UTMCraft",
      "url": "https://utmcraft.com/about/"
    },
    "datePublished": "2026-10-03",
    "dateModified": "2026-10-03",
    "reviewedDate": "October 3, 2026",
    "readingTime": "5 min read",
    "primaryKeyword": "duplicate utm parameters",
    "secondaryKeywords": [],
    "semanticKeywords": [],
    "relatedEntities": [
      "Google Analytics 4",
      "UTM parameters"
    ],
    "searchIntent": "Practical implementation guide",
    "featuredImage": "/blog/images/duplicate-utm-parameters.webp",
    "featuredImageAlt": "Illustration of a URL containing conflicting utm_source parameters",
    "featuredImageCaption": "Illustrative banner, not an actual GA4 report. Example figures and highlighted rows do not establish how GA4 processes duplicate URL parameters.",
    "tableOfContents": [
      {
        "id": "distinguish-duplicate-keys-from-repeated-values",
        "title": "Distinguish duplicate keys from repeated values",
        "level": 2
      },
      {
        "id": "how-duplicates-enter-a-campaign-workflow",
        "title": "How duplicates enter a campaign workflow",
        "level": 2
      },
      {
        "id": "check-all-occurrences-not-just-one-displayed-value",
        "title": "Check all occurrences, not just one displayed value",
        "level": 2
      },
      {
        "id": "decide-which-values-belong-in-the-final-link",
        "title": "Decide which values belong in the final link",
        "level": 2
      },
      {
        "id": "rebuild-the-query-without-deleting-useful-parameters",
        "title": "Rebuild the query without deleting useful parameters",
        "level": 2
      },
      {
        "id": "fix-the-origin-of-the-problem",
        "title": "Fix the origin of the problem",
        "level": 2
      },
      {
        "id": "verify-the-complete-journey",
        "title": "Verify the complete journey",
        "level": 2
      },
      {
        "id": "frequently-asked-questions",
        "title": "Frequently asked questions",
        "level": 2
      }
    ],
    "toolCta": {
      "title": "Review campaign URL fields",
      "description": "Prepare or review the URL, then verify the relevant platform settings and measurement separately.",
      "link": "/utm-checker/",
      "buttonText": "Open tool"
    },
    "relatedSlugs": [
      "how-to-test-utms",
      "redirects-removing-utms",
      "utm-qa-checklist"
    ],
    "references": [
      {
        "title": "URL hash reference",
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/URL/hash",
        "publisher": "MDN Web Docs"
      },
      {
        "title": "Google Ads URL configuration",
        "url": "https://support.google.com/google-ads/answer/6076199",
        "publisher": "Google Help"
      },
      {
        "title": "get() documentation",
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get",
        "publisher": "MDN Web Docs"
      },
      {
        "title": "getAll() documentation",
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/getAll",
        "publisher": "MDN Web Docs"
      },
      {
        "title": "set() documentation",
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/set",
        "publisher": "MDN Web Docs"
      },
      {
        "title": "GA4 traffic-source dimensions",
        "url": "https://support.google.com/analytics/answer/11242870",
        "publisher": "Google Help"
      }
    ],
    "contentHtml": "<p>A campaign URL has duplicate UTM parameters when the same tracking key appears more than once in its query string:</p>\n<div class=\"code-block-wrap\"><pre><code class=\"language-text\">https://example.com/demo?utm_source=newsletter&amp;utm_source=facebook&amp;utm_medium=email&amp;utm_campaign=demo-launch\n</code></pre><button class=\"copy-code-btn\" data-copy=\"https://example.com/demo?utm_source=newsletter&amp;utm_source=facebook&amp;utm_medium=email&amp;utm_campaign=demo-launch\" aria-label=\"Copy example\">Copy</button></div>\n<p>Here, <code>utm_source</code> has two conflicting values. The URL can still open successfully, but opening the page does not establish which value your analytics or CRM will use.</p>\n<p>The safest fix is to identify the intended source, keep one value for each tracking key, and stop the system that added the duplicate. There is no reliable universal rule that the first or last occurrence wins across every consumer.</p>\n<h2 id=\"distinguish-duplicate-keys-from-repeated-values\">Distinguish duplicate keys from repeated values</h2>\n<div class=\"editorial-table-wrap\"><table class=\"editorial-table\">\n<thead>\n<tr>\n<th>Example</th>\n<th>What it means</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><code>utm_source=email&amp;utm_source=facebook</code></td>\n<td>One key appears twice with conflicting values</td>\n</tr>\n<tr>\n<td><code>utm_source=email&amp;utm_source=email</code></td>\n<td>One key appears twice with identical values; still redundant</td>\n</tr>\n<tr>\n<td><code>utm_campaign=launch&amp;utm_content=launch</code></td>\n<td>Two different keys share a value; not a duplicate key</td>\n</tr>\n<tr>\n<td><code>utm_source=email&amp;UTM_SOURCE=facebook</code></td>\n<td>Different spellings; investigate inconsistent keys rather than assuming normalisation</td>\n</tr>\n<tr>\n<td><code>?utm_source=email#utm_source=facebook</code></td>\n<td>A query value and text in the fragment; not two query occurrences</td>\n</tr>\n</tbody></table></div>\n<p>The fragment is the portion after <code>#</code>. It is separate from the URL&#39;s query string, so inspecting text alone can misidentify a duplicate. <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/URL/hash\">URL hash reference</a></p>\n<h2 id=\"how-duplicates-enter-a-campaign-workflow\">How duplicates enter a campaign workflow</h2>\n<p>Common places to inspect include:</p>\n<ul>\n<li>A marketer pastes an already tagged URL into a builder that appends new tags.</li>\n<li>An email platform adds its own campaign tags to a link containing manual tags.</li>\n<li>A Google Ads final URL already includes keys also supplied by its suffix.</li>\n<li>A redirect or landing-page script appends parameters without checking for existing values.</li>\n<li>Two teams each believe they own the tagging step.</li>\n</ul>\n<p>These are diagnostic possibilities, not proof of what happened to your link. Record the URL before and after each system to locate the actual change.</p>\n<p>For Google Ads, review the destination, suffix and any tracking template together. <a href=\"https://support.google.com/google-ads/answer/6076199\">Google Ads URL configuration</a></p>\n<h2 id=\"check-all-occurrences-not-just-one-displayed-value\">Check all occurrences, not just one displayed value</h2>\n<p>A parser that returns one value can hide a duplicate. In the browser&#39;s URL API, <code>get()</code> returns the first matching value; <code>getAll()</code> returns every value for the requested key. That tells you how these APIs behave, not how GA4 or a third-party CRM necessarily processes a duplicate. <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get\">get() documentation</a>, <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/getAll\">getAll() documentation</a></p>\n<p>You can inspect a link locally with this JavaScript example. Replace the illustrative URL with a link you are authorised to inspect:</p>\n<div class=\"code-block-wrap\"><pre><code class=\"language-javascript\">const url = new URL(\n  &#39;https://example.com/demo?utm_source=email&amp;utm_source=facebook&amp;utm_campaign=launch&#39;\n);\n\nconst keys = [...new Set(url.searchParams.keys())];\nconst duplicates = keys\n  .filter(key =&gt; key.startsWith(&#39;utm_&#39;))\n  .map(key =&gt; ({ key, values: url.searchParams.getAll(key) }))\n  .filter(entry =&gt; entry.values.length &gt; 1);\n\nconsole.table(duplicates);\n</code></pre><button class=\"copy-code-btn\" data-copy=\"const url = new URL(\n  'https://example.com/demo?utm_source=email&amp;utm_source=facebook&amp;utm_campaign=launch'\n);\n\nconst keys = [...new Set(url.searchParams.keys())];\nconst duplicates = keys\n  .filter(key =&gt; key.startsWith('utm_'))\n  .map(key =&gt; ({ key, values: url.searchParams.getAll(key) }))\n  .filter(entry =&gt; entry.values.length &gt; 1);\n\nconsole.table(duplicates);\" aria-label=\"Copy example\">Copy</button></div>\n<p>This snippet reads the URL string without visiting the destination or changing the website. It detects exact lowercase <code>utm_</code> keys. It does not consolidate mixed-case spellings, inspect redirects or validate analytics collection. Review inconsistent spellings separately.</p>\n<h2 id=\"decide-which-values-belong-in-the-final-link\">Decide which values belong in the final link</h2>\n<p>Do not choose a source based only on its position in the URL. Ask where the link will actually be distributed.</p>\n<p>For a link in a newsletter, an approved convention could be:</p>\n<div class=\"editorial-table-wrap\"><table class=\"editorial-table\">\n<thead>\n<tr>\n<th>Field</th>\n<th>Intended value</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Source</td>\n<td><code>newsletter</code></td>\n</tr>\n<tr>\n<td>Medium</td>\n<td><code>email</code></td>\n</tr>\n<tr>\n<td>Campaign</td>\n<td><code>demo-launch</code></td>\n</tr>\n<tr>\n<td>Content</td>\n<td><code>hero-button</code></td>\n</tr>\n</tbody></table></div>\n<p>For a paid social advertisement, the intended values would be different. The purpose is one coherent campaign description, not mechanically deleting whichever parameter comes second.</p>\n<p>Get the campaign owner to confirm ambiguous values. Preserve a copy of the original link and document the chosen convention for future sends.</p>\n<h2 id=\"rebuild-the-query-without-deleting-useful-parameters\">Rebuild the query without deleting useful parameters</h2>\n<p>Suppose your original link is:</p>\n<div class=\"code-block-wrap\"><pre><code class=\"language-text\">https://example.com/pricing?plan=pro&amp;utm_source=newsletter&amp;utm_source=facebook&amp;utm_medium=email&amp;utm_campaign=demo-launch#compare\n</code></pre><button class=\"copy-code-btn\" data-copy=\"https://example.com/pricing?plan=pro&amp;utm_source=newsletter&amp;utm_source=facebook&amp;utm_medium=email&amp;utm_campaign=demo-launch#compare\" aria-label=\"Copy example\">Copy</button></div>\n<p>For the newsletter example, the corrected version is:</p>\n<div class=\"code-block-wrap\"><pre><code class=\"language-text\">https://example.com/pricing?plan=pro&amp;utm_source=newsletter&amp;utm_medium=email&amp;utm_campaign=demo-launch&amp;utm_content=hero-button#compare\n</code></pre><button class=\"copy-code-btn\" data-copy=\"https://example.com/pricing?plan=pro&amp;utm_source=newsletter&amp;utm_medium=email&amp;utm_campaign=demo-launch&amp;utm_content=hero-button#compare\" aria-label=\"Copy example\">Copy</button></div>\n<p>The <code>plan=pro</code> parameter and <code>#compare</code> fragment remain. Do not erase unrelated query parameters simply because the URL contains a tracking conflict.</p>\n<p>For exact, consistently spelled keys, JavaScript&#39;s <code>set()</code> replaces the value and removes other occurrences of that key:</p>\n<div class=\"code-block-wrap\"><pre><code class=\"language-javascript\">const url = new URL(\n  &#39;https://example.com/pricing?plan=pro&amp;utm_source=newsletter&amp;utm_source=facebook&amp;utm_medium=email&amp;utm_campaign=demo-launch#compare&#39;\n);\n\nconst approved = {\n  utm_source: &#39;newsletter&#39;,\n  utm_medium: &#39;email&#39;,\n  utm_campaign: &#39;demo-launch&#39;,\n  utm_content: &#39;hero-button&#39;\n};\n\nfor (const [key, value] of Object.entries(approved)) {\n  url.searchParams.set(key, value);\n}\n\nconsole.log(url.href);\n</code></pre><button class=\"copy-code-btn\" data-copy=\"const url = new URL(\n  'https://example.com/pricing?plan=pro&amp;utm_source=newsletter&amp;utm_source=facebook&amp;utm_medium=email&amp;utm_campaign=demo-launch#compare'\n);\n\nconst approved = {\n  utm_source: 'newsletter',\n  utm_medium: 'email',\n  utm_campaign: 'demo-launch',\n  utm_content: 'hero-button'\n};\n\nfor (const [key, value] of Object.entries(approved)) {\n  url.searchParams.set(key, value);\n}\n\nconsole.log(url.href);\" aria-label=\"Copy example\">Copy</button></div>\n<p>This cleans the keys explicitly listed in <code>approved</code>. It is not a general deletion of every tracking parameter. <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/set\">set() documentation</a></p>\n<p>If you rebuild with <a href=\"https://utmcraft.com/\">UTMCraft</a>, review the option to strip existing UTMs before entering the approved values. Inspect the generated URL afterwards. Removing old UTM fields may also remove optional campaign information you intended to keep, so re-enter those deliberately.</p>\n<h2 id=\"fix-the-origin-of-the-problem\">Fix the origin of the problem</h2>\n<p>A corrected link is temporary if an email platform, ad setting or redirect adds the conflicting tags again. Assign one owner to each tracking field and document where those values are applied.</p>\n<p>For example, if the email platform owns newsletter tagging, decide whether the pasted destination should be untagged. If the marketing team supplies complete tagged links, check the platform&#39;s automatic-tagging configuration instead. Validate this using the actual platform rather than assuming all services behave the same way.</p>\n<h2 id=\"verify-the-complete-journey\">Verify the complete journey</h2>\n<ol>\n<li>Inspect the rebuilt URL: one occurrence of each intended tracking key.</li>\n<li>Confirm required non-UTM query values and the destination fragment still work.</li>\n<li>Follow the authorised test journey and record any redirects.</li>\n<li>Inspect the final landing URL before collection.</li>\n<li>Check the page location received by the analytics tag and any campaign fields stored by your form or CRM.</li>\n<li>Review the relevant GA4 dimensions after processing.</li>\n</ol>\n<p>UTM values map to manual campaign dimensions in GA4. A clean URL does not prove that the tag ran, consent allowed collection, or the selected report has the right scope. <a href=\"https://support.google.com/analytics/answer/11242870\">GA4 traffic-source dimensions</a></p>\n<p>Use the <a href=\"https://utmcraft.com/utm-checker/\">UTM checker</a> for the checks it explicitly reports, and follow the <a href=\"https://utmcraft.com/how-to-test-utms/\">UTM testing guide</a> for measurement QA. Do not rely on a single extracted value or quality score as proof that duplicates are absent.</p>\n<h2 id=\"frequently-asked-questions\">Frequently asked questions</h2>\n<p><strong>Will GA4 always take the first duplicate value?</strong></p>\n<p>This guide does not make that claim. Browser API behaviour is not evidence of every analytics implementation&#39;s handling. Remove the ambiguity before launch.</p>\n<p><strong>Can I fix historical reporting by changing the URL today?</strong></p>\n<p>Changing a link controls future visits. It does not rewrite the campaign values already collected in GA4.</p>\n<p><strong>Should I delete click identifiers while cleaning UTMs?</strong></p>\n<p>No. Review click identifiers and non-UTM parameters separately with the system that requires them. Duplicate UTM repair is not a reason to remove other attribution information.</p>\n",
    "preserveFeaturedImage": true,
    "featuredImageMetadata": {
      "width": 1200,
      "height": 630,
      "type": "image/webp"
    }
  },
  {
    "slug": "how-to-find-utm-content-and-utm-term-in-ga4",
    "title": "How to Find utm_content and utm_term in GA4 Reports",
    "seoTitle": "Find utm_content and utm_term in GA4 | UTMCraft",
    "description": "Find UTM content and term values using GA4 manual dimensions. Follow a session-scoped report example and troubleshoot missing campaign values.",
    "category": "utm-parameters",
    "isPillar": false,
    "author": {
      "name": "Dinesh Jeengar",
      "role": "Founder, UTMCraft",
      "url": "https://utmcraft.com/about/"
    },
    "datePublished": "2026-10-03",
    "dateModified": "2026-10-03",
    "reviewedDate": "October 3, 2026",
    "readingTime": "6 min read",
    "primaryKeyword": "utm content ga4",
    "secondaryKeywords": [],
    "semanticKeywords": [],
    "relatedEntities": [
      "Google Analytics 4",
      "UTM parameters"
    ],
    "searchIntent": "Practical implementation guide",
    "featuredImage": "/blog/images/how-to-find-utm-content-and-utm-term-in-ga4.webp",
    "featuredImageAlt": "Illustration of locating UTM content and term values in GA4",
    "featuredImageCaption": "Illustrative banner, not an actual GA4 report. In GA4, use the manual campaign dimension names described below; displayed figures are examples.",
    "tableOfContents": [
      {
        "id": "match-the-url-parameter-to-the-correct-dimension",
        "title": "Match the URL parameter to the correct dimension",
        "level": 2
      },
      {
        "id": "use-a-tagged-link-that-answers-a-specific-question",
        "title": "Use a tagged link that answers a specific question",
        "level": 2
      },
      {
        "id": "method-1-look-in-the-traffic-acquisition-report",
        "title": "Method 1: Look in the Traffic acquisition report",
        "level": 2
      },
      {
        "id": "method-2-build-a-session-level-free-form-exploration",
        "title": "Method 2: Build a session-level free-form exploration",
        "level": 2
      },
      {
        "id": "interpret-the-result-without-claiming-more-than-it-measures",
        "title": "Interpret the result without claiming more than it measures",
        "level": 2
      },
      {
        "id": "why-the-values-might-be-missing",
        "title": "Why the values might be missing",
        "level": 2
      },
      {
        "id": "do-these-parameters-require-custom-dimensions",
        "title": "Do these parameters require custom dimensions?",
        "level": 2
      },
      {
        "id": "a-short-verification-checklist",
        "title": "A short verification checklist",
        "level": 2
      }
    ],
    "toolCta": {
      "title": "Build a tagged campaign link",
      "description": "Prepare or review the URL, then verify the relevant platform settings and measurement separately.",
      "link": "/",
      "buttonText": "Open tool"
    },
    "relatedSlugs": [
      "ga4-utm-parameters-guide",
      "how-to-test-utms",
      "ga4-utms-not-showing"
    ],
    "references": [
      {
        "title": "GA4 dimension reference",
        "url": "https://support.google.com/analytics/table/13948007",
        "publisher": "Google Help"
      },
      {
        "title": "Traffic-source scopes",
        "url": "https://support.google.com/analytics/answer/11080067",
        "publisher": "Google Help"
      },
      {
        "title": "Google's guidance on personal information",
        "url": "https://support.google.com/analytics/answer/6366371",
        "publisher": "Google Help"
      },
      {
        "title": "Traffic acquisition report",
        "url": "https://support.google.com/analytics/answer/12923437",
        "publisher": "Google Help"
      },
      {
        "title": "Explorations overview",
        "url": "https://support.google.com/analytics/answer/7579450",
        "publisher": "Google Help"
      },
      {
        "title": "Data retention",
        "url": "https://support.google.com/analytics/answer/7667196",
        "publisher": "Google Help"
      },
      {
        "title": "GA4 data freshness",
        "url": "https://support.google.com/analytics/answer/12233314",
        "publisher": "Google Help"
      },
      {
        "title": "Built-in campaign mappings",
        "url": "https://support.google.com/analytics/answer/11242870",
        "publisher": "Google Help"
      }
    ],
    "contentHtml": "<p>In GA4, <code>utm_content</code> and <code>utm_term</code> appear under manual campaign dimension names rather than columns literally named after the URL parameters. For session analysis, look for <strong>Session manual ad content</strong> and <strong>Session manual term</strong>.</p>\n<p>Use these dimensions to answer questions such as which newsletter link generated sessions or which manually tagged variation sent engaged visits. They do not automatically tell you which creative caused a sale, and <code>utm_term</code> is not automatically a visitor&#39;s search query.</p>\n<h2 id=\"match-the-url-parameter-to-the-correct-dimension\">Match the URL parameter to the correct dimension</h2>\n<div class=\"editorial-table-wrap\"><table class=\"editorial-table\">\n<thead>\n<tr>\n<th>URL parameter</th>\n<th>Session question</th>\n<th>First-user question</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><code>utm_content</code></td>\n<td>Session manual ad content</td>\n<td>First user manual ad content</td>\n</tr>\n<tr>\n<td><code>utm_term</code></td>\n<td>Session manual term</td>\n<td>First user manual term</td>\n</tr>\n</tbody></table></div>\n<p>Session dimensions describe the campaign information associated with a session. First-user dimensions describe the original acquisition information associated with a user. Google also documents event-scoped manual dimensions, so choose the scope that matches your question. <a href=\"https://support.google.com/analytics/table/13948007\">GA4 dimension reference</a>, <a href=\"https://support.google.com/analytics/answer/11080067\">traffic-source scopes</a></p>\n<p>For comparing links in a recent send, start with session dimensions. For understanding which tagged variation originally acquired users, consider first-user dimensions. Do not switch between those scopes without changing your interpretation.</p>\n<h2 id=\"use-a-tagged-link-that-answers-a-specific-question\">Use a tagged link that answers a specific question</h2>\n<p>Here is an illustrative newsletter link:</p>\n<div class=\"code-block-wrap\"><pre><code class=\"language-text\">https://example.com/demo?utm_source=newsletter&amp;utm_medium=email&amp;utm_campaign=demo-launch&amp;utm_content=hero-button\n</code></pre><button class=\"copy-code-btn\" data-copy=\"https://example.com/demo?utm_source=newsletter&amp;utm_medium=email&amp;utm_campaign=demo-launch&amp;utm_content=hero-button\" aria-label=\"Copy example\">Copy</button></div>\n<p>And a second link from the same newsletter:</p>\n<div class=\"code-block-wrap\"><pre><code class=\"language-text\">https://example.com/demo?utm_source=newsletter&amp;utm_medium=email&amp;utm_campaign=demo-launch&amp;utm_content=text-link\n</code></pre><button class=\"copy-code-btn\" data-copy=\"https://example.com/demo?utm_source=newsletter&amp;utm_medium=email&amp;utm_campaign=demo-launch&amp;utm_content=text-link\" aria-label=\"Copy example\">Copy</button></div>\n<p>Source, medium and campaign stay consistent. Only content changes, allowing a session-level comparison between the two tagged links. These links are examples, not evidence of a real newsletter result or a controlled experiment.</p>\n<p>If you have a legitimate use for <code>utm_term</code>, supply a consistent value and document its meaning. Avoid stuffing unrelated labels into the field merely to populate a report. Do not include names, email addresses or other personal information in campaign values. <a href=\"https://support.google.com/analytics/answer/6366371\">Google&#39;s guidance on personal information</a></p>\n<h2 id=\"method-1-look-in-the-traffic-acquisition-report\">Method 1: Look in the Traffic acquisition report</h2>\n<p>Open <strong>Reports</strong> and find <strong>Traffic acquisition</strong>. Navigation varies with the collections published in your property; the report name is more reliable than assuming every property has the same menu path.</p>\n<p>Choose a campaign-related primary dimension, then use the <strong>+</strong> control to look for <strong>Session manual ad content</strong> or <strong>Session manual term</strong> as a secondary dimension. Search for the exact dimension name. If it is unavailable in that report&#39;s configuration, use an exploration instead. <a href=\"https://support.google.com/analytics/answer/12923437\">Traffic acquisition report</a></p>\n<p>Filter or narrow the report to the campaign you are investigating. Comparing <code>hero-button</code> across every campaign would mix different sends and destinations. Keep the campaign and date context visible.</p>\n<h2 id=\"method-2-build-a-session-level-free-form-exploration\">Method 2: Build a session-level free-form exploration</h2>\n<p>An exploration gives you more control over the dimensions in the table. Open <strong>Explore</strong> and create a <strong>Free form</strong> exploration. Import the dimensions and metrics you need into Variables, then add them to the table settings. <a href=\"https://support.google.com/analytics/answer/7579450\">Explorations overview</a></p>\n<p>For the newsletter example, use this recipe:</p>\n<div class=\"editorial-table-wrap\"><table class=\"editorial-table\">\n<thead>\n<tr>\n<th>Setting</th>\n<th>Selection</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Date range</td>\n<td>The period containing the send and subsequent visits</td>\n</tr>\n<tr>\n<td>Dimensions</td>\n<td>Session manual campaign name; Session manual ad content; Session manual term</td>\n</tr>\n<tr>\n<td>Metrics</td>\n<td>Sessions; Engaged sessions</td>\n</tr>\n<tr>\n<td>Rows</td>\n<td>Session manual campaign name; Session manual ad content</td>\n</tr>\n<tr>\n<td>Values</td>\n<td>Sessions; Engaged sessions</td>\n</tr>\n<tr>\n<td>Filter</td>\n<td>Session manual campaign name exactly matches <code>demo-launch</code></td>\n</tr>\n</tbody></table></div>\n<p>You can make a second table using <strong>Session manual term</strong> in Rows if your links intentionally supplied that parameter. Prefer a small table that answers one question over adding every available acquisition dimension.</p>\n<p>If the interface rejects a dimension/metric combination, remove the incompatible selection rather than silently substituting a different scope. Explorations also depend on the data available under your property&#39;s retention settings. <a href=\"https://support.google.com/analytics/answer/7667196\">Data retention</a></p>\n<h2 id=\"interpret-the-result-without-claiming-more-than-it-measures\">Interpret the result without claiming more than it measures</h2>\n<p>Suppose the table shows sessions for <code>hero-button</code> and <code>text-link</code>. That establishes recorded session traffic associated with those content values in the selected report. It does not mean you have counted every link click or isolated the button&#39;s causal effect.</p>\n<p>A person may click more than once, arrive during an existing session, decline consent, or leave before collection. Your email platform and GA4 measure different parts of the journey. Use the email platform for its recorded clicks and GA4 for the website behaviour it actually collected.</p>\n<p>For a session-based comparison, inspect both sessions and engaged sessions. If you add business outcomes, define the selected key event and examine the relevant scope and attribution before making a “winning creative” claim.</p>\n<h2 id=\"why-the-values-might-be-missing\">Why the values might be missing</h2>\n<h3 id=\"the-link-never-supplied-the-parameter\">The link never supplied the parameter</h3>\n<p>If a URL contains source, medium and campaign but no <code>utm_content</code>, there is no content label in that link to collect. Check the exact distributed URL, not only the planning spreadsheet.</p>\n<h3 id=\"the-value-disappears-before-the-tag-sees-the-page\">The value disappears before the tag sees the page</h3>\n<p>Follow the actual redirect journey and inspect the final landing URL. Then check the page location received by your analytics implementation. A URL in the browser address bar is useful evidence, but it is not proof of the value sent by every tag configuration.</p>\n<h3 id=\"you-selected-a-different-scope\">You selected a different scope</h3>\n<p>A first-user content value can describe an earlier acquisition visit. It is not the same question as the content associated with the current session. Use a separate fresh-session test for each illustrative link when checking session attribution. <a href=\"https://support.google.com/analytics/answer/11080067\">Traffic-source scopes</a></p>\n<h3 id=\"collection-or-processing-has-not-completed\">Collection or processing has not completed</h3>\n<p>Confirm the tag runs under the applicable consent state. Allow for report processing rather than expecting an exact number of seconds. Standard reports and explorations do not all update at the same moment. <a href=\"https://support.google.com/analytics/answer/12233314\">GA4 data freshness</a></p>\n<h3 id=\"you-expected-an-advertising-dimension-to-show-a-manual-tag\">You expected an advertising dimension to show a manual tag</h3>\n<p>Manual values and Google Ads dimensions serve different purposes. With auto-tagging, campaign classification can use advertising information, while supported manual content and term fields remain separate dimensions. Check the field you selected before assuming the UTM value was overwritten. <a href=\"https://support.google.com/analytics/answer/11242870\">Manual tagging and auto-tagging</a></p>\n<h2 id=\"do-these-parameters-require-custom-dimensions\">Do these parameters require custom dimensions?</h2>\n<p>GA4 has built-in manual dimensions for these standard UTM parameters. You do not need to create a custom dimension simply to read <code>utm_content</code> as manual ad content or <code>utm_term</code> as manual term. Additional query parameters you invent are a separate collection and reporting decision. <a href=\"https://support.google.com/analytics/answer/11242870\">Built-in campaign mappings</a></p>\n<h2 id=\"a-short-verification-checklist\">A short verification checklist</h2>\n<ol>\n<li>Build a URL with one clear content value and the required campaign context.</li>\n<li>Inspect the complete landing journey for lost or repeated keys.</li>\n<li>Confirm collection under the test consent state.</li>\n<li>Use session dimensions for a session-based question.</li>\n<li>Select the right date range and campaign filter.</li>\n<li>Wait for processed data, then compare the report with the collected evidence.</li>\n</ol>\n<p>Build the example with the <a href=\"https://utmcraft.com/\">UTM builder</a>, verify collection with the <a href=\"https://utmcraft.com/how-to-test-utms/\">UTM testing guide</a>, and use the <a href=\"https://utmcraft.com/ga4-utm-parameters-guide/\">GA4 parameters guide</a> for the broader dimension reference.</p>\n",
    "preserveFeaturedImage": true,
    "featuredImageMetadata": {
      "width": 1200,
      "height": 630,
      "type": "image/webp"
    }
  }
];
