export const emailTrackingPosts = [
  {
    slug: 'email-utm-guide',
    title: 'Email UTM Tracking Guide: Automated Flows, ESP Integration & Bot Filtering',
    seoTitle: 'Email UTM Tracking Guide: ESP Setup & Bot Defense | UTMCraft',
    description: 'Tag newsletters and automated emails for GA4. Set consistent names, test ESP redirects and review security-scanner clicks in your reports.',
    category: 'email-tracking',
    isPillar: true,
    author: {
      name: 'Dinesh Jeengar',
      role: 'Founder, UTMCraft',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-02-11',
    dateModified: '2026-10-01',
    reviewedDate: 'September 23, 2026',
    readingTime: '12 min read',
    primaryKeyword: 'email utm tracking',
    secondaryKeywords: ['email marketing utm parameters', 'klaviyo utm tracking', 'hubspot email utm parameters', 'email campaign tracking ga4'],
    semanticKeywords: ['anti-spam security bots', 'automated flow utms', 'abandoned cart tracking', 'email link wrapping'],
    relatedEntities: ['Email Marketing', 'ESP (Email Service Provider)', 'Klaviyo', 'HubSpot', 'Google Analytics 4'],
    searchIntent: 'Pillar Guide & ESP Implementation Reference',
    featuredImage: '/blog/images/email-utm-guide.webp',
    featuredImageAlt: 'Architectural schematic of email marketing campaigns and automated lifecycle flows routing into GA4 Email channel',
    tableOfContents: [
      { id: 'why-email-attribution-fails', title: 'Why Email Campaign Attribution Fails in GA4', level: 2 },
      { id: 'standard-email-taxonomy', title: 'Standard Email Tracking Taxonomy (Flows vs Broadcasts)', level: 2 },
      { id: 'esp-auto-tagging-configurations', title: 'ESP Auto-Tagging Configurations: Klaviyo, HubSpot, Braze & Mailchimp', level: 2 },
      { id: 'cta-level-and-link-tracking', title: 'Granular CTA-Level & Placement Tracking with utm_content', level: 2 },
      { id: 'transactional-emails', title: 'Should You Tag Transactional & Receipt Emails?', level: 2 },
      { id: 'faq', title: 'Frequently Asked Questions', level: 2 }
    ],
    toolCta: {
      title: 'Generate Clean Email Campaign Links',
      description: 'Create standardized email UTM parameters with pre-configured ESP tokens and CTA placement tags.',
      link: '/',
      buttonText: 'Build Email Tracking URL'
    },
    relatedSlugs: ['email-utm-tracking', 'utm-medium-guide', 'utm-strategy-guide', 'ga4-unassigned-traffic'],
    references: [
      { title: 'Default Channel Grouping in GA4 (Email Category)', url: 'https://support.google.com/analytics/answer/9756891', publisher: 'Google Analytics Help' },
      { title: 'Understanding UTM tracking in Klaviyo', url: 'https://help.klaviyo.com/hc/en-us/articles/115005247808', publisher: 'Klaviyo Help Center' }
    ],
    contentHtml: `
      <p class="lead-text">Tag email links so you can compare newsletters and automated messages in GA4. Use consistent names, test your email platform’s redirects and account for security scanners when reviewing clicks. This guide covers each step.</p>

      <h2 id="why-email-attribution-fails">Why Email Campaign Attribution Fails in GA4</h2>
      <p>Email clients, mobile mail apps, and link-wrapping systems can affect referral information. If campaign parameters are missing and GA4 has no other clear referral or advertising information, the visit may be reported as <strong>Direct / (none)</strong>. A medium such as <code>newsletter</code> or <code>flow</code> may not match an email channel definition by itself; check the other traffic-source values and Google's current rules when investigating <strong>Unassigned</strong>.</p>

      <h2 id="standard-email-taxonomy">Standard Email Tracking Taxonomy (Flows vs Broadcasts)</h2>
      <p>Give newsletters and automated flows distinct names so you can compare them in reports:</p>

      <div class="editorial-table-wrap">
        <table class="editorial-table">
          <thead>
            <tr>
              <th>Email Message Type</th>
              <th>utm_source</th>
              <th>utm_medium</th>
              <th>utm_campaign Example</th>
              <th>utm_content Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Weekly Newsletter</td>
              <td><code>newsletter</code></td>
              <td><code>email</code></td>
              <td><code>weekly-digest_2026-03-24</code></td>
              <td><code>header_hero_link</code></td>
            </tr>
            <tr>
              <td>Promotional Flash Sale</td>
              <td><code>promo</code></td>
              <td><code>email</code></td>
              <td><code>spring-sale_48h-flash_2026</code></td>
              <td><code>cta_button_shop_now</code></td>
            </tr>
            <tr>
              <td>Welcome Flow (Email 1)</td>
              <td><code>automated_flow</code></td>
              <td><code>email</code></td>
              <td><code>flow_welcome-series</code></td>
              <td><code>email-1_founder-story</code></td>
            </tr>
            <tr>
              <td>Abandoned Cart Recovery</td>
              <td><code>automated_flow</code></td>
              <td><code>email</code></td>
              <td><code>flow_abandoned-cart</code></td>
              <td><code>email-2_discount-10</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="esp-auto-tagging-configurations">ESP Auto-Tagging Configurations: Klaviyo, HubSpot, Braze & Mailchimp</h2>
      <p>Most major Email Service Providers (ESPs) offer automated UTM tracking settings. Configure them with these specific dynamic tokens:</p>

      <h3>1. Klaviyo Account Tracking Settings</h3>
      <p>In Klaviyo, navigate to <strong>Settings &gt; UTM Tracking</strong>:</p>
      <ul>
        <li><code>utm_source</code> = <code>klaviyo</code> (or <code>newsletter</code>)</li>
        <li><code>utm_medium</code> = <code>email</code> (the standard medium for email tagging)</li>
        <li><code>utm_campaign</code> = <code>$campaign_name</code> (for campaigns) or <code>$flow_name</code> (for flows)</li>
        <li><code>utm_id</code> = <code>$message_id</code></li>
      </ul>

      <h3>2. HubSpot Email Settings</h3>
      <p>In HubSpot, go to <strong>Marketing &gt; Email &gt; Configuration &gt; Tracking</strong>:</p>
      <ul>
        <li>Enable <strong>Add source tracking tags</strong>. HubSpot automatically appends <code>utm_source=hs_email&amp;utm_medium=email&amp;utm_campaign=[email_name]</code>.</li>
      </ul>

      <h2 id="the-anti-spam-bot-problem">The Anti-Spam Security Bot Problem (Proofpoint, Mimecast)</h2>
      <div class="callout callout-warning">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <strong>Security Bot Click Inflation</strong>
        </div>
        <p>Some email security systems follow links to inspect destinations before a recipient clicks. This can affect click reporting and, depending on the analytics implementation, may produce automated visits. Compare email-platform click logs with GA4 engagement patterns when investigating discrepancies.</p>
      </div>
      <p><strong>Defense:</strong> In GA4, analyze your email traffic using the <strong>User engagement duration</strong> metric. Exclude sessions with 0 seconds duration or use Cloudflare bot management to challenge known security scanner IP ranges before the GA4 script executes.</p>

      <h2 id="cta-level-and-link-tracking">Granular CTA-Level & Placement Tracking with utm_content</h2>
      <p>If an email contains three links pointing to your pricing page (a top text link, a center hero CTA button, and a footer link), use <code>utm_content</code> to measure placement performance:</p>
      <div class="code-block-wrap">
        <pre><code>Top text link:   utm_content=intro_text_link
Primary button:  utm_content=hero_button_cta
Footer link:     utm_content=footer_terms_link</code></pre>
      </div>

      <h2 id="transactional-emails">Should You Tag Transactional & Receipt Emails?</h2>
      <p>Order confirmations, password resets, and shipping updates drive significant post-purchase visits. Tag them with <code>utm_source=transactional&amp;utm_medium=email&amp;utm_campaign=shipping-notification</code> to track repeat visits and repurchase behavior.</p>

      <section class="article-faq-section">
        <h2 id="faq">Frequently Asked Questions</h2>
        <div class="faq-item">
          <h3>What is the standard utm_medium for email marketing in GA4?</h3>
          <p>Use a documented email medium convention, such as <code>email</code>, and apply it consistently. Google lists several email-related source and medium values in its current channel definitions; these definitions are not case-sensitive. Check the current rules and the other traffic-source values when investigating <strong>(Unassigned)</strong>.</p>
        </div>
        <div class="faq-item">
          <h3>Why does email traffic sometimes show up as Direct in GA4?</h3>
          <p>Email clients, mobile mail apps, and link-wrapping systems can affect referral information. If campaign parameters are missing and GA4 has no other clear referral or advertising information, the visit may be reported as <strong>Direct / (none)</strong>. Tag email links when you need campaign-level reporting, and test the final destination.</p>
        </div>
        <div class="faq-item">
          <h3>How do enterprise security scanners affect email campaign data in GA4?</h3>
          <p>Enterprise firewalls (such as Proofpoint or Mimecast) pre-click all links in inbound emails to verify destination safety before delivering to the inbox. This inflates click counts and sends 0-second duration hits into GA4. Filter these out by analyzing <strong>User engagement duration</strong> or creating an audience of engaged sessions (>5 seconds).</p>
        </div>
        <div class="faq-item">
          <h3>Should I use ESP auto-tagging or build manual UTMs for email?</h3>
          <p>Enable ESP auto-tagging for standard broadcast newsletters and automated flows to maintain broad consistency. However, for high-impact promotions, partner co-marketing emails, and segmented lifecycle tests, use a dedicated builder like UTMCraft to tag granular CTA placements with <code>utm_content</code>.</p>
        </div>
      </section>
    `
  },
  {
    slug: 'email-utm-tracking',
    title: 'Email UTM Link Wrappers: Preserve Tags Through ESP Redirects',
    seoTitle: 'Email UTM Link Wrappers: Prevent Tag Loss in ESP Redirects | UTMCraft',
    description: 'Diagnose email service provider link wrapping that drops UTM query parameters. Learn how to inspect redirect chains and verify the final landing URL before sending.',
    category: 'email-tracking',
    isPillar: false,
    author: {
      name: 'Dinesh Jeengar',
      role: 'Founder, UTMCraft',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-02-27',
    dateModified: '2026-10-01',
    reviewedDate: 'September 23, 2026',
    readingTime: '8 min read',
    primaryKeyword: 'email utm link wrappers',
    secondaryKeywords: ['email links stripping utm parameters', 'esp redirect query string', 'test email tracking links'],
    semanticKeywords: ['email service provider redirects', 'utm query string preservation', 'click tracking link validation'],
    relatedEntities: ['Email Service Providers', 'URL Redirects', 'UTM Parameters'],
    searchIntent: 'ESP Redirect Troubleshooting Guide',
    featuredImage: '/blog/images/email-utm-tracking.webp',
    featuredImageAlt: 'Graphic detailing how email clicks pass through ESP link wrappers to land in GA4 Email acquisition reports',
    tableOfContents: [
      { id: 'esp-link-wrapping-mechanics', title: 'How ESP Link Wrapping Changes a Destination URL', level: 2 },
      { id: 'check-the-final-destination', title: 'Check Whether the Final URL Keeps Its UTMs', level: 2 },
      { id: 'diagnose-parameter-loss', title: 'Diagnose Where Parameters Are Lost', level: 2 },
      { id: 'pre-send-validation', title: 'Pre-Send Link Validation Checklist', level: 2 }
    ],
    toolCta: {
      title: 'Build Email Campaign Links',
      description: 'Create tagged destination URLs, then test your email platform’s click-tracking redirects separately to confirm the final URL retains the parameters.',
      link: '/',
      buttonText: 'Open Campaign Builder'
    },
    relatedSlugs: ['email-utm-guide', 'utm-medium-guide', 'ga4-unassigned-traffic'],
    references: [
      { title: 'Google Analytics 4 Default Channel Definitions', url: 'https://support.google.com/analytics/answer/9756891', publisher: 'Google Analytics Help' }
    ],
    contentHtml: `
      <p class="lead-text">Your email platform may replace a destination link with a tracking URL before sending. After the click, that URL should redirect to your page with the UTM values intact. Check the final URL in a test email before sending the campaign.</p>

      <h2 id="esp-link-wrapping-mechanics">How ESP Link Wrapping Interacts with UTMs</h2>
      <p>Click tracking can replace a direct destination such as <code>https://example.com/pricing?utm_source=newsletter&amp;utm_medium=email&amp;utm_campaign=fall-launch</code> with an ESP-owned tracking URL. After recording the click, the ESP redirects the browser to the destination. The key check is the final URL: the landing page should receive the complete query string, including all UTM values.</p>

      <h2 id="check-the-final-destination">Check Whether the Final URL Keeps Its UTMs</h2>
      <ol>
        <li>Copy the complete tagged destination URL from your email platform.</li>
        <li>Send a test message to a mailbox you control and click the link as a recipient.</li>
        <li>After the redirects finish, inspect the browser address bar and confirm <code>utm_source</code>, <code>utm_medium</code>, and <code>utm_campaign</code> remain present with their intended values.</li>
      </ol>

      <h2 id="diagnose-parameter-loss">Diagnose Where Parameters Are Lost</h2>
      <p>Compare the original tagged URL with the final landing URL. If the UTMs disappear, inspect each redirect in the chain: open the ESP click URL in browser developer tools or use a redirect checker, then review each <code>Location</code> target. The first redirect that omits the query string identifies where the link needs attention.</p>

      <h2 id="pre-send-validation">Pre-Send Link Validation Checklist</h2>
      <ul>
        <li>Confirm UTMs are on the destination URL before the ESP applies click tracking.</li>
        <li>Check the final URL after clicking a received test email, including links to pages that redirect to a canonical host or path.</li>
        <li>Test links on both desktop and mobile if the email platform uses different tracking domains or redirect behavior.</li>
        <li>Make sure the final landing page loads successfully and that the expected campaign values reach GA4.</li>
      </ul>
    `
  }
];
