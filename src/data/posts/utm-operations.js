export const utmOperationsPosts = [
  {
    slug: 'utm-operations-workflow',
    title: 'UTM Operations: How to Build a Reliable Campaign Tracking Workflow',
    seoTitle: 'UTM Operations: Scalable Campaign Tracking Workflow | UTMCraft',
    description: 'Learn how to operationalize UTM tracking across marketing, RevOps, and engineering. Build automated generation, hidden form capture, and CRM attribution pipelines.',
    category: 'utm-operations',
    isPillar: true,
    author: {
      name: 'Dinesh Jeengar',
      role: 'Founder, UTMCraft',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-02-17',
    dateModified: '2026-10-01',
    reviewedDate: 'September 23, 2026',
    readingTime: '13 min read',
    primaryKeyword: 'utm operations workflow',
    secondaryKeywords: ['campaign tracking operations', 'marketing operations utm', 'revops utm tracking', 'crm attribution pipeline'],
    semanticKeywords: ['first-touch last-touch capture', 'hidden form fields javascript', 'cookie storage vs localstorage', 'automated utm pipeline'],
    relatedEntities: ['Marketing Operations', 'RevOps', 'HubSpot', 'Salesforce', 'Google Analytics 4'],
    searchIntent: 'Operational Architecture Pillar Guide',
    featuredImage: '/blog/images/utm-operations-workflow.webp',
    featuredImageAlt: 'Full-stack operational flow showing campaign link creation, browser storage, hidden form field capture, and CRM ingestion',
    tableOfContents: [
      { id: 'the-lifecycle-of-attribution-data', title: 'The End-to-End Lifecycle of Attribution Data', level: 2 },
      { id: 'browser-capture-cookies-vs-localstorage', title: 'Browser Capture: Cookies vs localStorage vs sessionStorage', level: 2 },
      { id: 'first-touch-vs-last-touch-architecture', title: 'First-Touch vs Last-Touch: Storing Both in Your CRM', level: 2 },
      { id: 'hidden-form-fields-implementation', title: 'Hidden Form Fields Implementation (Pure JavaScript)', level: 2 },
      { id: 'crm-sync-hubspot-salesforce', title: 'Syncing Parameters into HubSpot, Salesforce, and Zoho', level: 2 },
      { id: 'automating-workflows-zapier-make', title: 'Automating Campaign Link Generation with Zapier & APIs', level: 2 },
      { id: 'faq', title: 'Frequently Asked Questions', level: 2 }
    ],
    toolCta: {
      title: 'Streamline Your Link Generation',
      description: 'Create campaign links in bulk from shared naming conventions, then review the exported URLs before launch.',
      link: '/bulk-utm-builder/',
      buttonText: 'Open Bulk Matrix Generator'
    },
    relatedSlugs: ['bulk-utm-workflow', 'first-touch-vs-last-touch-utm', 'storing-utm-parameters-in-crm', 'utm-strategy-guide'],
    references: [
      { title: 'Create HubSpot tracking URLs', url: 'https://knowledge.hubspot.com/settings/how-do-i-create-a-tracking-url', publisher: 'HubSpot Knowledge Base' },
      { title: 'Web Storage API Specification', url: 'https://html.spec.whatwg.org/multipage/webstorage.html', publisher: 'WHATWG' }
    ],
    contentHtml: `
      <p class="lead-text">A tracking workflow needs to cover more than link creation. Decide how your team names campaigns, checks URLs, stores campaign data and passes it into forms and the CRM. This guide shows how those steps fit together.</p>

      <h2 id="the-lifecycle-of-attribution-data">The End-to-End Lifecycle of Attribution Data</h2>
      <p>A resilient tracking pipeline moves through four sequential stages:</p>
      <ol>
        <li><strong>Link Creation:</strong> Build tagged URLs from the agreed naming rules.</li>
        <li><strong>Client-Side Persistence:</strong> Capturing incoming query parameters on the landing page and storing them in client cookies or <code>localStorage</code>.</li>
        <li><strong>Form Injection:</strong> Dynamically populating hidden form inputs when the visitor converts on a demo or signup form.</li>
        <li><strong>CRM Ingestion &amp; Revenue Attribution:</strong> Storing first-touch and last-touch parameters on Contact, Lead, and Deal records in Salesforce, HubSpot, or custom databases.</li>
      </ol>

      <h2 id="browser-capture-cookies-vs-localstorage">Browser Capture: Cookies vs localStorage vs sessionStorage</h2>
      <p>When a prospect lands on <code>example.com/?utm_source=linkedin&amp;utm_campaign=q4_demo</code>, they may browse several pages before submitting a form. If your form needs campaign values in the CRM, capture and persist the relevant values using a tested implementation; otherwise, the form record may not contain that context. GA4 session attribution follows its own collection and processing rules.</p>

      <div class="editorial-table-wrap">
        <table class="editorial-table">
          <thead>
            <tr>
              <th>Storage Mechanism</th>
              <th>Lifespan</th>
              <th>Subdomain Sharing</th>
              <th>ITP Resistance</th>
              <th>Verdict</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>First-Party Cookie</strong></td>
              <td>Custom (1 to 365 days)</td>
              <td>Yes (across all <code>.example.com</code>)</td>
              <td>Capped at 1-7 days in Safari</td>
              <td><strong>Recommended for Subdomain Support</strong></td>
            </tr>
            <tr>
              <td><strong>localStorage</strong></td>
              <td>Persistent until cache cleared</td>
              <td>No (isolated per origin)</td>
              <td>Capped at 7 days in Safari</td>
              <td><strong>Recommended for Single-Domain Apps</strong></td>
            </tr>
            <tr>
              <td><strong>sessionStorage</strong></td>
              <td>Dies when tab is closed</td>
              <td>No</td>
              <td>Full duration of tab</td>
              <td>Too fragile for multi-tab browsing</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="first-touch-vs-last-touch-architecture">First-Touch vs Last-Touch: Storing Both in Your CRM</h2>
      <p>Do not force your organization into an ideological debate between first-touch and last-touch attribution. <strong>Store both simultaneously.</strong></p>
      <ul>
        <li><strong>First Touch (Creation Source):</strong> Answers <em>"Which campaign introduced this prospect to our brand?"</em> Set these fields once when the contact is created and never overwrite them.</li>
        <li><strong>Last Touch (Conversion Source):</strong> Answers <em>"Which campaign prompted this prospect to request a demo or buy today?"</em> Overwrite these fields on every subsequent form conversion.</li>
      </ul>

      <h2 id="hidden-form-fields-implementation">Hidden Form Fields Implementation (Pure JavaScript)</h2>
      <p>This JavaScript example reads UTM values from the URL, saves them in cookies and fills hidden form fields. Adapt the field names and storage settings to your forms, and test it before using it on a live site:</p>

      <div class="code-block-wrap">
        <pre><code class="language-javascript">// Capture and persist UTM parameters across session
(function() {
  const params = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'gclid'];
  const urlParams = new URLSearchParams(window.location.search);

  // 1. Save incoming parameters to cookies (valid for 30 days)
  params.forEach(param =&gt; {
    const val = urlParams.get(param);
    if (val) {
      document.cookie = \`\${param}=\${encodeURIComponent(val)}; max-age=2592000; path=/; domain=.\${location.hostname.replace(/^www\\./, '')}; SameSite=Lax\`;
    }
  });

  // 2. Helper to read cookies
  function getCookie(name) {
    const value = \`; \${document.cookie}\`;
    const parts = value.split(\`; \${name}=\`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
    return null;
  }

  // 3. Inject into hidden form fields upon DOM ready
  document.addEventListener('DOMContentLoaded', () =&gt; {
    params.forEach(param =&gt; {
      const storedVal = getCookie(param);
      if (storedVal) {
        document.querySelectorAll(\`input[name="\${param}"], input[data-field="\${param}"]\`).forEach(input =&gt; {
          input.value = storedVal;
        });
      }
    });
  });
})();</code></pre>
        <button class="copy-code-btn" data-copy="utm_capture_script" aria-label="Copy Tracking Script">Copy Script</button>
      </div>

      <h2 id="crm-sync-hubspot-salesforce">Syncing Parameters into HubSpot, Salesforce, and Zoho</h2>
      <p>Create dedicated custom properties on your CRM Contact and Deal objects:</p>
      <ul>
        <li><code>First Touch Source</code>, <code>First Touch Medium</code>, <code>First Touch Campaign</code></li>
        <li><code>Last Touch Source</code>, <code>Last Touch Medium</code>, <code>Last Touch Campaign</code></li>
        <li><code>GCLID</code> (Google Click Identifier for offline conversion upload)</li>
      </ul>
      <p>Map your web form fields directly to these CRM properties. When an opportunity is created, copy these properties from the Contact to the Deal record to empower revenue reporting.</p>

      <h2 id="automating-workflows-zapier-make">Automating Campaign Link Generation with Zapier & APIs</h2>
      <p>For organizations running hundreds of campaigns weekly, manual link building creates a bottleneck. Integrate <a href="/bulk-utm-builder/">UTMCraft Bulk Generator</a> or automated webhook scripts into your marketing project management tools (Asana, Monday.com, Jira). When a campaign brief reaches "Approved" status, auto-generate tagged links programmatically.</p>

      <section class="article-faq-section">
        <h2 id="faq">Frequently Asked Questions</h2>
        <div class="faq-item">
          <h3>How do hidden form fields capture UTM parameters into CRM systems?</h3>
          <p>When a visitor lands on your site with UTM parameters, a lightweight JavaScript snippet extracts the values from <code>window.location.search</code> and saves them to <code>localStorage</code> or first-party cookies. When the visitor navigates to a demo or contact form, the script injects those stored values into invisible <code>&lt;input type="hidden"&gt;</code> fields, which submit directly to your CRM.</p>
        </div>
        <div class="faq-item">
          <h3>Should a CRM store first-touch or last-touch UTM parameters?</h3>
          <p>Capture <strong>both</strong> if your reporting needs them. Keep the first-touch fields unchanged after capture, and define when to update last-touch fields. Test how the forms handle a later visit without campaign tags.</p>
        </div>
        <div class="faq-item">
          <h3>Why use first-party cookies or localStorage instead of sessionStorage for UTMs?</h3>
          <p><code>sessionStorage</code> is wiped as soon as the visitor closes their browser tab. In B2B and high-consideration purchases, prospects frequently research across multiple days before submitting a form. First-party cookies or <code>localStorage</code> preserve attribution data across return visits.</p>
        </div>
        <div class="faq-item">
          <h3>How can I QA a high volume of UTM links before launching?</h3>
          <p>Use the <a href="/utm-checker/">UTMCraft UTM Checker</a> to review URL syntax, selected parameter presence, naming consistency, spaces, and a limited set of source/medium patterns. It does not reproduce all GA4 channel definitions, test live redirects, or guarantee live channel assignment.</p>
        </div>
      </section>
    `
  },
  {
    slug: 'bulk-utm-workflow',
    title: 'Bulk UTM Creation Workflow: Generating Hundreds of Tagged Links Without Errors',
    seoTitle: 'Bulk UTM Creation Workflow: High-Volume Link Building | UTMCraft',
    description: 'Create UTM links for several channels in one batch. Use shared campaign names, review the generated URLs and export them for your team.',
    category: 'utm-operations',
    isPillar: false,
    author: {
      name: 'Dinesh Jeengar',
      role: 'Founder, UTMCraft',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-03-06',
    dateModified: '2026-10-01',
    reviewedDate: 'September 23, 2026',
    readingTime: '8 min read',
    primaryKeyword: 'bulk utm creation workflow',
    secondaryKeywords: ['bulk utm builder', 'generate multiple utm links', 'campaign url matrix spreadsheet', 'bulk tracking url generator'],
    semanticKeywords: ['batch url matrix', 'csv export utm', 'multi-channel campaign creation', 'taxonomy formula automation'],
    relatedEntities: ['Marketing Operations', 'UTM Generator', 'Bulk Campaign Management', 'Data Governance'],
    searchIntent: 'How-to & High-Volume Operations Guide',
    featuredImage: '/blog/images/bulk-utm-workflow.webp',
    featuredImageAlt: 'Workflow graphic depicting a bulk campaign URL matrix generating hundreds of tagged URLs for multi-channel distribution',
    tableOfContents: [
      { id: 'the-problem-with-spreadsheets', title: 'Why Campaign Spreadsheets Create Tracking Debt', level: 2 },
      { id: 'the-matrix-approach', title: 'The Matrix Approach: Landing Pages x Channels x Offers', level: 2 },
      { id: 'step-by-step-bulk-generation', title: 'Step-by-Step Bulk Link Generation in UTMCraft', level: 2 },
      { id: 'export-and-distribution', title: 'Exporting to CSV, TSV, and Ad Automation Tools', level: 2 }
    ],
    toolCta: {
      title: 'Generate Your Bulk Link Matrix',
      description: 'Create cross-channel tracking URLs in bulk, then review the output before using or exporting it.',
      link: '/bulk-utm-builder/',
      buttonText: 'Try Bulk UTM Builder'
    },
    relatedSlugs: ['utm-operations-workflow', 'utm-strategy-guide', 'utm-qa-checklist'],
    references: [
      { title: 'GA4 URL builders: Collect campaign data with custom URLs', url: 'https://support.google.com/analytics/answer/10917952', publisher: 'Google Analytics Help' }
    ],
    contentHtml: `
      <p class="lead-text">A campaign running across several channels can need dozens of tracking links. Build them in a batch using shared source, medium and campaign values, then check the output before handing it to media buyers. This guide covers that workflow.</p>

      <h2 id="the-problem-with-spreadsheets">Why Campaign Spreadsheets Create Tracking Debt</h2>
      <p>A shared spreadsheet can work well, but overwritten formulas, trailing spaces and duplicate parameters are easy to miss. Review the generated links before they go into ads, especially when several people edit the sheet.</p>

      <h2 id="the-matrix-approach">The Matrix Approach: Landing Pages x Channels x Offers</h2>
      <p>List your <strong>destination URLs</strong> and <strong>channels</strong> first. Five product pages across four channels produce 20 links. Generate the combinations with shared campaign values, then check the source and medium in each row.</p>

      <h2 id="step-by-step-bulk-generation">Step-by-Step Bulk Link Generation in UTMCraft</h2>
      <ol>
        <li>Navigate to the <a href="/bulk-utm-builder/">UTMCraft Bulk UTM Matrix Generator</a>.</li>
        <li>Paste your list of destination landing page URLs (one per line).</li>
        <li>Enter your standardized <code>utm_campaign</code> value (e.g. <code>us_saas_trial_2026q2</code>).</li>
        <li>Select your active marketing channels from the preset checklist (Google Ads, Meta Ads, LinkedIn, Email, Affiliate).</li>
        <li>UTMCraft generates a matrix using preset source and medium values. Formatting options can apply lowercase and replace spaces with hyphens; review the resulting URLs before launch.</li>
      </ol>

      <h2 id="export-and-distribution">Exporting to CSV, TSV, and Ad Automation Tools</h2>
      <p>Once generated, export your batch matrix to CSV or TSV. Distribute channel-specific URL slices directly to media buyers or upload them into Google Ads Editor and Meta Ads Manager in bulk.</p>
    `
  },
  {
    slug: 'first-touch-vs-last-touch-utm',
    title: 'First-Touch vs Last-Touch UTM Attribution: Capture Models, Cookies & CRM Sync',
    seoTitle: 'First-Touch vs Last-Touch UTM Attribution | UTMCraft',
    description: 'Compare first-touch and last-touch UTM tracking. Define when to save and update campaign values in browser storage, forms and your CRM.',
    category: 'utm-operations',
    isPillar: false,
    author: {
      name: 'Dinesh Jeengar',
      role: 'Founder, UTMCraft',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-03-09',
    dateModified: '2026-10-01',
    reviewedDate: 'September 23, 2026',
    readingTime: '9 min read',
    primaryKeyword: 'first-touch vs last-touch utm',
    secondaryKeywords: ['first touch utm attribution', 'last touch utm tracking', 'first touch vs last touch ga4', 'crm attribution modeling'],
    semanticKeywords: ['first user source medium', 'session source medium ga4', 'multi-touch attribution pipeline', 'lead creation source'],
    relatedEntities: ['Attribution Modeling', 'Google Analytics 4', 'Customer Journey', 'CRM Architecture'],
    searchIntent: 'Technical Comparison & Architecture Guide',
    featuredImage: '/blog/images/first-touch-vs-last-touch-utm.webp',
    featuredImageAlt: 'Customer journey timeline diagram contrasting first-touch discovery attribution with last-touch conversion attribution',
    tableOfContents: [
      { id: 'the-attribution-model-divide', title: 'The Multi-Touch Attribution Divide', level: 2 },
      { id: 'first-touch-scope-ga4-vs-crm', title: 'First-Touch in GA4 vs First-Touch in Your CRM', level: 2 },
      { id: 'last-touch-scope-ga4-vs-crm', title: 'Last-Touch in GA4 vs Last-Touch in Your CRM', level: 2 },
      { id: 'dual-capture-architecture', title: 'How to Implement Dual-Capture in Client-Side Storage', level: 2 },
      { id: 'executive-reporting-framework', title: 'How to Report Both Models to Leadership', level: 2 }
    ],
    toolCta: {
      title: 'Inspect Parameters for Both Touchpoints',
      description: 'Audit selected URL fields and parameter values for consistency before using links in first-touch and last-touch reporting.',
      link: '/utm-checker/',
      buttonText: 'Inspect Tracking Parameters'
    },
    relatedSlugs: ['storing-utm-parameters-in-crm', 'utm-operations-workflow', 'ga4-utm-parameters-guide'],
    references: [
      { title: 'Attribution Models in GA4', url: 'https://support.google.com/analytics/answer/10596866', publisher: 'Google Analytics Help' }
    ],
    contentHtml: `
      <p class="lead-text">First-touch tracking records how you first acquired a prospect. Last-touch tracking records a later interaction before a conversion. Keeping both can help you understand a longer sales journey, provided you define when each field is saved and updated.</p>

      <h2 id="the-attribution-model-divide">The Multi-Touch Attribution Divide</h2>
      <p>Consider a typical B2B buyer journey:</p>
      <ul>
        <li><strong>Day 1:</strong> Prospect clicks a LinkedIn Sponsored Post (<code>utm_source=linkedin&amp;utm_campaign=brand-awareness</code>) and reads a blog post. No form submission.</li>
        <li><strong>Day 14:</strong> Prospect Googles your brand, clicks an organic search result, and downloads a whitepaper.</li>
        <li><strong>Day 30:</strong> Prospect clicks a retargeting ad on Google Display (<code>utm_source=google&amp;utm_medium=cpc&amp;utm_campaign=retargeting-demo</code>) and requests a demo.</li>
      </ul>
      <p>A last-touch view may give most or all recorded credit to Google Search even when LinkedIn helped introduce the prospect. A first-touch view answers a different question and may not show which later interaction influenced the decision. Compare attribution models and CRM touchpoints when evaluating the journey.</p>

      <h2 id="first-touch-scope-ga4-vs-crm">First-Touch in GA4 vs First-Touch in Your CRM</h2>
      <ul>
        <li><strong>In GA4:</strong> Represented by <em>First user source / medium</em> and <em>First user campaign</em>. Stored in client-side cookies linked to the <code>client_id</code>.</li>
        <li><strong>In CRM (HubSpot/Salesforce):</strong> Represented by <code>Original Source</code> or custom fields <code>First Touch Source</code>. Populated once upon lead creation and locked forever.</li>
      </ul>

      <h2 id="last-touch-scope-ga4-vs-crm">Last-Touch in GA4 vs Last-Touch in Your CRM</h2>
      <ul>
        <li><strong>In GA4:</strong> Represented by <em>Session source / medium</em> and <em>Session campaign</em>. Captures the specific touchpoint driving that individual session.</li>
        <li><strong>In CRM:</strong> Represented by <code>Last Touch Source</code>. Overwritten every time a known lead fills out a new form, attends a webinar, or converts on an offer.</li>
      </ul>

      <h2 id="dual-capture-architecture">How to Implement Dual-Capture in Client-Side Storage</h2>
      <p>On your landing pages, configure your tracking script to maintain two sets of cookies:</p>
      <div class="code-block-wrap">
        <pre><code class="language-javascript">// Pseudocode for Dual-Touch Storage
function storeTouchpoints(utmParams) {
  // If first-touch cookie does not exist, write it once
  if (!getCookie('ft_utm_source') &amp;&amp; utmParams.source) {
    setCookie('ft_utm_source', utmParams.source, 365); // 1-year expiry
    setCookie('ft_utm_campaign', utmParams.campaign, 365);
  }

  // Always overwrite last-touch cookie with fresh session data
  if (utmParams.source) {
    setCookie('lt_utm_source', utmParams.source, 30);
    setCookie('lt_utm_campaign', utmParams.campaign, 30);
  }
}</code></pre>
      </div>

      <h2 id="executive-reporting-framework">How to Report Both Models to Leadership</h2>
      <p>Present side-by-side pipeline contribution: credit top-of-funnel channels for <em>Pipeline Created</em> using first-touch data, and credit bottom-of-funnel channels for <em>Deals Closed</em> using last-touch data.</p>
    `
  },
  {
    slug: 'storing-utm-parameters-in-crm',
    title: 'How to Store UTM Parameters in CRM Hidden Fields (Salesforce, HubSpot & Forms)',
    seoTitle: 'Store UTMs in CRM Hidden Fields: Salesforce & HubSpot | UTMCraft',
    description: 'Complete guide on capturing UTM parameters in hidden form fields and syncing attribution into Salesforce, HubSpot, and Zoho CRM without losing data.',
    category: 'utm-operations',
    isPillar: false,
    author: {
      name: 'Dinesh Jeengar',
      role: 'Founder, UTMCraft',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-03-11',
    dateModified: '2026-10-01',
    reviewedDate: 'September 23, 2026',
    readingTime: '9 min read',
    primaryKeyword: 'storing utm parameters in crm',
    secondaryKeywords: ['capture utms in hidden form fields', 'hubspot utm hidden fields', 'salesforce utm tracking fields', 'pass utms to crm'],
    semanticKeywords: ['web to lead salesforce utm', 'hubspot hidden form properties', 'javascript cookie form population', 'lead source attribution'],
    relatedEntities: ['HubSpot CRM', 'Salesforce CRM', 'Marketing Automation', 'Hidden Form Fields'],
    searchIntent: 'Technical Implementation Guide',
    featuredImage: '/blog/images/storing-utm-parameters-in-crm.webp',
    featuredImageAlt: 'Technical diagram showing incoming UTM query parameters persisting in browser cookies and auto-populating CRM form fields',
    tableOfContents: [
      { id: 'why-web-forms-need-hidden-fields', title: 'Why Web Forms Need Hidden Attribution Fields', level: 2 },
      { id: 'crm-property-setup', title: 'Setting Up Custom Properties in HubSpot and Salesforce', level: 2 },
      { id: 'html-form-markup-structure', title: 'HTML Form Markup for Hidden Parameters', level: 2 },
      { id: 'javascript-population-script', title: 'The JavaScript Autofill Script (Handles Direct & Multi-Page Navigation)', level: 2 },
      { id: 'testing-and-validation', title: 'Testing Form Submission & CRM Ingestion', level: 2 }
    ],
    toolCta: {
      title: 'Generate Campaign Links for Lead Forms',
      description: 'Build UTM URLs that cleanly map to your CRM hidden form fields. Enforce consistent keys and lowercase values.',
      link: '/',
      buttonText: 'Open Campaign Builder'
    },
    relatedSlugs: ['first-touch-vs-last-touch-utm', 'utm-operations-workflow', 'utm-qa-checklist'],
    references: [
      { title: 'Set property values with hidden form fields', url: 'https://knowledge.hubspot.com/forms/pass-contact-property-values-with-hidden-form-fields', publisher: 'HubSpot Knowledge Base' }
    ],
    contentHtml: `
      <p class="lead-text">Add hidden fields to your lead forms if you need campaign information alongside contact details in your CRM. You will also need a way to keep those values as visitors move between pages. The examples below show how to capture, store and submit them.</p>

      <h2 id="why-web-forms-need-hidden-fields">Why Web Forms Need Hidden Attribution Fields</h2>
      <p>Google Analytics 4 tracks aggregate session counts, but it cannot legally tell your sales reps which specific marketing touchpoint convinced a specific company to request a demo. Capturing UTM parameters directly into your CRM Contact record connects individual ad clicks to pipeline value, deal size, and closed-won revenue.</p>

      <h2 id="crm-property-setup">Setting Up Custom Properties in HubSpot and Salesforce</h2>
      <p>Before modifying web forms, create matching custom contact fields in your CRM:</p>
      <ul>
        <li><code>utm_source</code> (Single-line text)</li>
        <li><code>utm_medium</code> (Single-line text)</li>
        <li><code>utm_campaign</code> (Single-line text)</li>
        <li><code>utm_content</code> (Single-line text)</li>
        <li><code>utm_term</code> (Single-line text)</li>
        <li><code>gclid</code> (Single-line text)</li>
      </ul>

      <h2 id="html-form-markup-structure">HTML Form Markup for Hidden Parameters</h2>
      <p>Add hidden inputs inside your HTML <code>&lt;form&gt;</code> element:</p>
      <div class="code-block-wrap">
        <pre><code class="language-html">&lt;form id="lead-form" action="/submit" method="POST"&gt;
  &lt;!-- Visible Form Fields --&gt;
  &lt;input type="text" name="first_name" placeholder="First Name" required&gt;
  &lt;input type="email" name="email" placeholder="Work Email" required&gt;

  &lt;!-- Hidden UTM Attribution Fields --&gt;
  &lt;input type="hidden" name="utm_source" id="utm_source"&gt;
  &lt;input type="hidden" name="utm_medium" id="utm_medium"&gt;
  &lt;input type="hidden" name="utm_campaign" id="utm_campaign"&gt;
  &lt;input type="hidden" name="utm_term" id="utm_term"&gt;
  &lt;input type="hidden" name="utm_content" id="utm_content"&gt;
  &lt;input type="hidden" name="gclid" id="gclid"&gt;

  &lt;button type="submit"&gt;Request Demo&lt;/button&gt;
&lt;/form&gt;</code></pre>
        <button class="copy-code-btn" data-copy="&lt;input type=&quot;hidden&quot; name=&quot;utm_source&quot; id=&quot;utm_source&quot;&gt;&#10;&lt;input type=&quot;hidden&quot; name=&quot;utm_medium&quot; id=&quot;utm_medium&quot;&gt;&#10;&lt;input type=&quot;hidden&quot; name=&quot;utm_campaign&quot; id=&quot;utm_campaign&quot;&gt;&#10;&lt;input type=&quot;hidden&quot; name=&quot;utm_term&quot; id=&quot;utm_term&quot;&gt;&#10;&lt;input type=&quot;hidden&quot; name=&quot;utm_content&quot; id=&quot;utm_content&quot;&gt;&#10;&lt;input type=&quot;hidden&quot; name=&quot;gclid&quot; id=&quot;gclid&quot;&gt;" aria-label="Copy Hidden Fields">Copy Hidden HTML</button>
      </div>

      <h2 id="javascript-population-script">The JavaScript Autofill Script (Handles Direct & Multi-Page Navigation)</h2>
      <p>Deploy this script on every page of your website to save query parameters into cookies on the first landing page, and inject them into hidden form inputs on any subsequent page:</p>

      <div class="code-block-wrap">
        <pre><code class="language-javascript">(function() {
  const fields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];
  const urlParams = new URLSearchParams(window.location.search);

  // 1. Read from URL and write to 30-day first-party cookie
  fields.forEach(f =&gt; {
    const val = urlParams.get(f);
    if (val) {
      document.cookie = f + '=' + encodeURIComponent(val) + '; max-age=2592000; path=/; SameSite=Lax';
    }
  });

  // 2. Read cookie helper
  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : '';
  }

  // 3. Inject into hidden inputs upon page load
  window.addEventListener('DOMContentLoaded', function() {
    fields.forEach(f =&gt; {
      const input = document.getElementById(f) || document.querySelector('input[name="' + f + '"]');
      if (input) {
        input.value = urlParams.get(f) || getCookie(f) || '';
      }
    });
  });
})();</code></pre>
        <button class="copy-code-btn" data-copy="(function(){const fields=['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid'];const urlParams=new URLSearchParams(window.location.search);fields.forEach(f=>{const val=urlParams.get(f);if(val){document.cookie=f+'='+encodeURIComponent(val)+'; max-age=2592000; path=/; SameSite=Lax';}});function getCookie(name){const match=document.cookie.match(new RegExp('(^| )'+name+'=([^;]+)'));return match?decodeURIComponent(match[2]):'';}window.addEventListener('DOMContentLoaded',function(){fields.forEach(f=>{const input=document.getElementById(f)||document.querySelector('input[name=&quot;'+f+'&quot;]');if(input){input.value=urlParams.get(f)||getCookie(f)||'';}});});})();" aria-label="Copy Autofill Script">Copy Autofill Script</button>
      </div>

      <h2 id="testing-and-validation">Testing Form Submission & CRM Ingestion</h2>
      <ol>
        <li>Open an Incognito browser window.</li>
        <li>Paste your test URL: <code>https://example.com/?utm_source=qa_test&amp;utm_medium=paid_social&amp;utm_campaign=demo_audit</code>.</li>
        <li>Click through to your contact or pricing form page.</li>
        <li>Right-click the form, click <strong>Inspect</strong>, and verify that the <code>&lt;input type="hidden"&gt;</code> elements contain the expected values in their <code>value</code> attributes.</li>
        <li>Submit a test lead and verify that the contact record inside HubSpot or Salesforce displays the parameters accurately.</li>
      </ol>
    `
  }
];
