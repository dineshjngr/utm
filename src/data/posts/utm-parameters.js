export const utmParametersPosts = [
  {
    slug: 'ga4-utm-parameters-guide',
    title: 'Complete UTM Parameters Guide for GA4: Manual Campaign Dimensions & Best Practices',
    seoTitle: 'Complete UTM Parameters Guide for GA4 | UTMCraft',
    description: 'The definitive technical reference to all 9 UTM parameters in Google Analytics 4, dimension mappings, character limits, encoding rules, and reporting caveats.',
    category: 'utm-parameters',
    isPillar: true,
    author: {
      name: 'DJ',
      role: 'Attribution & Analytics Architect',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-01-20',
    dateModified: '2026-09-23',
    reviewedDate: 'September 23, 2026',
    readingTime: '13 min read',
    primaryKeyword: 'ga4 utm parameters',
    secondaryKeywords: ['utm parameters guide', 'google analytics 4 utm dimensions', 'manual campaign dimensions', 'utm_creative_format ga4'],
    semanticKeywords: ['manual source platform', 'manual marketing tactic', 'session campaign', 'first user source medium', 'url encoding query string'],
    relatedEntities: ['Google Analytics 4', 'UTM Parameters', 'Manual Campaign Dimensions', 'BigQuery Export'],
    searchIntent: 'Technical Reference & Deep Guide',
    featuredImage: '/blog/images/ga4-utm-parameters-guide.webp',
    featuredImageAlt: 'Technical schematic detailing the 9 UTM parameters mapping to GA4 session and event dimensions',
    tableOfContents: [
      { id: 'all-9-utm-parameters', title: 'The Complete Matrix: All 9 UTM Parameters in GA4', level: 2 },
      { id: 'ga4-manual-dimensions-mapping', title: 'How GA4 Maps Parameters to Manual Dimensions', level: 2 },
      { id: 'creative-format-marketing-tactic', title: 'utm_creative_format & utm_marketing_tactic: Current Realities', level: 2 },
      { id: 'syntax-and-encoding-rules', title: 'Syntax, Parameter Order & URL Encoding Rules', level: 2 },
      { id: 'utms-vs-click-ids', title: 'UTM Parameters vs Click IDs (GCLID, FBCLID)', level: 2 },
      { id: 'common-parameter-mistakes', title: 'Critical Parameter Mistakes to Avoid', level: 2 },
      { id: 'faq', title: 'Frequently Asked Questions', level: 2 }
    ],
    toolCta: {
      title: 'Generate Perfect GA4 Tracking URLs',
      description: 'Build complete campaign links with automated lowercase formatting, required parameter checks, and instant syntax validation.',
      link: '/',
      buttonText: 'Open Standard Campaign Builder'
    },
    relatedSlugs: ['utm-source-guide', 'utm-medium-guide', 'utm-campaign-guide', 'ga4-utm-troubleshooting-guide'],
    references: [
      { title: 'Dimensions & Metrics in Google Analytics 4', url: 'https://support.google.com/analytics/answer/9143382', publisher: 'Google Analytics Help' },
      { title: 'Google Analytics 4 URL-Builder Documentation', url: 'https://support.google.com/analytics/answer/10918862', publisher: 'Google Analytics Help' },
      { title: 'Uniform Resource Identifier (URI): Generic Syntax', url: 'https://datatracker.ietf.org/doc/html/rfc3986', publisher: 'IETF' }
    ],
    contentHtml: `
      <p class="lead-text">GA4 supports 9 manual campaign parameters: six commonly used/core parameters plus three additional GA4 parameters. Some newer parameters currently have reporting limitations.</p>

      <p>Google documents the traditional manual parameters plus <code>utm_source_platform</code>, <code>utm_creative_format</code>, and <code>utm_marketing_tactic</code>; Google also separately documents and recommends <code>utm_id</code>. Google notes that <code>utm_creative_format</code> and <code>utm_marketing_tactic</code> are not currently reported in GA4 properties.</p>

      <p>The six commonly used/core parameters are <code>utm_source</code>, <code>utm_medium</code>, <code>utm_campaign</code>, <code>utm_id</code>, <code>utm_term</code>, and <code>utm_content</code>. The three additional GA4 parameters are <code>utm_source_platform</code>, <code>utm_creative_format</code>, and <code>utm_marketing_tactic</code>.</p>

      <h2 id="all-9-utm-parameters">The Complete Matrix: All 9 UTM Parameters in GA4</h2>
      <p>Here is the definitive reference table showing all 9 UTM parameters supported in GA4, organized by core parameters and additional GA4 parameters, with requirement levels and reporting status:</p>

      <div class="editorial-table-wrap">
        <table class="editorial-table">
          <thead>
            <tr>
              <th>UTM Parameter</th>
              <th>Classification</th>
              <th>Requirement</th>
              <th>GA4 Dimension</th>
              <th>Reporting Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>utm_source</code></td>
              <td>Core Parameter</td>
              <td><strong>Required</strong></td>
              <td>Session source / First user source / Manual source</td>
              <td>Available in all standard reports</td>
            </tr>
            <tr>
              <td><code>utm_medium</code></td>
              <td>Core Parameter</td>
              <td><strong>Required</strong></td>
              <td>Session medium / First user medium / Manual medium</td>
              <td>Available in all standard reports (determines channel grouping)</td>
            </tr>
            <tr>
              <td><code>utm_campaign</code></td>
              <td>Core Parameter</td>
              <td><strong>Recommended</strong></td>
              <td>Session campaign / First user campaign / Manual campaign</td>
              <td>Available in all standard reports</td>
            </tr>
            <tr>
              <td><code>utm_id</code></td>
              <td>Core Parameter</td>
              <td>Recommended by Google</td>
              <td>Campaign ID / Session campaign ID / Manual campaign ID</td>
              <td>Available in standard &amp; Advertising reports; used for Cost Data Import</td>
            </tr>
            <tr>
              <td><code>utm_term</code></td>
              <td>Core Parameter</td>
              <td>Optional</td>
              <td>Session manual ad term / Manual term</td>
              <td>Available in standard reports &amp; Explorations</td>
            </tr>
            <tr>
              <td><code>utm_content</code></td>
              <td>Core Parameter</td>
              <td>Optional</td>
              <td>Session manual ad content / Manual ad content</td>
              <td>Available in standard reports &amp; Explorations</td>
            </tr>
            <tr>
              <td><code>utm_source_platform</code></td>
              <td>Additional GA4 Parameter</td>
              <td>Optional</td>
              <td>Manual source platform</td>
              <td>Available in GA4 reports &amp; BigQuery export</td>
            </tr>
            <tr>
              <td><code>utm_creative_format</code></td>
              <td>Additional GA4 Parameter</td>
              <td>Optional</td>
              <td>Manual creative format</td>
              <td><strong>Reporting limitation:</strong> Google notes this is not currently reported in GA4 properties</td>
            </tr>
            <tr>
              <td><code>utm_marketing_tactic</code></td>
              <td>Additional GA4 Parameter</td>
              <td>Optional</td>
              <td>Manual marketing tactic</td>
              <td><strong>Reporting limitation:</strong> Google notes this is not currently reported in GA4 properties</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="ga4-manual-dimensions-mapping">How GA4 Maps Parameters to Manual Dimensions</h2>
      <p>In GA4 reports, campaign data is exposed across three distinct dimension scopes:</p>
      <ul>
        <li><strong>First user scope:</strong> (e.g. <em>First user source / medium</em>) Attributes the user's very first lifetime session to the channel that initially acquired them.</li>
        <li><strong>Session scope:</strong> (e.g. <em>Session source / medium</em>) Attributes the specific session to the channel that drove that particular visit.</li>
        <li><strong>Manual event scope:</strong> (e.g. <em>Manual source</em>, <em>Manual medium</em>, <em>Manual campaign</em>) Captures the raw parameters passed explicitly in the landing page query string, independent of attribution modeling.</li>
      </ul>

      <div class="callout callout-recommended">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <strong>GA4 Real-World Processing Rule</strong>
        </div>
        <p>When you view standard acquisition reports in GA4 (such as <em>Reports &gt; Acquisition &gt; Traffic acquisition</em>), GA4 defaults to <strong>Session default channel group</strong>. This dimension uses an automated rule evaluation tree based primarily on <code>Session medium</code> and <code>Session source</code>.</p>
      </div>

      <h2 id="creative-format-marketing-tactic">utm_creative_format & utm_marketing_tactic: Current Realities</h2>
      <p>Google introduced <code>utm_creative_format</code> and <code>utm_marketing_tactic</code> specifically for GA4. However, you must understand their current reporting limitations:</p>
      
      <div class="callout callout-warning">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <strong>Reporting Limitation Notice</strong>
        </div>
        <p>Google officially notes that <strong><code>utm_creative_format</code> and <code>utm_marketing_tactic</code> are not currently reported in Google Analytics 4 properties</strong>. While GA4 captures these values on incoming hits and makes them available in the BigQuery Event Export and custom explorations (as <em>Manual creative format</em> and <em>Manual marketing tactic</em>), they do not appear in standard pre-built property reports and do not influence Default Channel Grouping rules.</p>
      </div>

      <h2 id="syntax-and-encoding-rules">Syntax, Parameter Order & URL Encoding Rules</h2>
      <p>A query string begins with a question mark (<code>?</code>) and chains key-value pairs with ampersands (<code>&amp;</code>). While the order of parameters does not technically matter to web servers or the GA4 collection script, establishing a consistent parameter order makes debugging substantially easier:</p>

      <div class="code-block-wrap">
        <pre><code>https://example.com/landing?utm_source=google&amp;utm_medium=cpc&amp;utm_campaign=brand-search&amp;utm_term={keyword}&amp;utm_content=headline-a&amp;utm_id=12345</code></pre>
        <button class="copy-code-btn" data-copy="https://example.com/landing?utm_source=google&utm_medium=cpc&utm_campaign=brand-search&utm_term={keyword}&utm_content=headline-a&utm_id=12345" aria-label="Copy canonical parameter string">Copy</button>
      </div>

      <h3>URL Encoding Requirements</h3>
      <p>According to RFC 3986, characters outside the unreserved character set (letters, numbers, <code>-</code>, <code>_</code>, <code>.</code>, <code>~</code>) must be percent-encoded:</p>
      <ul>
        <li>Spaces become <code>%20</code> or <code>+</code>. (Best practice: avoid spaces completely by using hyphens or underscores).</li>
        <li>Ampersands inside parameter values must be encoded as <code>%26</code>. (e.g. <code>utm_campaign=sales%26marketing</code>).</li>
        <li>Question marks inside values must be encoded as <code>%3F</code>.</li>
      </ul>

      <h2 id="utms-vs-click-ids">UTM Parameters vs Click IDs (GCLID, FBCLID)</h2>
      <div class="editorial-table-wrap">
        <table class="editorial-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>UTM Parameters</th>
              <th>Platform Click IDs (e.g. GCLID)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Human Readable</strong></td>
              <td>Yes (plain text key-value pairs)</td>
              <td>No (encrypted hash strings)</td>
            </tr>
            <tr>
              <td><strong>Platform Portability</strong></td>
              <td>Universal across GA4, Adobe, Mixpanel, CRMs</td>
              <td>Proprietary to the issuing ad network</td>
            </tr>
            <tr>
              <td><strong>Data Richness</strong></td>
              <td>Only captures values explicitly typed</td>
              <td>Unlocks auction cost, impressions, match types, ad groups</td>
            </tr>
            <tr>
              <td><strong>Privacy Degradation</strong></td>
              <td>Resistant to link decoration stripping</td>
              <td>Frequently stripped by Safari ITP, Brave, iOS Mail Protection</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="callout callout-recommended">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <strong>The Industry Standard: Hybrid Tracking</strong>
        </div>
        <p>In modern performance marketing, use both: keep auto-tagging enabled for native ad platform reporting, while appending a core set of standard UTMs (via Google Ads ValueTrack or Meta URL parameters) to pass readable campaign data to CRMs and offline data pipelines.</p>
      </div>

      <h2 id="utms-vs-referrer-header">UTM Parameters vs HTTP Referrer Data</h2>
      <p>When a visitor navigates to your site without UTM parameters, analytics platforms inspect the browser's HTTP <code>Referer</code> request header. However, referrer headers are increasingly unreliable:</p>
      <ul>
        <li>Mobile apps (Instagram, TikTok, LinkedIn) frequently pass empty referrers when launching in-app webviews.</li>
        <li>Privacy headers (<code>Referrer-Policy: no-referrer</code>) intentionally strip domain origins.</li>
        <li>Navigating from HTTPS to HTTP strips the referrer header entirely.</li>
      </ul>
      <p>UTM parameters override referrer data in GA4, ensuring attribution even when referrer headers are completely absent.</p>

      <h2 id="common-parameter-mistakes">Critical Parameter Mistakes to Avoid</h2>
      <div class="callout callout-mistake">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          <strong>Placing Anchor Hashes (#) Before Query Parameters (?)</strong>
        </div>
        <p>Browsers treat everything after the hash <code>#</code> as a client-side fragment identifier, not server query parameters. If you format a link as:
        <br><code>https://example.com/#pricing?utm_source=google</code>
        <br>Web servers and analytics tracking libraries will <strong>completely ignore the UTM parameters</strong>. The hash must always be placed at the very end:
        <br><code>https://example.com/?utm_source=google#pricing</code></p>
      </div>

      <section class="article-faq-section">
        <h2 id="faq">Frequently Asked Questions</h2>
        <div class="faq-item">
          <h3>Are UTM parameters case-sensitive in Google Analytics 4?</h3>
          <p>Yes. GA4 is strictly case-sensitive. If you tag campaigns with <code>utm_source=Google</code>, <code>utm_source=google</code>, and <code>utm_source=GOOGLE</code>, GA4 records three completely separate source rows in your Traffic Acquisition reports. To avoid fractured analytics, always force all parameters to lowercase.</p>
        </div>
        <div class="faq-item">
          <h3>What happens if utm_source or utm_medium is missing from a link?</h3>
          <p>If <code>utm_source</code> is missing, GA4 cannot determine the traffic origin and will typically categorize the session as <code>(direct) / (none)</code> or use the HTTP referrer header. If <code>utm_medium</code> is missing, GA4 fails standard channel classification rules and buckets the session under <code>(Unassigned)</code>.</p>
        </div>
        <div class="faq-item">
          <h3>Why doesn't GA4 report utm_creative_format in standard campaign dashboards?</h3>
          <p>Google Analytics 4 collects <code>utm_creative_format</code> into the <em>Manual creative format</em> dimension. However, it does not currently map into standard Default Channel Groups or pre-configured Traffic Acquisition dashboard cards. To analyze it, you must build a custom report in <strong>GA4 Explorations</strong> or query the <strong>BigQuery Event Export</strong>.</p>
        </div>
        <div class="faq-item">
          <h3>What is the difference between utm_term and utm_content?</h3>
          <p><code>utm_term</code> was originally designed for search keywords (e.g. <code>crm+software</code> or dynamic ValueTrack <code>{keyword}</code>). <code>utm_content</code> is designed for creative asset differentiation, such as A/B testing variations (e.g. <code>blue-cta-btn</code> vs <code>green-cta-btn</code>) or distinguishing header links from footer links in an email.</p>
        </div>
      </section>
    `
  },
  {
    slug: 'utm-source-guide',
    title: 'What Is utm_source? Naming Standards, Taxonomy & Common Mistakes',
    seoTitle: 'What Is utm_source? Standards & GA4 Best Practices | UTMCraft',
    description: 'Learn what utm_source is, how Google Analytics 4 uses it to determine traffic origin, approved naming conventions, and common mistakes that split reporting.',
    category: 'utm-parameters',
    isPillar: false,
    author: {
      name: 'DJ',
      role: 'Attribution & Analytics Architect',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-02-04',
    dateModified: '2026-09-23',
    reviewedDate: 'September 23, 2026',
    readingTime: '7 min read',
    primaryKeyword: 'utm_source',
    secondaryKeywords: ['what is utm_source', 'utm source examples', 'utm_source naming conventions', 'ga4 utm_source'],
    semanticKeywords: ['traffic source', 'session source', 'referrer origin', 'source medium taxonomy'],
    relatedEntities: ['Google Analytics 4', 'UTM Parameters', 'Traffic Acquisition', 'Web Analytics'],
    searchIntent: 'Definitional & Practical Guide',
    featuredImage: '/blog/images/utm-source-guide.webp',
    featuredImageAlt: 'Diagram showing how utm_source values map directly to traffic origin platforms in GA4 acquisition reports',
    tableOfContents: [
      { id: 'what-is-utm-source', title: 'What Is utm_source?', level: 2 },
      { id: 'approved-values-by-channel', title: 'Approved utm_source Values by Platform', level: 2 },
      { id: 'source-vs-medium-difference', title: 'The Difference Between Source and Medium', level: 2 },
      { id: 'common-mistakes', title: 'Common utm_source Mistakes That Break GA4', level: 2 }
    ],
    toolCta: {
      title: 'Build With Valid Source Presets',
      description: 'Select verified, GA4-compliant sources from our pre-configured channel dropdowns.',
      link: '/',
      buttonText: 'Use Campaign URL Builder'
    },
    relatedSlugs: ['ga4-utm-parameters-guide', 'utm-medium-guide', 'utm-campaign-guide', 'ga4-unassigned-traffic'],
    references: [
      { title: 'GA4 Traffic Source Dimensions', url: 'https://support.google.com/analytics/answer/9355604', publisher: 'Google Analytics Help' }
    ],
    contentHtml: `
      <p class="lead-text"><code>utm_source</code> is the foundational parameter in web attribution. It answers a single, direct question: <strong>Which specific platform, publisher, or partner sent this visitor to your website?</strong></p>

      <h2 id="what-is-utm-source">What Is utm_source?</h2>
      <p>In Google Analytics 4, <code>utm_source</code> populates the <em>Session source</em> and <em>First user source</em> dimensions. It is technically mandatory for manual campaign tracking: if you omit <code>utm_source</code> from a link that includes <code>utm_medium</code> or <code>utm_campaign</code>, GA4 cannot determine the traffic origin and will frequently categorize the visit as <code>(direct)</code> or <code>(not set)</code>.</p>

      <h2 id="approved-values-by-channel">Approved utm_source Values by Platform</h2>
      <p>To prevent fragmented reporting rows, enforce consistent, all-lowercase platform names:</p>
      
      <div class="editorial-table-wrap">
        <table class="editorial-table">
          <thead>
            <tr>
              <th>Marketing Channel</th>
              <th>Approved utm_source Value</th>
              <th>Forbidden Variations (Will Split Reports)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Google Ads / Search</td>
              <td><code>google</code></td>
              <td><code>Google</code>, <code>googleads</code>, <code>adwords</code></td>
            </tr>
            <tr>
              <td>Meta (Facebook &amp; Instagram)</td>
              <td><code>facebook</code>, <code>instagram</code>, or <code>meta</code></td>
              <td><code>FB</code>, <code>Facebook_Ads</code>, <code>ig</code></td>
            </tr>
            <tr>
              <td>LinkedIn Ads / Organic</td>
              <td><code>linkedin</code></td>
              <td><code>LinkedIn</code>, <code>lnkd</code>, <code>li</code></td>
            </tr>
            <tr>
              <td>X (Twitter)</td>
              <td><code>x</code> or <code>twitter</code></td>
              <td><code>Twitter</code>, <code>tweet</code>, <code>x.com</code></td>
            </tr>
            <tr>
              <td>Email Marketing</td>
              <td><code>newsletter</code>, <code>klaviyo</code>, <code>hubspot</code></td>
              <td><code>email</code> (this is a medium, not a source!)</td>
            </tr>
            <tr>
              <td>Affiliates / Partners</td>
              <td><code>[partner_name]</code> (e.g. <code>wirecutter</code>)</td>
              <td><code>affiliate</code> (this is a medium!)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="source-vs-medium-difference">The Difference Between Source and Medium</h2>
      <div class="callout callout-recommended">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <strong>The Mental Model</strong>
        </div>
        <p><strong>Source = The WHO</strong> (The specific publisher: <code>google</code>, <code>facebook</code>, <code>substack</code>).
        <br><strong>Medium = The HOW</strong> (The transmission channel type: <code>cpc</code>, <code>paid_social</code>, <code>email</code>).</p>
      </div>

      <h2 id="common-mistakes">Common utm_source Mistakes That Break GA4</h2>
      <div class="callout callout-mistake">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          <strong>Putting "email" as utm_source</strong>
        </div>
        <p>A very common tracking error is setting <code>utm_source=email&amp;utm_medium=email</code> or <code>utm_source=email&amp;utm_medium=newsletter</code>. <em>Email</em> is the vehicle (medium), not the source. Your source should be the specific publication or platform sending the message, such as <code>newsletter_weekly</code>, <code>product_updates</code>, or <code>klaviyo</code>.</p>
      </div>
    `
  },
  {
    slug: 'utm-medium-guide',
    title: 'What Is utm_medium? GA4 Default Channel Grouping Rules & Standards',
    seoTitle: 'What Is utm_medium? GA4 Channel Grouping Rules | UTMCraft',
    description: 'Understand utm_medium and how GA4 uses it to classify sessions into Default Channel Groups. Avoid Unassigned traffic with exact medium naming rules.',
    category: 'utm-parameters',
    isPillar: false,
    author: {
      name: 'DJ',
      role: 'Attribution & Analytics Architect',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-02-08',
    dateModified: '2026-09-23',
    reviewedDate: 'September 23, 2026',
    readingTime: '8 min read',
    primaryKeyword: 'utm_medium',
    secondaryKeywords: ['what is utm_medium', 'ga4 default channel grouping utm_medium', 'utm medium examples', 'utm_medium rules'],
    semanticKeywords: ['paid social medium', 'cpc medium', 'unassigned traffic fix', 'channel grouping regex'],
    relatedEntities: ['Google Analytics 4', 'Default Channel Grouping', 'Campaign Medium', 'Attribution Rules'],
    searchIntent: 'How-to & Channel Grouping Reference',
    featuredImage: '/blog/images/utm-medium-guide.webp',
    featuredImageAlt: 'Decision tree illustrating how GA4 routes various utm_medium strings into Default Channel Groups',
    tableOfContents: [
      { id: 'what-is-utm-medium', title: 'What Is utm_medium?', level: 2 },
      { id: 'ga4-channel-rules-matrix', title: 'The GA4 Default Channel Grouping Matrix for utm_medium', level: 2 },
      { id: 'paid-social-controversy', title: 'The Paid Social Dilemma: paid_social vs cpc', level: 2 },
      { id: 'preventing-unassigned', title: 'How Rogue Mediums Create "Unassigned" Traffic', level: 2 }
    ],
    toolCta: {
      title: 'Inspect Mediums Against GA4 Rules',
      description: 'Audit your links to guarantee that utm_medium maps strictly to GA4 Default Channels without landing in Unassigned.',
      link: '/utm-checker/',
      buttonText: 'Audit URL with UTM Checker'
    },
    relatedSlugs: ['ga4-utm-parameters-guide', 'utm-source-guide', 'ga4-unassigned-traffic', 'utm-strategy-guide'],
    references: [
      { title: 'Default Channel Grouping Definitions in GA4', url: 'https://support.google.com/analytics/answer/9756891', publisher: 'Google Analytics Help' }
    ],
    contentHtml: `
      <p class="lead-text"><code>utm_medium</code> is the single most critical parameter for your executive dashboards. While <code>utm_source</code> identifies where a click came from, <code>utm_medium</code> dictates how Google Analytics 4 classifies your marketing spend into high-level <strong>Default Channel Groups</strong> (Paid Search, Paid Social, Email, Affiliates).</p>

      <h2 id="what-is-utm-medium">What Is utm_medium?</h2>
      <p>In GA4, <code>utm_medium</code> populates the <em>Session medium</em> and <em>First user medium</em> dimensions. Unlike <code>utm_campaign</code>, which can be custom-tailored to your company's product hierarchy, <strong>utm_medium must adhere strictly to Google's predefined channel grouping logic</strong>. If your medium fails Google's regex rules, GA4 will categorially label the visit as "Unassigned".</p>

      <h2 id="ga4-channel-rules-matrix">The GA4 Default Channel Grouping Matrix for utm_medium</h2>
      <p>The table below summarizes the exact <code>utm_medium</code> strings required by GA4 to place sessions into their rightful channels:</p>

      <div class="editorial-table-wrap">
        <table class="editorial-table">
          <thead>
            <tr>
              <th>Target GA4 Channel Group</th>
              <th>Required / Accepted utm_medium Values</th>
              <th>Additional GA4 Requirement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Paid Search</strong></td>
              <td><code>cpc</code>, <code>ppc</code>, <code>paidsearch</code></td>
              <td>Source must match a recognized search site list (e.g. google, bing, yahoo).</td>
            </tr>
            <tr>
              <td><strong>Paid Social</strong></td>
              <td><code>paid_social</code>, <code>paidsocial</code>, <code>paid-social</code>, <code>cpc</code>, <code>ppc</code></td>
              <td>Source must match Google's predefined social site list (meta, facebook, linkedin, etc.).</td>
            </tr>
            <tr>
              <td><strong>Organic Social</strong></td>
              <td><code>social</code>, <code>social-network</code>, <code>social-media</code>, <code>sm</code></td>
              <td>Or source matches Google's social list and medium is empty/referral.</td>
            </tr>
            <tr>
              <td><strong>Email</strong></td>
              <td><code>email</code>, <code>e-mail</code>, <code>e_mail</code>, <code>newsletter</code></td>
              <td>Source is optional (any source will classify under Email).</td>
            </tr>
            <tr>
              <td><strong>Affiliates</strong></td>
              <td><code>affiliate</code>, <code>affiliates</code></td>
              <td>Direct match to medium string.</td>
            </tr>
            <tr>
              <td><strong>Display</strong></td>
              <td><code>display</code>, <code>banner</code>, <code>cpm</code>, <code>expandable</code></td>
              <td>Must not match Paid Social or Paid Search sources.</td>
            </tr>
            <tr>
              <td><strong>Paid Other</strong></td>
              <td><code>cp</code>, <code>cpa</code>, <code>cpp</code></td>
              <td>Catch-all for paid campaigns that don't match Search/Social/Display.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="paid-social-controversy">The Paid Social Dilemma: paid_social vs cpc</h2>
      <p>Many media buyers who manage both Google Ads and Meta Ads default to tagging Meta links with <code>utm_medium=cpc</code>. While GA4 will technically map <code>facebook / cpc</code> into "Paid Social" because Facebook is on Google's recognized social sites list, using <code>cpc</code> on social platforms creates reporting confusion:</p>
      
      <div class="callout callout-recommended">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <strong>Best Practice: Reserve cpc for Paid Search Only</strong>
        </div>
        <p>Set <code>utm_medium=cpc</code> exclusively for Search Engine Marketing (Google Ads, Microsoft Ads). For Facebook, Instagram, LinkedIn, TikTok, and Pinterest paid ads, always enforce <code>utm_medium=paid_social</code>. This keeps your SQL queries and BI dashboards clean and unambiguous.</p>
      </div>

      <h2 id="preventing-unassigned">How Rogue Mediums Create "Unassigned" Traffic</h2>
      <p>If a marketer invents a creative medium such as <code>utm_medium=influencer-collab</code> or <code>utm_medium=podcast_sponsor</code>, GA4 evaluates the rules top-to-bottom, finds zero matching rules, and buckets the traffic into <strong>Unassigned</strong>. Always stick to standard mediums or create Custom Channel Groupings in GA4 Admin before launching non-standard tags.</p>
    `
  },
  {
    slug: 'utm-campaign-guide',
    title: 'What Is utm_campaign? Campaign Naming Frameworks, IDs & Taxonomy',
    seoTitle: 'What Is utm_campaign? Frameworks, IDs & Taxonomy | UTMCraft',
    description: 'Learn how to structure utm_campaign for clear GA4 reporting. Discover formula frameworks, campaign IDs (utm_id), delimiter best practices, and real examples.',
    category: 'utm-parameters',
    isPillar: false,
    author: {
      name: 'DJ',
      role: 'Attribution & Analytics Architect',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-02-15',
    dateModified: '2026-09-23',
    reviewedDate: 'September 23, 2026',
    readingTime: '8 min read',
    primaryKeyword: 'utm_campaign',
    secondaryKeywords: ['what is utm_campaign', 'utm campaign naming examples', 'utm_id vs utm_campaign', 'campaign taxonomy framework'],
    semanticKeywords: ['session campaign', 'manual campaign dimension', 'campaign delimiter', 'bigquery campaign parsing'],
    relatedEntities: ['Google Analytics 4', 'Campaign Measurement', 'Data Modeling', 'Performance Marketing'],
    searchIntent: 'How-to & Architectural Guide',
    featuredImage: '/blog/images/utm-campaign-guide.webp',
    featuredImageAlt: 'Taxonomy block diagram illustrating the structured tokens that compose an enterprise utm_campaign string',
    tableOfContents: [
      { id: 'what-is-utm-campaign', title: 'What Is utm_campaign?', level: 2 },
      { id: 'the-anatomy-of-campaign-name', title: 'The Anatomy of an Enterprise Campaign Name', level: 2 },
      { id: 'utm-campaign-vs-utm-id', title: 'utm_campaign vs utm_id: Why You Need Both', level: 2 },
      { id: 'multi-channel-examples', title: 'Production Campaign Examples Across Channels', level: 2 }
    ],
    toolCta: {
      title: 'Standardize Your Campaign Names',
      description: 'Use our standardized formula builder to generate consistent, structured utm_campaign parameters across your entire team.',
      link: '/utm-naming-conventions/',
      buttonText: 'Build Standardized Campaign Names'
    },
    relatedSlugs: ['ga4-utm-parameters-guide', 'utm-strategy-guide', 'utm-naming-conventions-guide', 'bulk-utm-workflow'],
    references: [
      { title: 'Cost Data Import in GA4 via utm_id', url: 'https://support.google.com/analytics/answer/10071301', publisher: 'Google Analytics Help' }
    ],
    contentHtml: `
      <p class="lead-text"><code>utm_campaign</code> is the primary grouping dimension for all your promotional initiatives. It tells your analytics suite which specific promotion, product launch, seasonal sale, or strategic initiative prompted a user's visit.</p>

      <h2 id="what-is-utm-campaign">What Is utm_campaign?</h2>
      <p>In Google Analytics 4, <code>utm_campaign</code> populates the <em>Session campaign</em>, <em>First user campaign</em>, and <em>Manual campaign</em> dimensions. Unlike <code>utm_medium</code> (which must follow rigid Google definitions), <code>utm_campaign</code> provides complete creative freedom. However, unconstrained freedom without a documented taxonomy quickly leads to chaos.</p>

      <h2 id="the-anatomy-of-campaign-name">The Anatomy of an Enterprise Campaign Name</h2>
      <p>To avoid useless names like <code>summer-promo-final-v2</code>, structure your campaign parameter using a standardized token formula separated by underscores:</p>

      <div class="code-block-wrap">
        <pre><code>[target-market]_[product-line]_[objective-type]_[flight-identifier]

Example:
utm_campaign=us_enterprise-suite_demo-funnel_2026-q1</code></pre>
        <button class="copy-code-btn" data-copy="utm_campaign=us_enterprise-suite_demo-funnel_2026-q1" aria-label="Copy campaign formula">Copy</button>
      </div>

      <h2 id="utm-campaign-vs-utm-id">utm_campaign vs utm_id: Why You Need Both</h2>
      <p>Many marketers ignore <code>utm_id</code>, assuming that <code>utm_campaign</code> is sufficient. However, in GA4, <strong>utm_id is essential for cost data import</strong>:</p>
      <ul>
        <li><strong>utm_campaign:</strong> Provides human-readable reporting in standard GA4 dashboards and BigQuery queries.</li>
        <li><strong>utm_id:</strong> Acts as the primary foreign key that links non-Google ad spend (Meta, LinkedIn, TikTok) uploaded via CSV into GA4 with tracked sessions and conversions.</li>
      </ul>

      <div class="callout callout-recommended">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <strong>Automating utm_id with Dynamic Macros</strong>
        </div>
        <p>In Google Ads, set <code>utm_id={campaignid}</code>. In Meta Ads, set <code>utm_id={{campaign.id}}</code>. In LinkedIn Ads, set <code>utm_id={{CAMPAIGN_ID}}</code>. This ensures the numerical ID generated by the ad platform matches your cost upload files exactly.</p>
      </div>

      <h2 id="multi-channel-examples">Production Campaign Examples Across Channels</h2>
      <div class="code-block-wrap">
        <pre><code>Google Search:
utm_campaign=na_core-brand_exact_2026&amp;utm_id={campaignid}

Meta Ads Prospecting:
utm_campaign=eu_pro-plan_lookalike-trial_2026q2&amp;utm_id={{campaign.id}}

Weekly Product Newsletter:
utm_campaign=global_community_changelog-v42_2026-03</code></pre>
        <button class="copy-code-btn" data-copy="utm_campaign=us_enterprise-suite_demo-funnel_2026-q1" aria-label="Copy example">Copy</button>
      </div>
    `
  }
];
