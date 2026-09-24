export const linkedinAdsPosts = [
  {
    slug: 'linkedin-ads-utm-guide',
    title: 'LinkedIn Ads UTM Tracking Guide: Dynamic Tokens, B2B Attribution & Campaign Setup',
    seoTitle: 'LinkedIn Ads UTM Tracking Guide: Dynamic Parameters | UTMCraft',
    description: 'Complete guide to LinkedIn Ads UTM tracking. Configure dynamic URL parameters (CAMPAIGN_ID, AD_SET_ID, AD_ID), B2B hierarchy, and GA4 Paid Social reporting.',
    category: 'linkedin-ads',
    isPillar: true,
    author: {
      name: 'DJ',
      role: 'Attribution & Analytics Architect',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-02-09',
    dateModified: '2026-09-23',
    reviewedDate: 'September 23, 2026',
    readingTime: '12 min read',
    primaryKeyword: 'linkedin ads utm tracking',
    secondaryKeywords: ['linkedin dynamic tracking parameters', 'linkedin campaign manager utm', 'linkedin ads url parameters', 'b2b campaign attribution'],
    semanticKeywords: ['CAMPAIGN_ID token', 'AD_SET_ID token', 'sponsored content tracking', 'linkedin ga4 paid social'],
    relatedEntities: ['LinkedIn Campaign Manager', 'LinkedIn Ads', 'B2B Attribution', 'Google Analytics 4'],
    searchIntent: 'Technical Implementation & B2B Pillar Guide',
    featuredImage: '/blog/images/linkedin-ads-utm-guide.webp',
    featuredImageAlt: 'Architectural breakdown of LinkedIn Campaign Manager dynamic hierarchy mapping into GA4 and B2B CRMs',
    tableOfContents: [
      { id: 'linkedin-dynamic-revolution', title: 'LinkedIn Dynamic Tracking: Moving Beyond Manual Links', level: 2 },
      { id: 'linkedin-dynamic-tokens-table', title: 'Supported Dynamic Parameters Reference Table', level: 2 },
      { id: 'standard-linkedin-utm-string', title: 'The Production LinkedIn UTM Parameter String', level: 2 },
      { id: 'sponsored-content-vs-lead-gen', title: 'Sponsored Content vs Lead Gen Forms Tracking', level: 2 },
      { id: 'case-sensitivity-linkedin-syntax', title: 'Syntax Alert: Uppercase Inside Double Braces', level: 2 },
      { id: 'b2b-crm-attribution-pipeline', title: 'Passing LinkedIn Attribution into HubSpot and Salesforce', level: 2 },
      { id: 'faq', title: 'Frequently Asked Questions', level: 2 }
    ],
    toolCta: {
      title: 'Generate LinkedIn Dynamic UTM URLs',
      description: 'Create standardized tracking links using LinkedIn dynamic tokens for Campaign, Ad Set, and Ad levels automatically.',
      link: '/utm-builder/linkedin/',
      buttonText: 'Open LinkedIn UTM Builder'
    },
    relatedSlugs: ['linkedin-ads-utm-tracking', 'linkedin-dynamic-parameters', 'storing-utm-parameters-in-crm', 'ga4-unassigned-traffic'],
    references: [
      { title: 'URL tracking parameters in Campaign Manager', url: 'https://www.linkedin.com/help/lms/answer/a5968064', publisher: 'LinkedIn Help Center' },
      { title: 'URL tracking parameters in Campaign Manager', url: 'https://www.linkedin.com/help/lms/answer/a5968064', publisher: 'LinkedIn Help Center' }
    ],
    contentHtml: `
      <p class="lead-text">Historically, LinkedIn Campaign Manager lacked native dynamic tracking macros, forcing B2B marketers to manually append parameters to every ad link. Today, LinkedIn natively supports dynamic URL tracking parameters across its campaign hierarchy. This guide covers how to implement dynamic LinkedIn tracking to fuel clean GA4 reporting and pipeline attribution in your CRM.</p>

      <h2 id="linkedin-dynamic-revolution">LinkedIn Dynamic Tracking: Moving Beyond Manual Links</h2>
      <p>LinkedIn's dynamic parameter feature enables Campaign Manager to automatically populate campaign names, campaign IDs, ad set details, and ad creative identifiers at the exact moment a prospect clicks an ad. This eliminates the risk of human copy-paste errors and ensures your B2B attribution remains structured across quarters.</p>

      <h2 id="linkedin-dynamic-tokens-table">Supported Dynamic Parameters Reference Table</h2>
      <p>LinkedIn supports dynamic macros that resolve at click time. Note that unlike Meta's lowercase syntax, <strong>LinkedIn requires uppercase tokens inside double curly braces</strong>:</p>

      <div class="editorial-table-wrap">
        <table class="editorial-table">
          <thead>
            <tr>
              <th>LinkedIn Dynamic Macro</th>
              <th>Dynamic Output at Click Time</th>
              <th>Recommended UTM Mapping</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>{{CAMPAIGN_ID}}</code></td>
              <td>Unique numerical identifier of the campaign</td>
              <td><code>utm_id={{CAMPAIGN_ID}}</code></td>
            </tr>
            <tr>
              <td><code>{{CAMPAIGN_NAME}}</code></td>
              <td>Name of the campaign in Campaign Manager</td>
              <td><code>utm_campaign={{CAMPAIGN_NAME}}</code></td>
            </tr>
            <tr>
              <td><code>{{AD_SET_ID}}</code></td>
              <td>Unique numerical ID of the ad set</td>
              <td>Custom parameter: <code>adset_id={{AD_SET_ID}}</code></td>
            </tr>
            <tr>
              <td><code>{{AD_SET_NAME}}</code></td>
              <td>Name of the ad set / audience group</td>
              <td><code>utm_term={{AD_SET_NAME}}</code></td>
            </tr>
            <tr>
              <td><code>{{AD_ID}}</code></td>
              <td>Unique numerical ID of the creative</td>
              <td>Custom parameter: <code>ad_id={{AD_ID}}</code></td>
            </tr>
            <tr>
              <td><code>{{AD_NAME}}</code></td>
              <td>Name of the specific ad creative</td>
              <td><code>utm_content={{AD_NAME}}</code></td>
            </tr>
            <tr>
              <td><code>{{ACCOUNT_ID}}</code></td>
              <td>LinkedIn Ad Account numerical ID</td>
              <td>Custom parameter: <code>li_account={{ACCOUNT_ID}}</code></td>
            </tr>
            <tr>
              <td><code>{{ACCOUNT_NAME}}</code></td>
              <td>Name of the LinkedIn Ad Account</td>
              <td>Custom parameter: <code>li_account_name={{ACCOUNT_NAME}}</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="standard-linkedin-utm-string">The Production LinkedIn UTM Parameter String</h2>
      <p>In LinkedIn Campaign Manager, when creating or editing an ad, configure your landing page URL parameters as follows:</p>

      <div class="callout callout-recommended">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <strong>Enterprise LinkedIn URL Parameter Template</strong>
        </div>
        <div class="code-block-wrap">
          <pre><code>utm_source=linkedin&amp;utm_medium=paid_social&amp;utm_campaign={{CAMPAIGN_NAME}}&amp;utm_content={{AD_NAME}}&amp;utm_term={{AD_SET_NAME}}&amp;utm_id={{CAMPAIGN_ID}}</code></pre>
          <button class="copy-code-btn" data-copy="utm_source=linkedin&utm_medium=paid_social&utm_campaign={{CAMPAIGN_NAME}}&utm_content={{AD_NAME}}&utm_term={{AD_SET_NAME}}&utm_id={{CAMPAIGN_ID}}" aria-label="Copy LinkedIn String">Copy LinkedIn String</button>
        </div>
      </div>

      <h2 id="sponsored-content-vs-lead-gen">Sponsored Content vs Lead Gen Forms Tracking</h2>
      <p>LinkedIn offers two primary ad conversion mechanisms with distinct tracking considerations:</p>
      <ul>
        <li><strong>Sponsored Content (Traffic to Website):</strong> Prospects click through to your landing page. The dynamic UTM parameters append to the URL and fire directly in GA4 and your CRM form capture scripts.</li>
        <li><strong>LinkedIn Lead Gen Forms:</strong> Prospects fill out an instant form inside the LinkedIn mobile app without visiting your website. Here, UTM parameters do not pass to GA4 via the browser. Instead, integrate LinkedIn Lead Gen Forms directly with HubSpot or Salesforce via Zapier, Make, or native CRM integrations, mapping <code>{{CAMPAIGN_NAME}}</code> and <code>{{CAMPAIGN_ID}}</code> directly to CRM lead properties.</li>
      </ul>

      <h2 id="case-sensitivity-linkedin-syntax">Syntax Alert: Uppercase Inside Double Braces</h2>
      <div class="callout callout-warning">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <strong>Strict Uppercase Requirement</strong>
        </div>
        <p>LinkedIn requires tokens to be <strong>uppercase</strong>: <code>{{CAMPAIGN_NAME}}</code>. If you write <code>{{campaign_name}}</code> or <code>{{campaign.name}}</code>, LinkedIn will not recognize the token and will pass the literal unexpanded text into your landing page URL.</p>
      </div>

      <h2 id="b2b-crm-attribution-pipeline">Passing LinkedIn Attribution into HubSpot and Salesforce</h2>
      <p>Because LinkedIn traffic carries high B2B intent with expensive cost-per-click ($8 to $25+ CPC), capturing attribution at the deal level is vital. Configure hidden form fields on your website to capture <code>utm_source</code>, <code>utm_campaign</code>, and <code>utm_id</code>. When a prospect requests a demo, these parameters flow into HubSpot/Salesforce, allowing RevOps to calculate pipeline and closed-won revenue generated by specific LinkedIn campaigns.</p>

      <section class="article-faq-section">
        <h2 id="faq">Frequently Asked Questions</h2>
        <div class="faq-item">
          <h3>Does LinkedIn Campaign Manager support dynamic URL parameters?</h3>
          <p>Yes. LinkedIn natively supports dynamic tracking macros across its hierarchy, including <code>{{CAMPAIGN_NAME}}</code>, <code>{{CAMPAIGN_ID}}</code>, <code>{{AD_SET_NAME}}</code>, <code>{{AD_SET_ID}}</code>, <code>{{AD_NAME}}</code>, and <code>{{AD_ID}}</code>. Note that LinkedIn strictly requires these tokens to be enclosed in double curly braces and written in <strong>uppercase</strong>.</p>
        </div>
        <div class="faq-item">
          <h3>What source and medium should I use for LinkedIn Sponsored Content?</h3>
          <p>Always use <code>utm_source=linkedin</code> and <code>utm_medium=paid_social</code> (or <code>cpc</code>). This ensures Google Analytics 4 automatically buckets your visits under the <strong>Paid Social</strong> default channel group.</p>
        </div>
        <div class="faq-item">
          <h3>Why does LinkedIn traffic sometimes appear as referral in GA4?</h3>
          <p>If you launch ads without appending UTM parameters to the destination URL, GA4 reads the incoming HTTP referrer header (e.g. <code>linkedin.com</code>) and categorizes the visits under <strong>Organic Social</strong> or generic <strong>Referral</strong>, completely obscuring paid ad performance.</p>
        </div>
        <div class="faq-item">
          <h3>How do I track LinkedIn Lead Gen Form submissions with UTMs?</h3>
          <p>Because Lead Gen Forms are hosted inside LinkedIn's mobile app, users never navigate to your website. To capture campaign attribution, connect LinkedIn Lead Gen Forms to HubSpot, Salesforce, or Marketo using LinkedIn's native CRM partner integration or webhooks, mapping campaign tokens directly to CRM lead properties.</p>
        </div>
      </section>
    `
  },
  {
    slug: 'linkedin-ads-utm-tracking',
    title: 'LinkedIn Ads UTM Tracking: B2B Attribution & Hierarchy Setup Guide',
    seoTitle: 'LinkedIn Ads UTM Tracking: Setup & Hierarchy Guide | UTMCraft',
    description: 'Learn how to configure LinkedIn Ads UTM tracking across Campaign Groups, Campaigns, and Ads. Best practices for GA4 Paid Social channel mapping.',
    category: 'linkedin-ads',
    isPillar: false,
    author: {
      name: 'DJ',
      role: 'Attribution & Analytics Architect',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-02-23',
    dateModified: '2026-09-23',
    reviewedDate: 'September 23, 2026',
    readingTime: '8 min read',
    primaryKeyword: 'linkedin ads utm tracking',
    secondaryKeywords: ['b2b utm tracking linkedin', 'linkedin campaign hierarchy utm', 'linkedin ads ga4 setup', 'track linkedin sponsored content'],
    semanticKeywords: ['campaign group hierarchy', 'account based marketing tracking', 'paid_social linkedin', 'lead gen forms utm'],
    relatedEntities: ['LinkedIn Ads', 'B2B Marketing', 'Google Analytics 4', 'Lead Generation'],
    searchIntent: 'Implementation & Best Practices Guide',
    featuredImage: '/blog/images/linkedin-ads-utm-tracking.webp',
    featuredImageAlt: 'Diagram showing how LinkedIn campaign hierarchy maps into GA4 traffic acquisition reports',
    tableOfContents: [
      { id: 'linkedin-hierarchy-explained', title: 'Understanding the LinkedIn Campaign Hierarchy', level: 2 },
      { id: 'source-medium-conventions', title: 'Source & Medium Standards for LinkedIn', level: 2 },
      { id: 'step-by-step-campaign-setup', title: 'Step-by-Step Setup in Campaign Manager', level: 2 },
      { id: 'troubleshooting-linkedin-in-ga4', title: 'Troubleshooting LinkedIn Traffic in GA4', level: 2 }
    ],
    toolCta: {
      title: 'Build LinkedIn Tracking Links',
      description: 'Generate verified LinkedIn campaign tracking URLs with proper case sensitivity and dynamic tokens.',
      link: '/utm-builder/linkedin/',
      buttonText: 'Open LinkedIn Builder'
    },
    relatedSlugs: ['linkedin-ads-utm-guide', 'linkedin-dynamic-parameters', 'ga4-unassigned-traffic'],
    references: [
      { title: 'URL tracking parameters in Campaign Manager', url: 'https://www.linkedin.com/help/lms/answer/a5968064', publisher: 'LinkedIn Help Center' }
    ],
    contentHtml: `
      <p class="lead-text">Tracking LinkedIn Ads in Google Analytics 4 requires a clear understanding of LinkedIn's multi-tier account hierarchy and strict adherence to GA4 Paid Social channel rules. Here is how to configure your campaigns for seamless B2B attribution.</p>

      <h2 id="linkedin-hierarchy-explained">Understanding the LinkedIn Campaign Hierarchy</h2>
      <p>LinkedIn organizes ad buying across three primary tiers:</p>
      <ul>
        <li><strong>Campaign Group:</strong> High-level strategic initiative or objective (e.g. <em>2026 Enterprise Pipeline</em>).</li>
        <li><strong>Campaign (Ad Set):</strong> Defines audience targeting (job titles, industries, company size), bidding, and budget.</li>
        <li><strong>Ad:</strong> The creative asset (Single Image, Video, Carousel, Document Ad, Thought Leader Ad).</li>
      </ul>

      <h2 id="source-medium-conventions">Source & Medium Standards for LinkedIn</h2>
      <p>To ensure GA4 properly groups your sessions under <strong>Paid Social</strong>, enforce:</p>
      <ul>
        <li><code>utm_source=linkedin</code> (all lowercase).</li>
        <li><code>utm_medium=paid_social</code>. (Avoid <code>cpc</code> or <code>sponsored</code>).</li>
      </ul>

      <h2 id="step-by-step-campaign-setup">Step-by-Step Setup in Campaign Manager</h2>
      <ol>
        <li>Create or edit your Sponsored Content ad in Campaign Manager.</li>
        <li>In the <strong>Destination URL</strong> field, enter your clean landing page URL.</li>
        <li>Append your dynamic parameters:
          <div class="code-block-wrap">
            <pre><code>?utm_source=linkedin&amp;utm_medium=paid_social&amp;utm_campaign={{CAMPAIGN_NAME}}&amp;utm_content={{AD_NAME}}&amp;utm_term={{AD_SET_NAME}}&amp;utm_id={{CAMPAIGN_ID}}</code></pre>
          </div>
        </li>
        <li>Save and launch the ad.</li>
      </ol>

      <h2 id="troubleshooting-linkedin-in-ga4">Troubleshooting LinkedIn Traffic in GA4</h2>
      <p>If LinkedIn traffic appears under "Referral" (<code>lnkd.in / referral</code>), it means UTM parameters were missing or stripped by a redirect, causing GA4 to fall back to the LinkedIn link-wrapper referrer. Enforce direct landing URLs with exact trailing slashes to preserve query parameters.</p>
    `
  },
  {
    slug: 'linkedin-dynamic-parameters',
    title: 'LinkedIn Dynamic URL Parameters: Token Syntax & QA Guide',
    seoTitle: 'LinkedIn Dynamic URL Parameters: Syntax & QA | UTMCraft',
    description: 'Use LinkedIn Campaign Manager URL tokens correctly. Check uppercase syntax, map dynamic values to UTM fields, and verify expansion before launch.',
    category: 'linkedin-ads',
    isPillar: false,
    author: {
      name: 'DJ',
      role: 'Attribution & Analytics Architect',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-03-03',
    dateModified: '2026-09-23',
    reviewedDate: 'September 23, 2026',
    readingTime: '8 min read',
    primaryKeyword: 'linkedin dynamic url parameters syntax',
    secondaryKeywords: ['linkedin campaign_id parameter', 'linkedin ad_id dynamic token', 'linkedin url parameters macros', 'dynamic tracking linkedin ads'],
    semanticKeywords: ['uppercase double braces syntax', 'ad set id linkedin', 'b2b crm attribution', 'campaign manager dynamic tokens'],
    relatedEntities: ['LinkedIn Campaign Manager', 'Dynamic Tracking', 'B2B Attribution', 'Google Analytics 4'],
    searchIntent: 'Technical Reference & Syntax Guide',
    featuredImage: '/blog/images/linkedin-dynamic-parameters.webp',
    featuredImageAlt: 'Technical diagram showing LinkedIn dynamic tokens expanding upon ad click into CRM lead records',
    tableOfContents: [
      { id: 'complete-token-list', title: 'Complete List of LinkedIn Dynamic Tracking Tokens', level: 2 },
      { id: 'syntax-rules', title: 'Critical Syntax Rules: Case and Braces', level: 2 },
      { id: 'mapping-to-crm-fields', title: 'Mapping Dynamic Parameters to CRM Lead Properties', level: 2 },
      { id: 'qa-and-verification', title: 'How to QA LinkedIn Dynamic Links Before Publishing', level: 2 }
    ],
    toolCta: {
      title: 'Generate LinkedIn Dynamic Links',
      description: 'Build error-free LinkedIn dynamic parameter URLs configured with exact uppercase double-bracket syntax.',
      link: '/utm-builder/linkedin/',
      buttonText: 'Open LinkedIn Builder'
    },
    relatedSlugs: ['linkedin-ads-utm-guide', 'linkedin-ads-utm-tracking', 'meta-dynamic-url-parameters'],
    references: [
      { title: 'URL tracking parameters in Campaign Manager', url: 'https://www.linkedin.com/help/lms/answer/a5968064', publisher: 'LinkedIn Help Center' }
    ],
    contentHtml: `
      <p class="lead-text">LinkedIn's dynamic URL parameters allow B2B performance marketers to scale ad creative testing without manually tagging every single ad link. Understanding the exact syntax requirements ensures that your parameters expand reliably at click time.</p>

      <h2 id="complete-token-list">Complete List of LinkedIn Dynamic Tracking Tokens</h2>
      <p>LinkedIn Campaign Manager supports the following dynamic tokens:</p>
      <ul>
        <li><code>{{CAMPAIGN_ID}}</code> - The unique numerical ID for the campaign.</li>
        <li><code>{{CAMPAIGN_NAME}}</code> - The campaign name as set in Campaign Manager.</li>
        <li><code>{{AD_SET_ID}}</code> - The unique numerical ID for the ad set.</li>
        <li><code>{{AD_SET_NAME}}</code> - The ad set name.</li>
        <li><code>{{AD_ID}}</code> - The unique numerical ID for the ad creative.</li>
        <li><code>{{AD_NAME}}</code> - The ad creative name.</li>
        <li><code>{{ACCOUNT_ID}}</code> - The numerical ID of the ad account.</li>
        <li><code>{{ACCOUNT_NAME}}</code> - The name of the ad account.</li>
      </ul>

      <h2 id="syntax-rules">Critical Syntax Rules: Case and Braces</h2>
      <div class="callout callout-warning">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <strong>Must Be Uppercase Inside Double Braces</strong>
        </div>
        <p>Never lowercase LinkedIn tokens. While Meta uses <code>{{campaign.name}}</code>, LinkedIn requires <code>{{CAMPAIGN_NAME}}</code>. If you use lowercase, LinkedIn treats it as ordinary text and will literally pass <code>{{campaign_name}}</code> into the browser address bar.</p>
      </div>

      <h2 id="mapping-to-crm-fields">Mapping Dynamic Parameters to CRM Lead Properties</h2>
      <p>In B2B lead generation, pass these parameters into hidden form inputs:</p>
      <ul>
        <li><code>utm_campaign</code> maps to <em>First Touch Campaign Name</em>.</li>
        <li><code>utm_id</code> maps to <em>First Touch Campaign ID</em>.</li>
        <li><code>utm_content</code> maps to <em>First Touch Ad Creative</em>.</li>
        <li><code>utm_term</code> maps to <em>First Touch Audience / Ad Set</em>.</li>
      </ul>
      <p>This allows your RevOps team to run closed-won revenue reports in Salesforce or HubSpot by specific LinkedIn audience segment.</p>

      <h2 id="qa-and-verification">How to QA LinkedIn Dynamic Links Before Publishing</h2>
      <p>Click "Preview" on your LinkedIn ad in Campaign Manager. Note: in preview mode, LinkedIn does not expand dynamic parameters. To verify live expansion, launch the ad with a minimal test budget ($5), click the live ad in your LinkedIn feed from a personal account, and verify that the destination URL in your browser address bar contains the actual campaign and ad names.</p>
    `
  }
];
