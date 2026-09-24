export const offlineQrPosts = [
  {
    slug: 'offline-qr-utm-tracking',
    title: 'Offline Campaign Tracking With UTMs and QR Codes: Print, Events & Packaging',
    seoTitle: 'Offline Tracking With UTMs & QR Codes: Print & Events | UTMCraft',
    description: 'Learn how to connect offline marketing to Google Analytics 4. Track direct mail, billboards, conference booths, retail packaging, and QR codes with precision.',
    category: 'offline-qr',
    isPillar: true,
    author: {
      name: 'DJ',
      role: 'Attribution & Analytics Architect',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-02-13',
    dateModified: '2026-09-23',
    reviewedDate: 'September 23, 2026',
    readingTime: '11 min read',
    primaryKeyword: 'offline campaign tracking with utms',
    secondaryKeywords: ['qr code utm tracking', 'print campaign tracking ga4', 'direct mail utm tracking', 'event booth tracking ga4'],
    semanticKeywords: ['vanity url redirect', 'dynamic qr codes', 'retail packaging attribution', 'billboard tracking utm'],
    relatedEntities: ['QR Codes', 'Offline Attribution', 'Google Analytics 4', 'Direct Mail', 'Event Marketing'],
    searchIntent: 'Pillar Architecture & Real-World Offline Tracking Guide',
    featuredImage: '/blog/images/offline-qr-utm-tracking.webp',
    featuredImageAlt: 'Omnichannel diagram depicting physical touchpoints (flyers, QR codes, event booths) routing into GA4',
    tableOfContents: [
      { id: 'the-offline-attribution-problem', title: 'The Problem: Physical Touchpoints Masked as "Direct"', level: 2 },
      { id: 'two-pathways-qr-vs-vanity', title: 'The Two Offline Pathways: Dynamic QR Codes vs Vanity URLs', level: 2 },
      { id: 'offline-source-medium-standards', title: 'Offline UTM Taxonomy & Channel Grouping Standards', level: 2 },
      { id: 'use-cases-print-events-packaging', title: 'Implementation by Format: Direct Mail, Event Booths & Retail', level: 2 },
      { id: 'dynamic-vs-static-qr-codes', title: 'Dynamic QR Codes vs Static QR Codes: Critical Warnings', level: 2 },
      { id: 'measuring-offline-in-ga4', title: 'Analyzing Offline Performance in GA4 Custom Reports', level: 2 },
      { id: 'faq', title: 'Frequently Asked Questions', level: 2 }
    ],
    toolCta: {
      title: 'Generate Offline QR Tracking Links',
      description: 'Build clean, high-contrast QR codes with built-in UTM parameters using the UTMCraft Campaign Builder.',
      link: '/',
      buttonText: 'Build QR Tracking Link'
    },
    relatedSlugs: ['qr-code-utm-tracking', 'utm-strategy-guide', 'utm-medium-guide', 'redirects-removing-utms'],
    references: [
      { title: 'Google Analytics 4 Measurement Protocol Overview', url: 'https://developers.google.com/analytics/devguides/collection/protocol/ga4', publisher: 'Google Developers' }
    ],
    contentHtml: `
      <p class="lead-text">Marketers invest millions in print collateral, direct mail postcards, trade show booths, and product packaging, yet treat them as unmeasurable black boxes. When recipients visit your website manually or scan a plain URL, GA4 attributes 100% of those high-intent sessions to <strong>Direct</strong>. Connecting physical touchpoints to digital attribution requires two simple mechanisms: structured QR codes and redirecting vanity URLs.</p>

      <h2 id="the-offline-attribution-problem">The Problem: Physical Touchpoints Masked as "Direct"</h2>
      <p>A customer receives a luxury direct mail catalog, opens their mobile browser, types <code>brand.com</code>, and purchases. GA4 records this as <code>Direct / (none)</code>. The CMO concludes that direct mail doesn't work and cuts the budget. By providing a dedicated QR code or vanity URL, you capture the true return on marketing investment.</p>

      <h2 id="two-pathways-qr-vs-vanity">The Two Offline Pathways: Dynamic QR Codes vs Vanity URLs</h2>
      <p>Offline audience behavior splits into two distinct user habits:</p>
      <ul>
        <li><strong>Scanners (Mobile First):</strong> Users who point their phone camera at a printed QR code. Because smartphones automatically parse URLs, you can encode a full, rich UTM string (e.g. <code>https://example.com/summer?utm_source=catalog&amp;utm_medium=print...</code>) directly into the QR matrix.</li>
        <li><strong>Typers (Manual Input):</strong> Users who manually type an address into their desktop or phone browser. For these users, you must provide a short, memorable <strong>vanity URL</strong> (e.g. <code>brand.com/vip</code>) that server-redirects (301) to your full UTM-tagged URL.</li>
      </ul>

      <h2 id="offline-source-medium-standards">Offline UTM Taxonomy & Channel Grouping Standards</h2>
      <p>To keep your analytics organized, define clear offline source/medium conventions:</p>

      <div class="editorial-table-wrap">
        <table class="editorial-table">
          <thead>
            <tr>
              <th>Physical Asset</th>
              <th>utm_source</th>
              <th>utm_medium</th>
              <th>utm_campaign Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Direct Mail Postcard</td>
              <td><code>direct_mail</code></td>
              <td><code>print</code></td>
              <td><code>us_q2-homeowners_promo</code></td>
            </tr>
            <tr>
              <td>Trade Show Booth Banner</td>
              <td><code>event_ces2026</code></td>
              <td><code>event</code></td>
              <td><code>booth_interactive-demo</code></td>
            </tr>
            <tr>
              <td>Product Retail Packaging</td>
              <td><code>retail_box</code></td>
              <td><code>packaging</code></td>
              <td><code>insert_warranty-registration</code></td>
            </tr>
            <tr>
              <td>Print Magazine Ad</td>
              <td><code>wired_magazine</code></td>
              <td><code>print</code></td>
              <td><code>apr2026_full-page-spread</code></td>
            </tr>
            <tr>
              <td>Billboard / Outdoor (OOH)</td>
              <td><code>billboard_hwy101</code></td>
              <td><code>outdoor</code></td>
              <td><code>q1_brand-awareness</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="callout callout-recommended">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <strong>Configuring GA4 Custom Channel Groups for Offline</strong>
        </div>
        <p>Because Google's Default Channel Grouping does not contain native "Print" or "Event" channels, visits tagged with <code>utm_medium=print</code> will fall into <strong>Unassigned</strong> unless configured. In GA4 Admin, create a Custom Channel Group that creates an "Offline / Print" channel matching <code>medium matches regex ^(print|event|outdoor|packaging|direct_mail)$</code>.</p>
      </div>

      <h2 id="use-cases-print-events-packaging">Implementation by Format: Direct Mail, Event Booths & Retail</h2>
      <ul>
        <li><strong>Direct Mail &amp; Flyers:</strong> Print a QR code on the back of postcards alongside a printed vanity URL (e.g. <code>brand.com/save20</code>).</li>
        <li><strong>Event Badges &amp; Booth Signage:</strong> Place QR codes on banner stands with <code>utm_source=event_saastr&amp;utm_medium=event&amp;utm_content=booth_banner_qr</code>.</li>
        <li><strong>Retail Product Packaging:</strong> Insert warranty cards inside packaging with QR codes tagged <code>utm_medium=packaging&amp;utm_campaign=product-registration</code>.</li>
      </ul>

      <h2 id="dynamic-vs-static-qr-codes">Dynamic QR Codes vs Static QR Codes: Critical Warnings</h2>
      <div class="callout callout-warning">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <strong>Static QR Code Risk in Print Runs</strong>
        </div>
        <p>If you encode a static landing page URL directly into a QR code and print 50,000 brochures, you can never change that destination URL. If your page URL changes or has a broken parameter, the print run is wasted. Always route QR codes through a <strong>redirect URL on your own domain</strong> (e.g. <code>brand.com/go/catalog</code>) so you can adjust the final destination and UTM parameters on the server at any time.</p>
      </div>

      <h2 id="measuring-offline-in-ga4">Analyzing Offline Performance in GA4 Custom Reports</h2>
      <p>In GA4 Explorations, create a Free-form table with <em>Session source / medium</em> and <em>Session campaign</em> as rows, and <em>Active users</em>, <em>Conversions</em>, and <em>Purchase revenue</em> as metrics. Filter for <code>medium contains print|event|packaging</code> to review your complete offline performance portfolio.</p>

      <section class="article-faq-section">
        <h2 id="faq">Frequently Asked Questions</h2>
        <div class="faq-item">
          <h3>Can QR codes have UTM parameters embedded directly inside them?</h3>
          <p>Yes. A QR code is simply an image encoding of a text string. When you encode a URL containing full UTM parameters into a QR code, any smartphone camera that scans the code immediately opens the destination page with all parameters intact.</p>
        </div>
        <div class="faq-item">
          <h3>How do vanity URLs work with UTM parameters for print collateral?</h3>
          <p>For billboards, radio, or print flyers where users must type the link manually, use a short vanity URL on your domain (e.g. <code>brand.com/spring</code>). Configure your server to 301-redirect that vanity URL to the full landing page with UTM parameters automatically appended.</p>
        </div>
        <div class="faq-item">
          <h3>What is the recommended GA4 utm_medium for print brochures and packaging?</h3>
          <p>Use descriptive mediums such as <code>utm_medium=print</code>, <code>utm_medium=qr</code>, <code>utm_medium=packaging</code>, or <code>utm_medium=direct_mail</code>. In GA4 Admin, create a Custom Channel Group to bundle these mediums into a dedicated "Offline &amp; Print" channel.</p>
        </div>
        <div class="faq-item">
          <h3>Why should I avoid using free third-party QR code generators?</h3>
          <p>Many free online QR tools route traffic through their own intermediary redirect domains, which can inject ads, expire after 30 days, or sell your scan data. Always generate client-side QR codes directly via UTMCraft or host redirect URLs on your own company domain.</p>
        </div>
      </section>
    `
  },
  {
    slug: 'qr-code-utm-tracking',
    title: 'QR Code UTM Tracking: How to Track Print, Events, and Offline Clicks in GA4',
    seoTitle: 'QR Code UTM Tracking: How to Track Print & Events | UTMCraft',
    description: 'Learn how to generate and track QR codes with UTM parameters in Google Analytics 4. Step-by-step tutorial on vanity redirects, high-contrast sizing, and testing.',
    category: 'offline-qr',
    isPillar: false,
    author: {
      name: 'DJ',
      role: 'Attribution & Analytics Architect',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-03-07',
    dateModified: '2026-09-23',
    reviewedDate: 'September 23, 2026',
    readingTime: '8 min read',
    primaryKeyword: 'qr code utm tracking',
    secondaryKeywords: ['qr code tracking google analytics', 'how to make a tracking qr code', 'print qr code utm', 'track qr scans in ga4'],
    semanticKeywords: ['qr code density', 'svg qr code print resolution', 'dynamic redirect qr', 'scan attribution ga4'],
    relatedEntities: ['QR Codes', 'Google Analytics 4', 'Print Production', 'Event Measurement'],
    searchIntent: 'How-to & Practical Tutorial',
    featuredImage: '/blog/images/qr-code-utm-tracking.webp',
    featuredImageAlt: 'Infographic illustrating QR code generation with UTM parameters and scanning verification on mobile devices',
    tableOfContents: [
      { id: 'why-qr-codes-need-utms', title: 'Why Every QR Code Must Carry UTM Parameters', level: 2 },
      { id: 'how-to-generate-tracking-qr-codes', title: 'Step-by-Step: How to Generate a Tracking QR Code', level: 2 },
      { id: 'print-specifications-and-sizing', title: 'Print Design Rules: Size, Quiet Zone, and Contrast', level: 2 },
      { id: 'qa-testing-before-printing', title: 'Pre-Print Testing Protocol for Mobile Scanners', level: 2 }
    ],
    toolCta: {
      title: 'Generate Print-Ready QR Codes',
      description: 'Build your campaign link and download high-resolution SVG or PNG QR codes with embedded UTM tracking.',
      link: '/',
      buttonText: 'Create QR Tracking Code'
    },
    relatedSlugs: ['offline-qr-utm-tracking', 'redirects-removing-utms', 'utm-qa-checklist'],
    references: [
      { title: 'ISO/IEC 18004:2024 QR Code Standard', url: 'https://www.iso.org/standard/83389.html', publisher: 'ISO' }
    ],
    contentHtml: `
      <p class="lead-text">Printing a QR code without UTM parameters is an irreversible tracking error. Once ink hits paper on thousands of flyers or product boxes, you cannot retrofit analytics. Here is how to create, test, and deploy tracking QR codes properly.</p>

      <h2 id="why-qr-codes-need-utms">Why Every QR Code Must Carry UTM Parameters</h2>
      <p>When a customer scans a QR code, their phone camera decodes the text string and opens the default browser (Safari on iPhone, Chrome on Android). If the QR code contains only <code>https://example.com/product</code>, the browser sends an empty referrer header. In GA4, that scan is recorded as <strong>Direct</strong>. Adding <code>?utm_source=flyer&amp;utm_medium=print&amp;utm_campaign=spring2026</code> guarantees complete campaign attribution.</p>

      <h2 id="how-to-generate-tracking-qr-codes">Step-by-Step: How to Generate a Tracking QR Code</h2>
      <ol>
        <li>Open the <a href="/">UTMCraft Campaign URL Builder</a>.</li>
        <li>Enter your destination landing page URL.</li>
        <li>Set <code>utm_source</code> to the specific print vehicle (e.g. <code>brochure_tradeshow</code>).</li>
        <li>Set <code>utm_medium=print</code> (or <code>event</code>).</li>
        <li>Set <code>utm_campaign</code> using your standardized formula.</li>
        <li>In the output drawer, click <strong>Generate QR Code</strong>.</li>
        <li>Download the QR code as high-resolution <strong>SVG</strong> for vector print artwork or high-DPI PNG.</li>
      </ol>

      <h2 id="print-specifications-and-sizing">Print Design Rules: Size, Quiet Zone, and Contrast</h2>
      <div class="callout callout-warning">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 16.14 16.14 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <strong>Print Legibility Requirements</strong>
        </div>
        <ul>
          <li><strong>Minimum Physical Size:</strong> Never print a QR code smaller than <strong>0.8 x 0.8 inches (2 x 2 cm)</strong> for close-up scanning (business cards/brochures). For posters or billboards, scale up proportionally to scanning distance (ratio: 1:10).</li>
          <li><strong>Quiet Zone:</strong> Maintain an empty white border around the QR matrix at least 4 modules wide.</li>
          <li><strong>Contrast:</strong> Always use dark pixels on a solid light background. Never invert colors (light pixels on dark background confuse many older Android camera sensors).</li>
        </ul>
      </div>

      <h2 id="qa-testing-before-printing">Pre-Print Testing Protocol for Mobile Scanners</h2>
      <p>Before sending artwork to the commercial printer:</p>
      <ul>
        <li>Print a 100% scale proof on your office printer.</li>
        <li>Test scanning with both an iPhone (Apple Camera app) and an Android device.</li>
        <li>Verify the browser lands on the target page and the UTM parameters remain intact in the address bar.</li>
      </ul>
    `
  }
];
