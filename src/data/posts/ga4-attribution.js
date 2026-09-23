export const ga4AttributionPosts = [
  {
    slug: 'ga4-utm-troubleshooting-guide',
    title: 'GA4 UTM Tracking Troubleshooting Guide: Root Causes, Debugging & Solutions',
    seoTitle: 'GA4 UTM Tracking Troubleshooting Guide | UTMCraft',
    description: 'Diagnose and fix broken UTM tracking in Google Analytics 4. Comprehensive root cause analysis for Unassigned traffic, Direct spikes, (not set), and stripped query strings.',
    category: 'ga4-attribution',
    isPillar: true,
    author: {
      name: 'DJ',
      role: 'Attribution & Analytics Architect',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-01-25',
    dateModified: '2026-09-23',
    reviewedDate: 'September 23, 2026',
    readingTime: '14 min read',
    primaryKeyword: 'ga4 utm troubleshooting',
    secondaryKeywords: ['ga4 utm tracking not working', 'fix unassigned traffic ga4', 'ga4 direct traffic spike', 'ga4 not set campaign'],
    semanticKeywords: ['debugview ga4', 'session start attribution', 'redirect query parameter loss', 'consent mode v2 utm'],
    relatedEntities: ['Google Analytics 4', 'Attribution Troubleshooting', 'DebugView', 'Traffic Acquisition'],
    searchIntent: 'Diagnostic & Troubleshooting Pillar Guide',
    featuredImage: '/blog/images/ga4-utm-troubleshooting-guide.webp',
    featuredImageAlt: 'Diagnostic schematic showing GA4 tracking issues branching into root causes and resolution workflows',
    tableOfContents: [
      { id: 'the-attribution-diagnostic-flowchart', title: 'The GA4 Attribution Diagnostic Flowchart', level: 2 },
      { id: 'direct-traffic-spikes', title: 'Issue 1: Traffic Showing as Direct Instead of Paid Campaign', level: 2 },
      { id: 'unassigned-channel-group', title: 'Issue 2: Traffic Showing as "Unassigned"', level: 2 },
      { id: 'not-set-campaign-dimensions', title: 'Issue 3: Campaign and Source Showing as "(not set)"', level: 2 },
      { id: 'referral-loops-payment-gateways', title: 'Issue 4: Payment Gateway & Social Webview Referral Hijacking', level: 2 },
      { id: 'redirect-chains-parameter-loss', title: 'Issue 5: Server 301/302 Redirects Stripping Query Strings', level: 2 },
      { id: 'consent-mode-v2-impact', title: 'Issue 6: Consent Mode v2 Delays and Cookieless Pings', level: 2 },
      { id: 'testing-with-debugview', title: 'Live Testing Protocol: Realtime & DebugView', level: 2 },
      { id: 'faq', title: 'Frequently Asked Questions', level: 2 }
    ],
    toolCta: {
      title: 'Diagnose Broken Links Instantly',
      description: 'Audit any URL before spending money. UTMCraft checks for redirect parameter loss, invalid casing, and missing GA4 parameters in seconds.',
      link: '/utm-checker/',
      buttonText: 'Launch UTM Link Checker'
    },
    relatedSlugs: ['ga4-utms-not-showing', 'ga4-direct-traffic-troubleshooting', 'ga4-unassigned-traffic', 'ga4-not-set', 'redirects-removing-utms'],
    references: [
      { title: 'Troubleshoot Traffic Acquisition in GA4', url: 'https://support.google.com/analytics/answer/9756891', publisher: 'Google Analytics Help' },
      { title: 'Verify Your Tag Implementation with DebugView', url: 'https://support.google.com/analytics/answer/7201382', publisher: 'Google Analytics Help' },
      { title: 'Manage Unwanted Referrals in GA4', url: 'https://support.google.com/analytics/answer/10327750', publisher: 'Google Analytics Help' }
    ],
    contentHtml: `
      <p class="lead-text">Attribution breakdowns in Google Analytics 4 are rarely caused by platform bugs. In 95% of cases, the failure occurs between the moment a user clicks an ad and the moment the GA4 JavaScript library executes on the destination page. This guide provides a systematic, engineer-level troubleshooting framework to diagnose and fix broken campaign tracking.</p>

      <h2 id="the-attribution-diagnostic-flowchart">The GA4 Attribution Diagnostic Flowchart</h2>
      <p>When campaign data fails to appear correctly in GA4, follow this symptom triage table:</p>

      <div class="editorial-table-wrap">
        <table class="editorial-table">
          <thead>
            <tr>
              <th>Observed Symptom</th>
              <th>Primary Suspect</th>
              <th>Definitive Test</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Campaign traffic shows as <strong>Direct</strong></td>
              <td>HTTP 301/302 redirect dropping query string; mobile webview; HTTPS to HTTP downgrade</td>
              <td>Inspect Network tab in DevTools; check if query parameters survive final URL</td>
            </tr>
            <tr>
              <td>Traffic shows as <strong>Unassigned</strong></td>
              <td><code>utm_medium</code> does not match GA4 Default Channel Group regex rules</td>
              <td>Examine <em>Session source / medium</em> in GA4 Explorations against Google channel rules</td>
            </tr>
            <tr>
              <td>Campaign shows as <strong>(not set)</strong></td>
              <td>Measurement Protocol hits without campaign parameters; session timeout; page_view fired before config</td>
              <td>Verify <code>session_start</code> event payload in DebugView</td>
            </tr>
            <tr>
              <td>Paid social shows as <strong>Referral</strong></td>
              <td>UTM parameters stripped or missing; link wrapper stripped <code>fbclid</code> / <code>utm_*</code></td>
              <td>Check if <code>utm_medium=paid_social</code> was included in ad destination URL</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="direct-traffic-spikes">Issue 1: Traffic Showing as Direct Instead of Paid Campaign</h2>
      <p>Direct traffic in GA4 is a catch-all fallback: it means GA4 received an incoming session with <strong>no referrer header and no UTM parameters</strong>. If you are paying for ad clicks but seeing a spike in Direct traffic, one of three failures is occurring:</p>
      
      <div class="callout callout-warning">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <strong>Root Cause: Unhandled Trailing Slash or Protocol Redirect</strong>
        </div>
        <p>If you enter your destination URL as <code>https://example.com/signup?utm_source=meta</code>, but your web server enforces trailing slashes (<code>https://example.com/signup/</code>), Apache/Nginx may issue a 301 redirect that drops the query string entirely:</p>
        <div class="code-block-wrap">
          <pre><code># BROKEN REDIRECT (Query string stripped)
GET /signup?utm_source=meta -&gt; 301 Moved Permanently
Location: https://example.com/signup/  &lt;-- UTMs LOST!

# CORRECT REDIRECT (Query string preserved)
Location: https://example.com/signup/?utm_source=meta</code></pre>
        </div>
      </div>

      <h2 id="unassigned-channel-group">Issue 2: Traffic Showing as "Unassigned"</h2>
      <p>GA4 assigns traffic to the "Unassigned" channel group when an incoming session cannot be classified into any rule defined in the Default Channel Grouping specification. For example:</p>
      <ul>
        <li><code>utm_medium=paidsocial</code> vs <code>utm_medium=paid_social</code> (GA4 accepts both, but if source is unrecognized, it may fall into Unassigned).</li>
        <li><code>utm_source=newsletter&amp;utm_medium=email_blast</code> (GA4 requires medium to match exact regex <code>email|e-mail|e_mail</code>; <code>email_blast</code> fails and becomes Unassigned!).</li>
      </ul>

      <h2 id="not-set-campaign-dimensions">Issue 3: Campaign and Source Showing as "(not set)"</h2>
      <p>In GA4, <code>(not set)</code> indicates that GA4 collected an event, but the associated dimension has no recorded value. Common causes include:</p>
      <ol>
        <li><strong>Partial UTM Tagging:</strong> Supplying <code>utm_campaign=summer</code> without supplying <code>utm_source</code> or <code>utm_medium</code>. GA4 requires at least <code>utm_source</code>.</li>
        <li><strong>Measurement Protocol Mismatch:</strong> Backend offline conversion events sent via the GA4 Measurement Protocol without an attached <code>client_id</code> or <code>session_id</code> to link to the original campaign session.</li>
        <li><strong>Session Timeout Across Midnight:</strong> If a user remains idle on a page for 30 minutes, their original session expires. A subsequent interaction starts a new session without incoming UTMs, occasionally resulting in <code>(not set)</code> dimensions.</li>
      </ol>

      <h2 id="referral-loops-payment-gateways">Issue 4: Payment Gateway & Social Webview Referral Hijacking</h2>
      <p>If your ecommerce store directs shoppers to external checkout systems (PayPal, Stripe Checkout, Klarna, Shopify Checkout) and returns them to your order confirmation page without proper cross-domain tracking, GA4 registers the return visit as a <strong>new session</strong> with the payment gateway as the referring source (e.g. <code>paypal.com / referral</code>). All revenue is stripped from your paid ads!</p>

      <div class="callout callout-recommended">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <strong>The Fix: Configure Unwanted Referrals in GA4</strong>
        </div>
        <p>In GA4 Admin, navigate to <em>Data Streams &gt; Configure tag settings &gt; List unwanted referrals</em>. Add your payment domains (e.g. <code>paypal.com</code>, <code>checkout.stripe.com</code>). GA4 will ignore these referrers upon return and preserve the original campaign attribution.</p>
      </div>

      <h2 id="redirect-chains-parameter-loss">Issue 5: Server 301/302 Redirects Stripping Query Strings</h2>
      <p>Redirect chains are the silent killer of marketing budgets. When marketing links pass through link shorteners (e.g. bit.ly), internal redirect tools, or vanity domain redirects, query parameters are frequently dropped at each hop. Always configure servers to append <code>$is_args$args</code> in Nginx or <code>[QSA]</code> (Query String Append) in Apache mod_rewrite.</p>

      <h2 id="consent-mode-v2-impact">Issue 6: Consent Mode v2 Delays and Cookieless Pings</h2>
      <p>Under Google Consent Mode v2 (mandatory in the EEA and UK), when a user lands on your site and has not yet accepted cookies, GA4 emits <strong>cookieless pings</strong> (<code>gcs=G100</code>). While cookieless pings preserve campaign parameters on the initial landing event, if the user accepts cookies on page 2, GA4 may create a second session identifier, causing attribution discrepancies unless Advanced Consent Mode is correctly configured.</p>

      <h2 id="testing-with-debugview">Live Testing Protocol: Realtime & DebugView</h2>
      <p>Never debug campaigns by waiting 24 to 48 hours for standard GA4 acquisition reports. Follow this real-time verification process:</p>
      <ol>
        <li>Append <code>?utm_source=qa_test&amp;utm_medium=paid_social&amp;utm_campaign=qa_audit&amp;debug_mode=true</code> to your destination URL.</li>
        <li>Open the URL in an Incognito browser window.</li>
        <li>In GA4, go to <strong>Admin &gt; DebugView</strong>. Select your active device stream.</li>
        <li>Click on the <code>page_view</code> and <code>session_start</code> events.</li>
      </ol>

      <section class="article-faq-section">
        <h2 id="faq">Frequently Asked Questions</h2>
        <div class="faq-item">
          <h3>Why does my campaign traffic show up as (Unassigned) in GA4?</h3>
          <p>Traffic is categorized as <code>(Unassigned)</code> when Google Analytics 4 cannot match the combination of <code>utm_source</code> and <code>utm_medium</code> to any rule in its Default Channel Grouping table. Common culprits include misspelled mediums (e.g. <code>utm_medium=paidsocial</code> instead of <code>paid_social</code>) or uppercase letters (e.g. <code>utm_medium=CPC</code> instead of <code>cpc</code>).</p>
        </div>
        <div class="faq-item">
          <h3>Why are my paid campaign clicks showing as Direct traffic?</h3>
          <p>This typically occurs when a server redirect (such as an HTTP-to-HTTPS redirect or missing trailing slash rewrite) strips query parameters during transit. Another frequent cause is Single Page Application (SPA) client routers clearing query parameters before the GA4 tracking tag executes.</p>
        </div>
        <div class="faq-item">
          <h3>How long does GA4 take to show UTM campaign data in standard reports?</h3>
          <p>GA4 standard acquisition reports can take <strong>24 to 48 hours</strong> to fully process and aggregate session data. To verify new campaign links immediately, inspect the <strong>Realtime report</strong> or enable <code>debug_mode=true</code> to monitor incoming hits live in <strong>Admin &gt; DebugView</strong>.</p>
        </div>
        <div class="faq-item">
          <h3>Do URL shorteners strip UTM parameters?</h3>
          <p>Most reputable URL shorteners preserve query parameters upon redirect. However, if a link shortener redirects to an HTTP URL that further redirects to HTTPS (a redirect chain), intermediate hops often drop parameters. Always test your final shortened link with a tool like <a href="/utm-checker/">UTMCraft UTM Checker</a> to confirm parameter retention.</p>
        </div>
      </section>
    `
  },
  {
    slug: 'ga4-utms-not-showing',
    title: 'Why UTMs Don\'t Appear in GA4: 9 Causes and Step-by-Step Fixes',
    seoTitle: 'Why UTMs Don\'t Show in GA4: 9 Causes & Fixes | UTMCraft',
    description: 'UTM parameters missing in Google Analytics 4? Diagnose the 9 most common reasons campaign data fails to appear in GA4 reports and fix them immediately.',
    category: 'ga4-attribution',
    isPillar: false,
    author: {
      name: 'DJ',
      role: 'Attribution & Analytics Architect',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-02-18',
    dateModified: '2026-09-23',
    reviewedDate: 'September 23, 2026',
    readingTime: '9 min read',
    primaryKeyword: 'utms not appearing in ga4',
    secondaryKeywords: ['ga4 utm missing', 'why are utm parameters not showing in google analytics', 'utm not tracking in ga4', 'fix missing utm data'],
    semanticKeywords: ['ga4 data latency', 'redirect parameter stripping', 'debugview test', 'session source missing'],
    relatedEntities: ['Google Analytics 4', 'Data Processing Latency', 'DebugView', 'Traffic Attribution'],
    searchIntent: 'Troubleshooting & Problem Resolution',
    featuredImage: '/blog/images/ga4-utms-not-showing.webp',
    featuredImageAlt: 'Diagnostic diagram showing 9 failure points where UTM parameters are dropped before reaching GA4',
    tableOfContents: [
      { id: 'quick-diagnosis', title: 'Quick Diagnostic Checklist: 9 Most Common Causes', level: 2 },
      { id: 'data-processing-latency', title: 'Cause 1: GA4 Data Processing Latency (24-48 Hours)', level: 2 },
      { id: 'server-redirect-stripping', title: 'Cause 2: Server 301/302 Redirect Stripping Parameters', level: 2 },
      { id: 'single-page-apps-history', title: 'Cause 3: Single Page Application (SPA) Route Wiping', level: 2 },
      { id: 'case-sensitivity-filter', title: 'Cause 4: Case Sensitivity & Hidden Filtering', level: 2 },
      { id: 'how-to-fix-step-by-step', title: 'Step-by-Step Repair Protocol', level: 2 }
    ],
    toolCta: {
      title: 'Test Your URLs for Redirect Loss',
      description: 'Run your campaign URLs through UTMCraft UTM Checker to verify that parameters survive server redirects and client routing.',
      link: '/utm-checker/',
      buttonText: 'Check URL Health'
    },
    relatedSlugs: ['ga4-utm-troubleshooting-guide', 'ga4-direct-traffic-troubleshooting', 'redirects-removing-utms', 'how-to-test-utms'],
    references: [
      { title: 'Data Processing Latency in GA4', url: 'https://support.google.com/analytics/answer/11198165', publisher: 'Google Analytics Help' }
    ],
    contentHtml: `
      <p class="lead-text">You configured UTM parameters, launched your ads, but your GA4 acquisition reports show zero campaign visits. Before panicking or rewriting your entire campaign setup, review these 9 root causes and their verified technical solutions.</p>

      <h2 id="quick-diagnosis">Quick Diagnostic Checklist: 9 Most Common Causes</h2>
      <ol>
        <li><strong>Standard Report Latency:</strong> GA4 standard reports have a 24-48 hour processing delay. Check <em>Realtime</em> or <em>DebugView</em> instead.</li>
        <li><strong>Server Redirect Drops:</strong> Your web server redirects HTTP to HTTPS, non-www to www, or adds a trailing slash, stripping the query string.</li>
        <li><strong>Hash Symbol (#) Before Query String (?):</strong> Placing an anchor hash before UTMs hides them from the server and analytics library.</li>
        <li><strong>Single Page App (SPA) Router Overwrites:</strong> React/Vue routers wipe <code>window.location.search</code> before the GA4 config tag fires.</li>
        <li><strong>Ad Blockers &amp; Privacy Extensions:</strong> Testing with Brave or uBlock Origin blocks the <code>google-analytics.com/g/collect</code> endpoint.</li>
        <li><strong>Consent Management (CMP) Blocking:</strong> Your cookie banner blocks the Google tag until the visitor accepts analytics consent.</li>
        <li><strong>Cross-Domain Link Loss:</strong> Traffic traversing multiple subdomains or domains without GA4 linker parameter (<code>_gl</code>).</li>
        <li><strong>Missing utm_source:</strong> Passing <code>utm_campaign</code> and <code>utm_medium</code> without <code>utm_source</code> causes GA4 to discard manual campaign attribution.</li>
        <li><strong>Internal Traffic Filter Enabled:</strong> Your IP address is filtered out under GA4 Internal Traffic filters.</li>
      </ol>

      <h2 id="data-processing-latency">Cause 1: GA4 Data Processing Latency (24-48 Hours)</h2>
      <p>Unlike Universal Analytics, which updated standard reports within a few hours, GA4 can take up to <strong>24 to 48 hours</strong> to process data into standard acquisition dashboards (e.g. <em>Traffic acquisition</em>). If you launched your campaign this morning, it is normal not to see it in standard reports yet.</p>
      
      <div class="callout callout-recommended">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <strong>Immediate Verification Workaround</strong>
        </div>
        <p>Check <strong>Realtime &gt; Event count by Event name &gt; page_view &gt; source</strong> or open <strong>Explore &gt; Free form Exploration</strong>. Explorations often reflect fresher data than standard reports.</p>
      </div>

      <h2 id="server-redirect-stripping">Cause 2: Server 301/302 Redirect Stripping Parameters</h2>
      <p>Test your live link in browser terminal with curl:</p>
      <div class="code-block-wrap">
        <pre><code class="language-bash">curl -ILs "https://example.com/promo?utm_source=meta" | grep -iE "HTTP|location"</code></pre>
        <button class="copy-code-btn" data-copy="curl -ILs &quot;https://example.com/promo?utm_source=meta&quot; | grep -iE &quot;HTTP|location&quot;" aria-label="Copy curl command">Copy curl</button>
      </div>
      <p>If the <code>Location:</code> header shows <code>https://example.com/promo/</code> without <code>?utm_source=meta</code>, your server rewrite configuration is deleting query parameters!</p>

      <h2 id="single-page-apps-history">Cause 3: Single Page Application (SPA) Route Wiping</h2>
      <p>In modern Next.js, React, or Angular apps, client-side routers often execute a "clean URL" rewrite upon mount, stripping query strings to keep the address bar clean. If this router clean-up runs before <code>gtag('config')</code> reads <code>window.location.search</code>, GA4 captures a blank query string!</p>

      <h2 id="case-sensitivity-filter">Cause 4: Case Sensitivity & Hidden Filtering</h2>
      <p>If you filtered your report for <code>facebook</code>, but your colleague tagged the campaign with <code>utm_source=Facebook</code>, GA4's case-sensitive filtering will hide the row entirely. Always search using regular expression filters (<code>(?i)facebook</code>) or use UTMCraft to enforce lowercase universally.</p>

      <h2 id="how-to-fix-step-by-step">Step-by-Step Repair Protocol</h2>
      <ol>
        <li>Verify link syntax using <a href="/utm-checker/">UTM Checker</a>.</li>
        <li>Fix server redirect rules to include query string preservation.</li>
        <li>Test in a clean Incognito session with an ad blocker disabled.</li>
      </ol>
    `
  },
  {
    slug: 'ga4-direct-traffic-troubleshooting',
    title: 'Why Campaign Traffic Shows as Direct in GA4 (and How to Fix It)',
    seoTitle: 'Fix GA4 Direct Traffic Spikes: Causes & Solutions | UTMCraft',
    description: 'Why is your paid traffic showing as Direct in GA4? Learn the 7 primary causes of false direct traffic, redirect parameter loss, and how to recover attribution.',
    category: 'ga4-attribution',
    isPillar: false,
    author: {
      name: 'DJ',
      role: 'Attribution & Analytics Architect',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-03-02',
    dateModified: '2026-09-23',
    reviewedDate: 'September 23, 2026',
    readingTime: '8 min read',
    primaryKeyword: 'ga4 direct traffic',
    secondaryKeywords: ['traffic showing as direct in ga4', 'direct none spike ga4', 'fix direct traffic google analytics', 'why is my campaign direct'],
    semanticKeywords: ['dark traffic', 'document referrer header', '301 redirect parameter drop', 'webview attribution'],
    relatedEntities: ['Google Analytics 4', 'Direct Traffic', 'Attribution Modeling', 'Referrer Policy'],
    searchIntent: 'Diagnostic & Troubleshooting Guide',
    featuredImage: '/blog/images/ga4-direct-traffic-troubleshooting.webp',
    featuredImageAlt: 'Flowchart showing how paid campaign traffic degrades into Direct traffic through redirects and missing UTMs',
    tableOfContents: [
      { id: 'what-direct-actually-means', title: 'What "Direct" Actually Means in GA4', level: 2 },
      { id: 'top-causes-of-direct-spikes', title: 'The 7 Culprits Converting Paid Clicks to Direct', level: 2 },
      { id: 'how-to-diagnose-with-devtools', title: 'How to Inspect Redirection in Browser DevTools', level: 2 },
      { id: 'prevention-standards', title: 'How to Eliminate False Direct Traffic', level: 2 }
    ],
    toolCta: {
      title: 'Audit Your Campaign URLs',
      description: 'Ensure your landing page URLs do not trigger redirect chains that convert paid traffic into untracked Direct sessions.',
      link: '/utm-checker/',
      buttonText: 'Test Campaign URL'
    },
    relatedSlugs: ['ga4-utm-troubleshooting-guide', 'redirects-removing-utms', 'ga4-utms-not-showing', 'utm-qa-checklist'],
    references: [
      { title: 'Default Channel Grouping in GA4', url: 'https://support.google.com/analytics/answer/9756891', publisher: 'Google Analytics Help' }
    ],
    contentHtml: `
      <p class="lead-text">In GA4, "Direct" is not a marketing channel—it is an admission of failure. It indicates that Google Analytics received a session hit with <strong>zero referrer data and zero campaign parameters</strong>. When you spend ad budget and your traffic lands in Direct, your return on investment becomes invisible.</p>

      <h2 id="what-direct-actually-means">What "Direct" Actually Means in GA4</h2>
      <p>A session is labeled as <code>Direct / (none)</code> only when both of the following are true:</p>
      <ul>
        <li>The HTTP <code>Referer</code> request header is null or empty.</li>
        <li>The landing URL contains no valid <code>utm_source</code>, <code>gclid</code>, or recognized advertising click identifiers.</li>
      </ul>

      <h2 id="top-causes-of-direct-spikes">The 7 Culprits Converting Paid Clicks to Direct</h2>
      <ol>
        <li><strong>Server-Side 301/302 Redirects:</strong> Redirecting from non-www to www or http to https without passing the query string.</li>
        <li><strong>Missing Trailing Slashes:</strong> Requesting <code>example.com/blog</code> when the server enforces <code>example.com/blog/</code>.</li>
        <li><strong>Mobile Apps &amp; Messaging Webviews:</strong> Clicks from WhatsApp, Slack, SMS, or WeChat often open in webviews that strip the referrer header. Without UTMs, they become 100% Direct.</li>
        <li><strong>Document Referrer Policy:</strong> If your marketing partner uses <code>Referrer-Policy: no-referrer</code>, your analytics cannot see the source domain unless UTMs are attached.</li>
        <li><strong>Untagged Email Campaigns:</strong> Sending newsletters without <code>utm_medium=email</code>. Desktop clients like Outlook never pass HTTP referrers.</li>
        <li><strong>QR Codes Without Parameters:</strong> Pointing a physical QR code to a plain URL without UTM tags.</li>
        <li><strong>Single Page App Client-Side Rewrites:</strong> A JavaScript router stripping query parameters before GA4 initializes.</li>
      </ol>

      <h2 id="how-to-diagnose-with-devtools">How to Inspect Redirection in Browser DevTools</h2>
      <p>Open Developer Tools &gt; Network tab &gt; Enable "Preserve log". Paste your campaign link and press Enter. Watch the first row: if the status is 301 or 302, click it and look at the <strong>Response Headers</strong> &gt; <code>Location</code>. If the UTM query string is missing in the Location header, your server is the culprit.</p>

      <h2 id="prevention-standards">How to Eliminate False Direct Traffic</h2>
      <p>Enforce strict URL hygiene across all teams: every link shared off-site must pass through a standardized builder, use verified canonical paths (with exact trailing slashes), and include complete UTM tracking.</p>
    `
  },
  {
    slug: 'ga4-unassigned-traffic',
    title: 'How to Fix "Unassigned" Traffic in GA4: Complete Diagnosis Guide',
    seoTitle: 'Fix "Unassigned" Traffic in GA4: Causes & Solutions | UTMCraft',
    description: 'Why does GA4 show Unassigned traffic? Discover the exact channel grouping regex rules, common medium mistakes, and how to fix Unassigned traffic permanently.',
    category: 'ga4-attribution',
    isPillar: false,
    author: {
      name: 'DJ',
      role: 'Attribution & Analytics Architect',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-03-08',
    dateModified: '2026-09-23',
    reviewedDate: 'September 23, 2026',
    readingTime: '9 min read',
    primaryKeyword: 'ga4 unassigned traffic',
    secondaryKeywords: ['unassigned traffic in google analytics 4', 'fix unassigned channel ga4', 'why is traffic unassigned ga4', 'ga4 default channel grouping unassigned'],
    semanticKeywords: ['default channel grouping regex', 'session medium classification', 'custom channel group ga4', 'unassigned traffic diagnostic'],
    relatedEntities: ['Google Analytics 4', 'Default Channel Grouping', 'Traffic Acquisition', 'Data Quality'],
    searchIntent: 'Technical Diagnostic & Fix Guide',
    featuredImage: '/blog/images/ga4-unassigned-traffic.webp',
    featuredImageAlt: 'Diagram showing how mismatched utm_medium values fall through GA4 channel rules into the Unassigned bucket',
    tableOfContents: [
      { id: 'why-unassigned-happens', title: 'Why GA4 Creates the "Unassigned" Channel Group', level: 2 },
      { id: 'how-to-audit-unassigned-traffic', title: 'How to Audit What Lies Inside Your Unassigned Bucket', level: 2 },
      { id: 'most-common-unassigned-mistakes', title: 'The 5 Most Common UTM Mistakes That Cause Unassigned', level: 2 },
      { id: 'how-to-fix-historical-and-future', title: 'How to Fix Unassigned Traffic: Present and Future', level: 2 }
    ],
    toolCta: {
      title: 'Verify Channel Grouping Compliance',
      description: 'Check whether your utm_medium and utm_source values will correctly map to GA4 Default Channels before publishing.',
      link: '/utm-checker/',
      buttonText: 'Check Channel Compliance'
    },
    relatedSlugs: ['ga4-utm-troubleshooting-guide', 'utm-medium-guide', 'ga4-not-set', 'utm-strategy-guide'],
    references: [
      { title: 'GA4 Default Channel Grouping Rules', url: 'https://support.google.com/analytics/answer/9756891', publisher: 'Google Analytics Help' }
    ],
    contentHtml: `
      <p class="lead-text">"Unassigned" is one of the most frustrating dimensions in Google Analytics 4. Seeing 15% or 30% of your total traffic labeled as Unassigned in your <em>Traffic acquisition</em> report undermines executive confidence in your numbers. Here is exactly why it happens and how to resolve it.</p>

      <h2 id="why-unassigned-happens">Why GA4 Creates the "Unassigned" Channel Group</h2>
      <p>GA4 evaluates incoming sessions against a rigid, sequential set of channel grouping definitions. If a session has tracking parameters, but the combination of <code>source</code> and <code>medium</code> fails to meet the criteria for Paid Search, Paid Social, Organic Social, Email, Affiliates, Display, or Referral, GA4 assigns it to <strong>Unassigned</strong>.</p>

      <h2 id="how-to-audit-unassigned-traffic">How to Audit What Lies Inside Your Unassigned Bucket</h2>
      <p>To see the exact parameters causing Unassigned traffic:</p>
      <ol>
        <li>Navigate to <strong>Reports &gt; Acquisition &gt; Traffic acquisition</strong>.</li>
        <li>Click the <code>+</code> icon next to <em>Session default channel group</em> to add a secondary dimension.</li>
        <li>Select <strong>Session source / medium</strong>.</li>
        <li>Filter the search bar for <code>Unassigned</code>.</li>
      </ol>
      <p>You will immediately see the rogue source/medium pairs that GA4 cannot categorize.</p>

      <h2 id="most-common-unassigned-mistakes">The 5 Most Common UTM Mistakes That Cause Unassigned</h2>
      <ul>
        <li><strong>Non-Standard Social Mediums:</strong> Using <code>utm_source=facebook&amp;utm_medium=fb_ad</code> or <code>utm_medium=promoted</code> instead of <code>paid_social</code>.</li>
        <li><strong>Custom Email Mediums:</strong> Using <code>utm_medium=klaviyo_flow</code> or <code>utm_medium=blast</code> instead of <code>email</code>.</li>
        <li><strong>Missing utm_source:</strong> Providing <code>utm_medium=cpc</code> without <code>utm_source</code>.</li>
        <li><strong>Typos and Case Errors:</strong> <code>utm_medium=CPC</code> or <code>utm_medium=PaidSocial</code> (in some older GA4 rule iterations, uppercase strings failed regex).</li>
        <li><strong>Event-Level Hits Without Session Context:</strong> Measurement Protocol server hits lacking session association.</li>
      </ul>

      <h2 id="how-to-fix-historical-and-future">How to Fix Unassigned Traffic: Present and Future</h2>
      <div class="callout callout-recommended">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <strong>Step 1: Fix Future Traffic with Standardized Presets</strong>
        </div>
        <p>Require your media team to generate URLs using <a href="/bulk-utm-builder/">UTMCraft Bulk Matrix</a> with pre-validated GA4 medium values.</p>
      </div>

      <div class="callout callout-recommended">
        <div class="callout-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <strong>Step 2: Clean Historical Reports with Custom Channel Groups</strong>
        </div>
        <p>In GA4 Admin, go to <strong>Data display &gt; Channel groups &gt; Create new channel group</strong>. Copy the default channel group, then add custom rules to map your legacy non-standard mediums (e.g. <code>fb_ad</code>, <code>klaviyo_flow</code>) into Paid Social and Email. This immediately cleans up your historical reporting dashboards without modifying raw underlying data.</p>
      </div>
    `
  },
  {
    slug: 'ga4-not-set',
    title: 'How to Fix (not set) Campaign and Source Data in GA4 Reports',
    seoTitle: 'Fix (not set) Campaign & Source Data in GA4 | UTMCraft',
    description: 'Why do you see (not set) for campaigns, sources, or landing pages in GA4? Learn the technical causes behind (not set) and how to resolve missing attribution.',
    category: 'ga4-attribution',
    isPillar: false,
    author: {
      name: 'DJ',
      role: 'Attribution & Analytics Architect',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-03-12',
    dateModified: '2026-09-23',
    reviewedDate: 'September 23, 2026',
    readingTime: '8 min read',
    primaryKeyword: 'ga4 not set',
    secondaryKeywords: ['not set campaign ga4', 'session source not set', 'why does ga4 show not set', 'fix not set google analytics'],
    semanticKeywords: ['session start event', 'measurement protocol session id', 'landing page not set', 'attribution data missing'],
    relatedEntities: ['Google Analytics 4', 'Data Quality', 'Measurement Protocol', 'Reporting Dimensions'],
    searchIntent: 'Diagnostic & Troubleshooting Guide',
    featuredImage: '/blog/images/ga4-not-set.webp',
    featuredImageAlt: 'Visual guide explaining why GA4 displays (not set) for campaign and source dimensions',
    tableOfContents: [
      { id: 'what-not-set-means', title: 'What (not set) Actually Means in GA4', level: 2 },
      { id: 'top-causes-of-not-set', title: 'The 5 Major Causes of (not set) in Acquisition Reports', level: 2 },
      { id: 'measurement-protocol-cause', title: 'Measurement Protocol and Server-Side Attribution Loss', level: 2 },
      { id: 'how-to-fix-not-set', title: 'Step-by-Step Fixes to Eliminate (not set)', level: 2 }
    ],
    toolCta: {
      title: 'Ensure Complete Parameter Coverage',
      description: 'Never launch a URL with missing required parameters. UTMCraft checks for mandatory source, medium, and campaign fields automatically.',
      link: '/',
      buttonText: 'Build Valid UTM URL'
    },
    relatedSlugs: ['ga4-utm-troubleshooting-guide', 'ga4-unassigned-traffic', 'ga4-utms-not-showing'],
    references: [
      { title: 'Why (not set) Appears in GA4 Reports', url: 'https://support.google.com/analytics/answer/2820710', publisher: 'Google Analytics Help' }
    ],
    contentHtml: `
      <p class="lead-text">Seeing <code>(not set)</code> in your Google Analytics 4 reports indicates that GA4 recorded an event, but the queried dimension was completely missing from the incoming event payload. Understanding why this happens allows you to fix underlying implementation defects.</p>

      <h2 id="what-not-set-means">What (not set) Actually Means in GA4</h2>
      <p><code>(not set)</code> is a placeholder name used by Google Analytics when it has not received any information for the dimension you have selected. For instance, if you view the <em>Session campaign</em> report and see <code>(not set)</code>, it means sessions were recorded where no campaign name could be determined.</p>

      <h2 id="top-causes-of-not-set">The 5 Major Causes of (not set) in Acquisition Reports</h2>
      <ol>
        <li><strong>Partial UTM Parameters:</strong> Someone tagged a link with <code>utm_source=google&amp;utm_medium=cpc</code>, but left <code>utm_campaign</code> completely blank. The resulting session campaign is <code>(not set)</code>.</li>
        <li><strong>Session Timeout Continuity:</strong> If a user leaves a browser tab open for over 30 minutes and later interacts with the page, GA4 generates a new session. If no referrer is present, the new session can register <code>(not set)</code> campaign dimensions.</li>
        <li><strong>Google Ads Auto-Tagging Without Link:</strong> GCLID is present on the URL, but the Google Ads account is not properly linked to the GA4 property.</li>
        <li><strong>Events Firing Before Config Tag:</strong> In Google Tag Manager, custom events triggered before the GA4 Configuration tag has initialized lack session context.</li>
        <li><strong>Measurement Protocol Server Hits:</strong> Offline webhook events sent without <code>ga_session_id</code>.</li>
      </ol>

      <h2 id="measurement-protocol-cause">Measurement Protocol and Server-Side Attribution Loss</h2>
      <p>When sending backend conversion events (such as CRM closed-won deals or subscription renewals) into GA4 via the Measurement Protocol API, you must include both the client ID (<code>client_id</code>) and the session ID (<code>ga_session_id</code>) inside the event params. If you omit <code>ga_session_id</code>, GA4 records the event as an orphaned hit, displaying <code>(not set)</code> for all session-scoped dimensions!</p>

      <h2 id="how-to-fix-not-set">Step-by-Step Fixes to Eliminate (not set)</h2>
      <ul>
        <li>Always supply <code>utm_source</code>, <code>utm_medium</code>, and <code>utm_campaign</code> together as an indivisible triad.</li>
        <li>Verify Google Ads account linking in GA4 Admin &gt; Product Links &gt; Google Ads Links.</li>
        <li>Audit GTM trigger order to guarantee the GA4 config tag fires before all conversion events.</li>
      </ul>
    `
  },
  {
    slug: 'redirects-removing-utms',
    title: 'Why HTTP Redirects Strip UTM Parameters (and How to Preserve Query Strings)',
    seoTitle: 'Why Redirects Strip UTMs & How to Fix Query Strings | UTMCraft',
    description: 'Learn why HTTP 301 and 302 redirects drop UTM parameters, converting paid campaigns into Direct traffic, and how to configure servers to preserve query strings.',
    category: 'ga4-attribution',
    isPillar: false,
    author: {
      name: 'DJ',
      role: 'Attribution & Analytics Architect',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-03-15',
    dateModified: '2026-09-23',
    reviewedDate: 'September 23, 2026',
    readingTime: '9 min read',
    primaryKeyword: 'redirects removing utms',
    secondaryKeywords: ['301 redirect utm parameters', 'preserve query string redirect', 'nginx preserve utm', 'apache redirect keep query string'],
    semanticKeywords: ['http 301 302 redirect', 'query string append qsa', 'trailing slash redirect', 'dark traffic redirect'],
    relatedEntities: ['Web Server Configuration', 'HTTP Status Codes', 'Google Analytics 4', 'Nginx Apache Cloudflare'],
    searchIntent: 'Technical How-to & Server Configuration Guide',
    featuredImage: '/blog/images/redirects-removing-utms.webp',
    featuredImageAlt: 'Technical diagram showing how an HTTP 301 redirect strips query parameters vs preserving them with QSA',
    tableOfContents: [
      { id: 'the-mechanics-of-parameter-loss', title: 'The Mechanics of Parameter Loss During Redirects', level: 2 },
      { id: 'server-config-nginx-apache', title: 'Server Configuration Fixes: Nginx, Apache & Cloudflare', level: 2 },
      { id: 'trailing-slash-trap', title: 'The Trailing Slash Trap', level: 2 },
      { id: 'how-to-test-redirect-health', title: 'How to Test Redirect Chains via CLI and UTMCraft', level: 2 }
    ],
    toolCta: {
      title: 'Test If Your Redirects Strip UTMs',
      description: 'Run your landing page through the UTM Link Checker to verify whether redirects preserve or delete your tracking query strings.',
      link: '/utm-checker/',
      buttonText: 'Run Redirect & UTM Audit'
    },
    relatedSlugs: ['ga4-utm-troubleshooting-guide', 'ga4-direct-traffic-troubleshooting', 'how-to-test-utms', 'utm-qa-checklist'],
    references: [
      { title: 'HTTP/1.1 Redirection Specification (RFC 7231)', url: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.4', publisher: 'IETF' }
    ],
    contentHtml: `
      <p class="lead-text">Server redirects are responsible for more lost marketing attribution than ad blockers and iOS privacy updates combined. If your marketing URL undergoes a 301 or 302 redirect that does not explicitly append the incoming query string, every single UTM parameter is discarded before the visitor hits your analytics tracking tag.</p>

      <h2 id="the-mechanics-of-parameter-loss">The Mechanics of Parameter Loss During Redirects</h2>
      <p>When a browser requests a URL like <code>https://example.com/signup?utm_source=google</code>, the server may issue an HTTP 301 redirect to normalize the URL (e.g. enforce HTTPS, www, or trailing slash). If the server rule is written as:</p>
      <div class="code-block-wrap">
        <pre><code class="language-nginx"># INCORRECT NGINX CONFIGURATION (Drops query string)
return 301 https://example.com/signup/;</code></pre>
      </div>
      <p>The browser obediently navigates to <code>https://example.com/signup/</code> with <strong>zero query parameters</strong>. GA4 loads, sees no UTMs and no referrer, and attributes the conversion to Direct traffic.</p>

      <h2 id="server-config-nginx-apache">Server Configuration Fixes: Nginx, Apache & Cloudflare</h2>

      <h3>1. Nginx Query String Preservation</h3>
      <p>In Nginx, always append <code>$is_args$args</code> (or <code>$request_uri</code> for full path preservation):</p>
      <div class="code-block-wrap">
        <pre><code class="language-nginx"># CORRECT NGINX REDIRECT
rewrite ^/signup/?$ /signup/ permanent; # Automatically preserves query string
# Or for manual returns:
return 301 https://example.com/signup/$is_args$args;</code></pre>
        <button class="copy-code-btn" data-copy="return 301 https://example.com/signup/$is_args$args;" aria-label="Copy Nginx snippet">Copy Nginx</button>
      </div>

      <h3>2. Apache mod_rewrite with [QSA]</h3>
      <p>In Apache <code>.htaccess</code>, you must include the <strong>[QSA]</strong> (Query String Append) flag:</p>
      <div class="code-block-wrap">
        <pre><code class="language-apache"># CORRECT APACHE HTACCESS RULE
RewriteEngine On
RewriteRule ^signup$ /signup/ [R=301,L,QSA]</code></pre>
        <button class="copy-code-btn" data-copy="RewriteRule ^signup$ /signup/ [R=301,L,QSA]" aria-label="Copy Apache snippet">Copy Apache</button>
      </div>

      <h3>3. Cloudflare Redirect Rules</h3>
      <p>In Cloudflare Page Rules or Redirect Rules, select <strong>"Preserve query string"</strong> checkbox. If using Dynamic Redirect expressions, use <code>concat("https://example.com/signup/", http.request.uri.query)</code>.</p>

      <h2 id="trailing-slash-trap">The Trailing Slash Trap</h2>
      <p>The most common redirect culprit is the trailing slash. If your CMS (such as WordPress) requires trailing slashes on pages, but your media buyer enters <code>https://example.com/pricing?utm_source=meta</code>, WordPress executes a 301 redirect to <code>/pricing/</code>. Always build URLs matching your canonical format exactly!</p>

      <h2 id="how-to-test-redirect-health">How to Test Redirect Chains via CLI and UTMCraft</h2>
      <p>Use curl in your terminal to inspect redirect hops:</p>
      <div class="code-block-wrap">
        <pre><code class="language-bash">curl -ILs "https://yourdomain.com/landing?utm_source=test" | grep -iE "HTTP|Location"</code></pre>
        <button class="copy-code-btn" data-copy="curl -ILs &quot;https://yourdomain.com/landing?utm_source=test&quot; | grep -iE &quot;HTTP|Location&quot;" aria-label="Copy curl command">Copy</button>
      </div>
      <p>Verify that every <code>Location:</code> response header retains <code>?utm_source=test</code> until the final <code>HTTP/2 200</code> response.</p>
    `
  },
  {
    slug: 'how-to-test-utms',
    title: 'How to Test and QA UTM Parameters in GA4 DebugView and Realtime',
    seoTitle: 'How to Test UTMs in GA4 DebugView & Realtime | UTMCraft',
    description: 'Learn how to test and verify UTM tracking in Google Analytics 4 before spending ad budget. Step-by-step guide using DebugView, Realtime, and DevTools.',
    category: 'ga4-attribution',
    isPillar: false,
    author: {
      name: 'DJ',
      role: 'Attribution & Analytics Architect',
      url: 'https://utmcraft.com/'
    },
    datePublished: '2026-03-18',
    dateModified: '2026-09-23',
    reviewedDate: 'September 23, 2026',
    readingTime: '8 min read',
    primaryKeyword: 'how to test utms',
    secondaryKeywords: ['test utm parameters ga4', 'ga4 debugview test utm', 'how to verify utm tracking', 'test campaign tracking'],
    semanticKeywords: ['ga4 realtime reports', 'google analytics debugger extension', 'session start payload', 'devtools network test'],
    relatedEntities: ['Google Analytics 4', 'DebugView', 'Quality Assurance', 'Tag Verification'],
    searchIntent: 'How-to & Step-by-Step QA Guide',
    featuredImage: '/blog/images/how-to-test-utms.webp',
    featuredImageAlt: 'Walkthrough illustration of testing a campaign link in GA4 DebugView and inspecting incoming event parameters',
    tableOfContents: [
      { id: 'why-test-before-spending', title: 'Why You Must Test Before Spending Ad Dollars', level: 2 },
      { id: 'the-debugview-method', title: 'Method 1: Testing with GA4 DebugView (Recommended)', level: 2 },
      { id: 'the-realtime-method', title: 'Method 2: Testing with GA4 Realtime Reports', level: 2 },
      { id: 'browser-devtools-inspection', title: 'Method 3: Inspecting Network Payloads in Chrome DevTools', level: 2 },
      { id: 'qa-signoff-criteria', title: 'QA Sign-off Criteria for Media Teams', level: 2 }
    ],
    toolCta: {
      title: 'Pre-Validate Tracking Parameters',
      description: 'Audit your links before running live tests. UTMCraft checks syntax, casing, duplicate delimiters, and GA4 compatibility automatically.',
      link: '/utm-checker/',
      buttonText: 'Open UTM Checker'
    },
    relatedSlugs: ['ga4-utm-troubleshooting-guide', 'utm-qa-checklist', 'ga4-utms-not-showing'],
    references: [
      { title: 'Monitor Events in GA4 DebugView', url: 'https://support.google.com/analytics/answer/7201382', publisher: 'Google Analytics Help' }
    ],
    contentHtml: `
      <p class="lead-text">Do not wait 48 hours for standard GA4 acquisition reports to discover your paid campaign has a broken parameter. By utilizing GA4 DebugView and Realtime reports, you can verify that your UTM parameters, session source, and medium are capturing accurately within 60 seconds.</p>

      <h2 id="why-test-before-spending">Why You Must Test Before Spending Ad Dollars</h2>
      <p>Testing tracking links before launch ensures that:</p>
      <ul>
        <li>Query strings are not stripped by server redirects.</li>
        <li><code>utm_medium</code> properly matches GA4 Default Channel Grouping rules.</li>
        <li>Form submission capture scripts grab the incoming parameters for your CRM.</li>
      </ul>

      <h2 id="the-debugview-method">Method 1: Testing with GA4 DebugView (Recommended)</h2>
      <p>DebugView is GA4's premier diagnostic tool. It isolates your test events from production traffic in real time.</p>
      <ol>
        <li>Append <code>debug_mode=true</code> to your test campaign link:
          <div class="code-block-wrap">
            <pre><code>https://example.com/demo?utm_source=test_source&amp;utm_medium=paid_social&amp;utm_campaign=test_campaign&amp;debug_mode=true</code></pre>
          </div>
        </li>
        <li>Open the link in an Incognito browser window.</li>
        <li>In GA4, go to <strong>Admin &gt; DebugView</strong>.</li>
        <li>Select your device from the <strong>Debug Device</strong> dropdown in the top-left.</li>
        <li>Click the incoming <code>page_view</code> and <code>session_start</code> events in the waterfall timeline.</li>
        <li>Inspect the parameter drawer: verify <code>source</code>, <code>medium</code>, and <code>campaign</code> display your test values.</li>
      </ol>

      <h2 id="the-realtime-method">Method 2: Testing with GA4 Realtime Reports</h2>
      <p>If you prefer not to use debug flags:</p>
      <ol>
        <li>Open your test link in an Incognito window.</li>
        <li>Navigate to <strong>Reports &gt; Realtime</strong> in GA4.</li>
        <li>Scroll down to the <strong>Users by First user source / medium</strong> or <strong>Users by Session source / medium</strong> card.</li>
        <li>Confirm your active session appears under the specified source and medium.</li>
      </ol>

      <h2 id="browser-devtools-inspection">Method 3: Inspecting Network Payloads in Chrome DevTools</h2>
      <p>For technical marketers who want to inspect the exact outgoing hit before it reaches Google's servers:</p>
      <ol>
        <li>Open Chrome DevTools (F12) and select the <strong>Network</strong> tab.</li>
        <li>Filter the request list by <code>collect?v=2</code>.</li>
        <li>Refresh your landing page with UTMs.</li>
        <li>Click on the request to <code>google-analytics.com/g/collect</code>.</li>
        <li>Inspect the <strong>Payload</strong> tab: Look for parameters:
          <ul>
            <li><code>cs</code> = Campaign Source (<code>utm_source</code>)</li>
            <li><code>cm</code> = Campaign Medium (<code>utm_medium</code>)</li>
            <li><code>cn</code> = Campaign Name (<code>utm_campaign</code>)</li>
            <li><code>ck</code> = Campaign Term (<code>utm_term</code>)</li>
            <li><code>cc</code> = Campaign Content (<code>utm_content</code>)</li>
          </ul>
        </li>
      </ol>
    `
  }
];
