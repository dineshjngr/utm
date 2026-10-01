export const googleAdsPosts = [
  {
    slug: 'google-ads-utm-guide',
    title: 'Google Ads UTM Tracking Guide: ValueTrack, Tracking Templates & GA4 Attribution',
    seoTitle: 'Google Ads UTM Tracking Guide: ValueTrack & Setup | UTMCraft',
    description: 'The complete technical guide to Google Ads UTM tracking. Configure account-level tracking templates, ValueTrack parameters, and GA4 auto-tagging without conflicts.',
    category: 'google-ads',
    isPillar: true,
    author: {
      name: 'Dinesh Jeengar',
      role: 'Founder, UTMCraft',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-02-01',
    dateModified: '2026-10-01',
    reviewedDate: 'September 23, 2026',
    readingTime: '13 min read',
    primaryKeyword: 'google ads utm tracking',
    secondaryKeywords: ['google ads tracking template', 'valuetrack parameters google ads', 'google ads utm parameters', 'final url suffix google ads'],
    semanticKeywords: ['auto-tagging gclid', 'google ads ga4 link', 'performance max utm', 'keyword matchtype tracking'],
    relatedEntities: ['Google Ads', 'ValueTrack', 'Google Analytics 4', 'GCLID', 'Performance Max'],
    searchIntent: 'Comprehensive Implementation Pillar Guide',
    featuredImage: '/blog/images/google-ads-utm-guide.webp',
    featuredImageAlt: 'Architectural diagram of Google Ads ValueTrack parameters populating UTM tracking templates across campaigns',
    tableOfContents: [
      { id: 'why-manual-utms-with-google-ads', title: 'Why You Still Need UTMs With Google Ads in 2026', level: 2 },
      { id: 'the-ideal-account-level-suffix', title: 'The Standard Account-Level Final URL Suffix', level: 2 },
      { id: 'essential-valuetrack-parameters', title: 'Essential ValueTrack Parameters Reference Table', level: 2 },
      { id: 'tracking-templates-vs-final-url-suffix', title: 'Tracking Templates vs Final URL Suffix: Which to Use?', level: 2 },
      { id: 'auto-tagging-ga4-reconciliation', title: 'Reconciling Auto-Tagging and Manual UTMs in GA4', level: 2 },
      { id: 'top-google-ads-tracking-mistakes', title: 'Google Ads Tracking Mistakes to Check', level: 2 },
      { id: 'faq', title: 'Frequently Asked Questions', level: 2 }
    ],
    toolCta: {
      title: 'Generate Google Ads Tracking Templates',
      description: 'Create Google Ads URL suffixes with common ValueTrack fields, then review the syntax and account setup before publishing.',
      link: '/utm-builder/google-ads/',
      buttonText: 'Open Google Ads UTM Builder'
    },
    relatedSlugs: ['google-ads-auto-tagging-vs-utms', 'gclid-vs-utms', 'google-ads-tracking-templates', 'ga4-utm-parameters-guide'],
    references: [
      { title: 'Set up tracking with ValueTrack parameters', url: 'https://support.google.com/google-ads/answer/6305348', publisher: 'Google Ads Help' },
      { title: 'Auto-tagging: Definition', url: 'https://support.google.com/google-ads/answer/1752125', publisher: 'Google Ads Help' },
      { title: 'Link Google Ads and Google Analytics', url: 'https://support.google.com/analytics/answer/9379420', publisher: 'Google Analytics Help' }
    ],
    contentHtml: `
      <p class="lead-text">Google Ads auto-tagging supplies campaign information to a linked GA4 property. UTMs can also help your forms, CRM and other tools record readable campaign values. This guide covers how to use ValueTrack, URL suffixes and tracking templates together.</p>

      <h2 id="why-manual-utms-with-google-ads">Why You Still Need UTMs With Google Ads in 2026</h2>
      <p>Google Ads auto-tagging attaches an encrypted hash parameter (<code>gclid=...</code>) to the landing page. While GA4 decrypts this hash natively to extract impressions, keyword bids, and ad group names, third-party software cannot read GCLID data. UTM parameters bridge this gap by providing universal, plain-text attribution across your entire marketing tech stack.</p>

      <h2 id="the-ideal-account-level-suffix">The Standard Account-Level Final URL Suffix</h2>
      <p>An account-level <strong>Final URL Suffix</strong> can apply tracking parameters broadly across Google Ads campaigns. Review campaign and ad-level settings for overrides, then test the expanded landing URLs.</p>

      <div class="callout callout-recommended">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <strong>Enterprise Production Final URL Suffix</strong>
        </div>
        <div class="code-block-wrap">
          <pre><code>utm_source=google&amp;utm_medium=cpc&amp;utm_campaign={_campaign}&amp;utm_term={keyword}&amp;utm_content={creative}&amp;utm_id={campaignid}&amp;device={device}&amp;placement={placement}&amp;targetid={targetid}</code></pre>
          <button class="copy-code-btn" data-copy="utm_source=google&utm_medium=cpc&utm_campaign={_campaign}&utm_term={keyword}&utm_content={creative}&utm_id={campaignid}&device={device}&placement={placement}&targetid={targetid}" aria-label="Copy Google Ads Suffix">Copy Suffix</button>
        </div>
        <p><em>Note: If you use the campaign name custom parameter <code>{_campaign}</code>, define it at the campaign settings level. If you prefer automated numerical IDs, use <code>utm_campaign={campaignid}</code>.</em></p>
      </div>

      <h2 id="essential-valuetrack-parameters">Essential ValueTrack Parameters Reference Table</h2>
      <div class="editorial-table-wrap">
        <table class="editorial-table">
          <thead>
            <tr>
              <th>ValueTrack Token</th>
              <th>What Google Injects at Click Time</th>
              <th>Recommended UTM Mapping</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>{campaignid}</code></td>
              <td>Numerical ID of the Google Ads Campaign</td>
              <td><code>utm_id={campaignid}</code></td>
            </tr>
            <tr>
              <td><code>{adgroupid}</code></td>
              <td>Numerical ID of the Ad Group</td>
              <td>Custom parameter: <code>adgroup_id={adgroupid}</code></td>
            </tr>
            <tr>
              <td><code>{keyword}</code></td>
              <td>Keyword matched for Search ads (blank for Display/PMax)</td>
              <td><code>utm_term={keyword}</code></td>
            </tr>
            <tr>
              <td><code>{matchtype}</code></td>
              <td><code>e</code> (exact), <code>p</code> (phrase), or <code>b</code> (broad)</td>
              <td>Custom parameter: <code>matchtype={matchtype}</code></td>
            </tr>
            <tr>
              <td><code>{creative}</code></td>
              <td>Unique numerical ID of the ad creative</td>
              <td><code>utm_content={creative}</code></td>
            </tr>
            <tr>
              <td><code>{device}</code></td>
              <td><code>m</code> (mobile), <code>t</code> (tablet), or <code>c</code> (computer)</td>
              <td>Custom parameter: <code>device={device}</code></td>
            </tr>
            <tr>
              <td><code>{placement}</code></td>
              <td>Domain of Display Network site where ad was clicked</td>
              <td>Custom parameter: <code>placement={placement}</code></td>
            </tr>
            <tr>
              <td><code>{network}</code></td>
              <td><code>g</code> (Search), <code>s</code> (Search partner), <code>d</code> (Display), <code>ytv</code> (YouTube)</td>
              <td>Custom parameter: <code>network={network}</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="tracking-templates-vs-final-url-suffix">Tracking Templates vs Final URL Suffix: Which to Use?</h2>
      <p>Google Ads offers two primary tracking mechanisms:</p>
      <ul>
        <li><strong>Tracking Template (<code>{lpurl}?utm_...</code>):</strong> Historically used with third-party click redirect trackers (such as Kenshoo or Marin). The browser navigates to the tracker URL first, then redirects to the final landing page. This introduces latency and redirect vulnerability.</li>
        <li><strong>Final URL Suffix (utm_...):</strong> The modern standard. Parameters are appended directly to your landing page without any redirect hops, improving page speed, user experience, and tracking stability.</li>
      </ul>

      <h2 id="campaign-type-nuances">Campaign Specifics: Search, Display, YouTube & PMax</h2>
      <div class="callout callout-warning">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <strong>Performance Max (PMax) Caveat</strong>
        </div>
        <p>In Performance Max campaigns, there are no bidded keywords. If you pass <code>utm_term={keyword}</code>, Google will pass an empty string for Display/Video inventory. For PMax, prioritize <code>utm_id={campaignid}</code> and <code>utm_content={creative}</code>.</p>
      </div>

      <h2 id="auto-tagging-ga4-reconciliation">Reconciling Auto-Tagging and Manual UTMs in GA4</h2>
      <p>When you link Google Ads to GA4, GA4 auto-tagging takes precedence by default. GA4 populates reporting dimensions from the GCLID, ignoring your manual UTM parameters in Google Ads overview reports. However, manual parameters remain visible under <em>Manual source</em>, <em>Manual medium</em>, and in the BigQuery raw event export.</p>

      <h2 id="top-google-ads-tracking-mistakes">Google Ads Tracking Mistakes to Check</h2>
      <ol>
        <li><strong>Hardcoding Keywords in Ad URLs:</strong> Never manually type keywords into ad URLs. Always use dynamic <code>{keyword}</code>.</li>
        <li><strong>Enabling "Override Auto-Tagging" Without a Clear Need:</strong> In GA4 Property Settings, there is a checkbox labeled <em>"Allow manual tagging (UTM values) to override auto-tagging (GCLID values)"</em>. Do not enable this unless you have a strict requirement, as it can strip rich Google Ads auction metrics from standard GA4 reports.</li>
      </ol>

      <section class="article-faq-section">
        <h2 id="faq">Frequently Asked Questions</h2>
        <div class="faq-item">
          <h3>Should I put UTM parameters in the Final URL or Final URL Suffix?</h3>
          <p>For UTMs, use the <strong>Final URL Suffix</strong> at the appropriate account, campaign or ad group level. It supports ValueTrack tokens such as <code>{keyword}</code> and <code>{campaignid}</code>. Test the expanded URL and check for lower-level overrides.</p>
        </div>
        <div class="faq-item">
          <h3>Do ValueTrack parameters work in Performance Max campaigns?</h3>
          <p>Yes, but with caveats. Parameters like <code>{campaignid}</code>, <code>{adgroupid}</code>, and <code>{device}</code> work reliably across PMax. However, keyword-specific parameters like <code>{keyword}</code> and <code>{matchtype}</code> return blank values for non-search inventory (such as YouTube, Gmail, and Google Display Network placements).</p>
        </div>
        <div class="faq-item">
          <h3>Does auto-tagging override manual UTM parameters in GA4?</h3>
          <p>By default, yes. When auto-tagging is enabled and linked to GA4, GA4 uses GCLID data for its standard Google Ads reporting and attribution snapshot. However, manual UTM values are preserved under the manual campaign dimensions and in the BigQuery raw event export, providing the best of both worlds.</p>
        </div>
        <div class="faq-item">
          <h3>Why do curly braces like {keyword} show up literally when I test my link?</h3>
          <p>ValueTrack parameters are dynamically replaced by Google's ad serving servers only at the actual moment an ad impression is clicked. If you copy/paste a tracking template into your browser address bar manually, the ad engine never processes the macro, leaving the literal braces unexpanded.</p>
        </div>
      </section>
    `
  },
  {
    slug: 'google-ads-auto-tagging-vs-utms',
    title: 'Google Ads Auto-Tagging vs UTMs: When to Use GCLID, UTMs, or Both',
    seoTitle: 'Google Ads Auto-Tagging vs UTMs: Hybrid Tracking Guide | UTMCraft',
    description: 'Compare Google Ads auto-tagging and UTMs. Learn when to use both, what each provides and how to keep readable campaign values in your CRM.',
    category: 'google-ads',
    isPillar: false,
    author: {
      name: 'Dinesh Jeengar',
      role: 'Founder, UTMCraft',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-02-14',
    dateModified: '2026-10-01',
    reviewedDate: 'September 23, 2026',
    readingTime: '8 min read',
    primaryKeyword: 'google ads auto-tagging vs utms',
    secondaryKeywords: ['auto-tagging vs manual utm google ads', 'gclid vs utm', 'should i use utm with google ads', 'google ads hybrid tracking'],
    semanticKeywords: ['gclid query parameter', 'crm offline attribution', 'ga4 google ads integration', 'link decoration safari itp'],
    relatedEntities: ['Google Ads Auto-Tagging', 'GCLID', 'Google Analytics 4', 'CRM Integration'],
    searchIntent: 'Comparison & Architecture Guide',
    featuredImage: '/blog/images/google-ads-auto-tagging-vs-utms.webp',
    featuredImageAlt: 'Comparison graphic showing how GCLID and UTM parameters flow into GA4 and third-party CRMs',
    tableOfContents: [
      { id: 'the-core-dilemma', title: 'The Core Dilemma: Auto-Tagging vs Manual Tagging', level: 2 },
      { id: 'detailed-feature-comparison', title: 'Detailed Comparison: Capabilities & Limitations', level: 2 },
      { id: 'why-hybrid-is-standard', title: 'When Using Both Helps', level: 2 },
      { id: 'how-to-configure-hybrid', title: 'How to Configure Hybrid Tracking Step-by-Step', level: 2 }
    ],
    toolCta: {
      title: 'Build Your Google Ads Final URL Suffix',
      description: 'Build a Final URL Suffix with ValueTrack parameters, then test it alongside auto-tagging.',
      link: '/utm-builder/google-ads/',
      buttonText: 'Configure Google Ads Tracking'
    },
    relatedSlugs: ['google-ads-utm-guide', 'gclid-vs-utms', 'google-ads-tracking-templates'],
    references: [
      { title: 'Benefits of Auto-Tagging', url: 'https://support.google.com/google-ads/answer/1752125', publisher: 'Google Ads Help' }
    ],
    contentHtml: `
      <p class="lead-text">Auto-tagging and UTMs serve different purposes. Auto-tagging connects Google Ads clicks with campaign reporting, while UTMs put readable campaign values in the URL. Whether you need both depends on what your analytics tools and CRM collect.</p>

      <h2 id="the-core-dilemma">The Core Dilemma: Auto-Tagging vs Manual Tagging</h2>
      <p>Auto-tagging appends a Google Click Identifier (<code>gclid</code>) to your destination URL. When the user lands on your site, the GA4 tag reads this hash and contacts Google's servers to import 20+ dimensions, including keyword, search query, ad group, and cost. However, the data inside the GCLID hash is encrypted: external tools like HubSpot, Salesforce, Marketo, and Mixpanel cannot decrypt it.</p>

      <h2 id="detailed-feature-comparison">Detailed Comparison: Capabilities & Limitations</h2>
      <div class="editorial-table-wrap">
        <table class="editorial-table">
          <thead>
            <tr>
              <th>Capability</th>
              <th>Auto-Tagging (GCLID Only)</th>
              <th>Manual UTMs Only</th>
              <th>Hybrid (Both Together)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GA4 Impression &amp; Cost Data</td>
              <td>Yes</td>
              <td>No (Requires CSV upload)</td>
              <td><strong>Yes</strong></td>
            </tr>
            <tr>
              <td>Query &amp; Match Type Reporting</td>
              <td>Yes</td>
              <td>Partial (via ValueTrack)</td>
              <td><strong>Yes</strong></td>
            </tr>
            <tr>
              <td>CRM Form Field Capture</td>
              <td>No (Requires Offline API)</td>
              <td>Yes (Plain text)</td>
              <td><strong>Yes</strong></td>
            </tr>
            <tr>
              <td>Third-Party BI &amp; Analytics</td>
              <td>No</td>
              <td>Yes</td>
              <td><strong>Yes</strong></td>
            </tr>
            <tr>
              <td>Resilience Against Safari ITP</td>
              <td>Fragile (Shortened cookie lifespan)</td>
              <td>High (Plain parameters)</td>
              <td><strong>High</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="why-hybrid-is-standard">When Using Both Helps</h2>
      <p>In a hybrid setup, you leave Auto-Tagging turned <strong>ON</strong> in Google Ads account settings, but you also configure an account-level <strong>Final URL Suffix</strong> that dynamically populates UTM parameters via ValueTrack tokens. GA4 continues to use the GCLID for deep AdWords reporting, while your lead forms and CRM grab the plain-text UTM parameters.</p>

      <h2 id="how-to-configure-hybrid">How to Configure Hybrid Tracking Step-by-Step</h2>
      <ol>
        <li>In Google Ads, click <strong>Admin &gt; Account settings</strong>.</li>
        <li>Under <strong>Auto-tagging</strong>, ensure "Tag the URL that people click through from my ad" is checked.</li>
        <li>Under <strong>Tracking</strong>, enter your Final URL Suffix:
          <div class="code-block-wrap">
            <pre><code>utm_source=google&amp;utm_medium=cpc&amp;utm_campaign={_campaign}&amp;utm_term={keyword}&amp;utm_content={creative}&amp;utm_id={campaignid}</code></pre>
          </div>
        </li>
        <li>In GA4 Admin &gt; Property Settings &gt; Data collection, ensure "Allow manual tagging to override auto-tagging" remains <strong>unchecked</strong> (unless you have a specific requirement to overwrite GCLID values in GA4).</li>
      </ol>
    `
  },
  {
    slug: 'gclid-vs-utms',
    title: 'GCLID vs UTM Parameters: Safari Privacy & Offline Conversion Tracking',
    seoTitle: 'GCLID vs UTM: Safari Privacy & Offline Conversions | UTMCraft',
    description: 'Understand how Safari privacy restrictions affect Google Ads click IDs, and how to capture GCLID with UTMs in lead forms for offline conversion and CRM attribution.',
    category: 'google-ads',
    isPillar: false,
    author: {
      name: 'Dinesh Jeengar',
      role: 'Founder, UTMCraft',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-02-25',
    dateModified: '2026-10-01',
    reviewedDate: 'September 23, 2026',
    readingTime: '9 min read',
    primaryKeyword: 'gclid vs utm parameters privacy',
    secondaryKeywords: ['apple itp gclid', 'capture gclid in crm', 'gclid offline conversion tracking', 'click id tracking privacy'],
    semanticKeywords: ['google click identifier', 'safari intelligent tracking prevention', 'link decoration privacy', 'server side tagging'],
    relatedEntities: ['Google Ads', 'GCLID', 'WebKit ITP', 'Attribution Engineering'],
    searchIntent: 'Technical Comparison & Architecture Guide',
    featuredImage: '/blog/images/gclid-vs-utms.webp',
    featuredImageAlt: 'Technical diagram contrasting encrypted GCLID token transmission with plain-text UTM query parameters',
    tableOfContents: [
      { id: 'the-anatomy-of-gclid', title: 'The Anatomy of a GCLID', level: 2 },
      { id: 'privacy-restrictions-itp', title: 'Browser Privacy Restrictions: WebKit ITP & Link Decoration', level: 2 },
      { id: 'data-durability-comparison', title: 'Data Durability & Offline Conversion Imports', level: 2 }
    ],
    toolCta: {
      title: 'Review GCLID and UTM URL Structure',
      description: 'Inspect query-string syntax with the checker. It does not test destination behavior, redirects, or Google Ads and GA4 collection.',
      link: '/utm-checker/',
      buttonText: 'Audit URL in UTM Checker'
    },
    relatedSlugs: ['google-ads-utm-guide', 'google-ads-auto-tagging-vs-utms', 'google-ads-tracking-templates'],
    references: [
      { title: 'Google Click Identifier (GCLID): Definition', url: 'https://support.google.com/google-ads/answer/9744275', publisher: 'Google Ads Help' },
      { title: 'Set up offline conversions using Google Click ID (GCLID)', url: 'https://support.google.com/google-ads/answer/7012522', publisher: 'Google Ads Help' },
      { title: 'WebKit Intelligent Tracking Prevention 2.1', url: 'https://webkit.org/blog/8613/intelligent-tracking-prevention-2-1/', publisher: 'WebKit' }
    ],
    contentHtml: `
      <p class="lead-text"><code>gclid</code> identifies a Google Ads click. UTM parameters describe its source, medium and campaign in readable text. They can appear in the same URL, but you store and use them differently when tracking leads or importing offline conversions.</p>

      <h2 id="the-anatomy-of-gclid">The Anatomy of a GCLID</h2>
      <p>A Google Click Identifier (<code>gclid=Cj0KCQjw...</code>) is a dynamically generated, base64-encoded binary protobuf string created by Google's ad servers at the microsecond an ad is clicked. It contains:</p>
      <ul>
        <li>The Google Ads Account ID, Campaign ID, Ad Group ID, and Creative ID.</li>
        <li>The exact search auction timestamp and device metadata.</li>
        <li>The keyword, match type, and bid strategy active during the auction.</li>
      </ul>
      <p>Because only Google's servers hold the private cryptographic key to decode this string, third-party software cannot parse its contents directly from the URL.</p>

      <h2 id="privacy-restrictions-itp">Browser Privacy Restrictions: WebKit ITP & Link Decoration</h2>
      <p>Apple's WebKit team (Safari on iOS and macOS) classifies GCLID as "link decoration" used for cross-site tracking. Under Intelligent Tracking Prevention (ITP):</p>
      <ul>
        <li>When a user navigates to a site via a link decorated with a known click ID (such as <code>gclid</code> or <code>fbclid</code>), Safari limits the lifespan of all client-side JavaScript cookies (<code>document.cookie</code>) to <strong>24 hours to 7 days</strong>.</li>
        <li>If the user converts on day 8, client-side attribution is completely broken.</li>
      </ul>
      <p>Standard UTM parameters (<code>utm_source</code>, <code>utm_medium</code>), however, are widely recognized as first-party contextual parameters and do not trigger aggressive cookie cap penalties in the same way.</p>

      <h2 id="data-durability-comparison">Data Durability & Offline Conversion Imports</h2>
      <p>If your sales cycle exceeds 14 days (common in B2B SaaS and enterprise sales), storing GCLID alone in a browser cookie is dangerous. When a lead fills out a form, capture both the <code>gclid</code> and the <code>utm_*</code> parameters into your CRM hidden fields. Use GCLID to upload offline conversions (Enhanced Conversions for Leads) back into Google Ads, while using UTM parameters for multi-month pipeline attribution in your CRM.</p>
    `
  },
  {
    slug: 'google-ads-tracking-templates',
    title: 'Google Ads Tracking Template Setup: Custom Parameters & Parallel Tracking',
    seoTitle: 'Google Ads Tracking Template Setup: Custom Parameters | UTMCraft',
    description: 'Configure Google Ads tracking templates across account levels, define custom parameters, and meet parallel tracking requirements with a tested setup workflow.',
    category: 'google-ads',
    isPillar: false,
    author: {
      name: 'Dinesh Jeengar',
      role: 'Founder, UTMCraft',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-03-05',
    dateModified: '2026-10-01',
    reviewedDate: 'September 23, 2026',
    readingTime: '9 min read',
    primaryKeyword: 'google ads tracking template setup',
    secondaryKeywords: ['google ads custom parameters', 'parallel tracking requirements', 'account level tracking template'],
    semanticKeywords: ['lpurl parameter', 'custom parameters {_campaign}', 'parallel tracking google ads', 'final url suffix vs tracking template'],
    relatedEntities: ['Google Ads', 'ValueTrack', 'Tracking Templates', 'URL Options'],
    searchIntent: 'Step-by-Step Implementation Guide',
    featuredImage: '/blog/images/google-ads-tracking-templates.webp',
    featuredImageAlt: 'UI walkthrough showing where to configure account-level tracking templates and URL options in Google Ads',
    tableOfContents: [
      { id: 'tracking-hierarchy', title: 'The Google Ads Tracking Hierarchy', level: 2 },
      { id: 'how-to-set-account-level-suffix', title: 'How to Set Up an Account-Level Final URL Suffix', level: 2 },
      { id: 'custom-parameters-guide', title: 'Using Custom Parameters ({_campaign}) for Clean Names', level: 2 },
      { id: 'parallel-tracking-requirements', title: 'Parallel Tracking Requirements and HTTPS', level: 2 }
    ],
    toolCta: {
      title: 'Generate Your Google Ads URL Parameters',
      description: 'Use the Google Ads Campaign Builder to generate copy-and-paste tracking parameters customized for your account.',
      link: '/utm-builder/google-ads/',
      buttonText: 'Open Google Ads Builder'
    },
    relatedSlugs: ['google-ads-utm-guide', 'google-ads-auto-tagging-vs-utms', 'gclid-vs-utms'],
    references: [
      { title: 'Use ValueTrack parameters in tracking templates', url: 'https://support.google.com/google-ads/answer/6305348', publisher: 'Google Ads Help' }
    ],
    contentHtml: `
      <p class="lead-text">Google Ads lets you set tracking templates and URL suffixes at several account levels. A lower-level setting can override one above it, so check which setup each ad inherits. This guide explains the fields and a testing process.</p>

      <h2 id="tracking-hierarchy">The Google Ads Tracking Hierarchy</h2>
      <p>Google Ads evaluates tracking templates using a top-down inheritance model:</p>
      <ol>
        <li><strong>Account Level:</strong> Applies broadly across the account, subject to more specific settings; useful for centralized oversight.</li>
        <li><strong>Campaign Level:</strong> Overrides account-level settings for specific campaigns.</li>
        <li><strong>Ad Group Level:</strong> Overrides campaign-level settings.</li>
        <li><strong>Ad / Keyword / Sitelink Level:</strong> Overrides all parent templates.</li>
      </ol>
      <p>Use an <strong>account-level</strong> setting if your campaigns share a tracking setup. Add lower-level overrides where needed and document which setting each campaign uses.</p>

      <h2 id="how-to-set-account-level-suffix">How to Set Up an Account-Level Final URL Suffix</h2>
      <ol>
        <li>Sign in to your Google Ads account.</li>
        <li>In the left navigation menu, click <strong>Admin</strong> &gt; <strong>Account settings</strong>.</li>
        <li>Click to expand the <strong>Tracking</strong> section.</li>
        <li>In the <strong>Final URL suffix</strong> field, paste your parameter string:
          <div class="code-block-wrap">
            <pre><code>utm_source=google&amp;utm_medium=cpc&amp;utm_campaign={_campaign}&amp;utm_term={keyword}&amp;utm_content={creative}&amp;utm_id={campaignid}</code></pre>
            <button class="copy-code-btn" data-copy="utm_source=google&utm_medium=cpc&utm_campaign={_campaign}&utm_term={keyword}&utm_content={creative}&utm_id={campaignid}" aria-label="Copy Suffix">Copy</button>
          </div>
        </li>
        <li>Click <strong>Test</strong>. Google Ads will test your landing pages to ensure the parameter string does not trigger HTTP errors.</li>
        <li>Click <strong>Save</strong>.</li>
      </ol>

      <h2 id="custom-parameters-guide">Using Custom Parameters ({_campaign}) for Clean Names</h2>
      <p>By default, ValueTrack only provides <code>{campaignid}</code> (a number like <code>1948201948</code>). If you want human-readable campaign names in your CRM, use a custom parameter:</p>
      <ul>
        <li>In campaign settings, expand <strong>Campaign URL options</strong>.</li>
        <li>Under <strong>Custom parameters</strong>, enter:
          <br>Name: <code>_campaign</code>
          <br>Value: <code>us_saas_brand-search_2026</code>
        </li>
      </ul>
      <p>When an ad is clicked, Google Ads dynamically replaces <code>{_campaign}</code> in your account-level suffix with the specific campaign name!</p>

      <h2 id="parallel-tracking-requirements">Parallel Tracking Requirements and HTTPS</h2>
      <p>Under Google's Parallel Tracking architecture, tracking templates must point to secure HTTPS endpoints. If your tracking redirect uses HTTP, Google Ads will reject the URL or pause the ad.</p>
    `
  }
];
