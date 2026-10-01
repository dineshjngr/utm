// Reporting guidance checked against Google documentation on October 1, 2026.
export const aiTrafficPosts = [
  {
    slug: 'track-ai-assistant-traffic-ga4',
    title: 'How to Track AI Assistant Traffic in GA4: ChatGPT, Gemini and Claude',
    seoTitle: 'Track AI Assistant Traffic in GA4: Setup & Reporting',
    description: 'Track ChatGPT, Gemini and Claude traffic in GA4. Find the AI Assistant channel, audit missing referrals, test UTMs and measure leads without overstating results.',
    category: 'ga4-attribution',
    isPillar: false,
    author: { name: 'Dinesh Jeengar', role: 'Founder, UTMCraft', url: 'https://utmcraft.com/about/' },
    datePublished: '2026-10-01',
    dateModified: '2026-10-01',
    reviewedDate: 'October 1, 2026',
    readingTime: '12 min read',
    primaryKeyword: 'track AI assistant traffic in GA4',
    secondaryKeywords: ['GA4 AI Assistant channel', 'ChatGPT referral traffic', 'Gemini traffic GA4', 'Claude traffic GA4'],
    semanticKeywords: ['session source medium', 'AI referral attribution', 'custom channel groups', 'landing page reporting', 'session key event rate'],
    relatedEntities: ['Google Analytics 4', 'ChatGPT', 'Gemini', 'Claude', 'Google Search Console'],
    searchIntent: 'Practical setup, measurement and troubleshooting guide',
    featuredImage: '/blog/images/ai-assistant-traffic-ga4-chatgpt-gemini-claude.webp',
    featuredImageAlt: 'Illustration of ChatGPT, Gemini and Claude traffic flowing into a GA4 dashboard with example metrics',
    featuredImageMetadata: { width: 1200, height: 630, type: 'image/webp' },
    preserveFeaturedImage: true,
    tableOfContents: [
      { id: 'quick-start', title: 'Quick start: find AI traffic', level: 2 },
      { id: 'what-ga4-measures', title: 'What the AI Assistant channel measures', level: 2 },
      { id: 'ai-assistants-vs-google-search', title: 'AI assistants vs Google AI search', level: 2 },
      { id: 'build-a-report', title: 'Build a useful AI traffic report', level: 2 },
      { id: 'custom-channel-group', title: 'When a custom channel group helps', level: 2 },
      { id: 'utm-tagging', title: 'Use UTMs only where you control links', level: 2 },
      { id: 'test-attribution', title: 'Test the click and attribution', level: 2 },
      { id: 'troubleshooting', title: 'Troubleshoot missing AI traffic', level: 2 },
      { id: 'measure-business-value', title: 'Measure leads and revenue responsibly', level: 2 },
      { id: 'faq', title: 'Frequently asked questions', level: 2 }
    ],
    toolCta: {
      title: 'Check the Campaign Links You Control',
      description: 'Inspect UTM values and URL syntax before distributing a tagged link. Verify the real click path and GA4 attribution separately.',
      link: '/utm-checker/',
      buttonText: 'Open the UTM Checker'
    },
    relatedSlugs: ['ga4-direct-traffic-troubleshooting', 'how-to-test-utms', 'storing-utm-parameters-in-crm'],
    references: [
      { title: 'What’s new in Google Analytics: May 13, 2026', url: 'https://support.google.com/analytics/answer/9164320?hl=en#05132026', publisher: 'Google Analytics Help' },
      { title: 'Default channel group: AI Assistant definitions and rules', url: 'https://support.google.com/analytics/answer/9756891?hl=en', publisher: 'Google Analytics Help' },
      { title: 'Traffic acquisition report', url: 'https://support.google.com/analytics/answer/12923437?hl=en', publisher: 'Google Analytics Help' },
      { title: 'User acquisition vs Traffic acquisition', url: 'https://support.google.com/analytics/answer/14731736?hl=en', publisher: 'Google Analytics Help' },
      { title: 'Custom channel groups', url: 'https://support.google.com/analytics/answer/13051316?hl=en', publisher: 'Google Analytics Help' },
      { title: 'Collect campaign data with custom URLs', url: 'https://support.google.com/analytics/answer/10917952?hl=en', publisher: 'Google Analytics Help' },
      { title: 'Analytics event parameters: page_location and page_referrer', url: 'https://support.google.com/analytics/table/13594742?hl=en', publisher: 'Google Analytics Help' },
      { title: 'Monitor events in DebugView', url: 'https://support.google.com/analytics/answer/7201382?hl=en', publisher: 'Google Analytics Help' },
      { title: 'Data freshness', url: 'https://support.google.com/analytics/answer/11198161?hl=en', publisher: 'Google Analytics Help' },
      { title: 'Search Generative AI performance reports: worldwide rollout update', url: 'https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports', publisher: 'Google Search Central' }
    ],
    contentHtml: `
      <p class="lead-text">To track AI assistant traffic in GA4, start with the <strong>AI Assistant</strong> row in your Traffic acquisition report, then break it down by session source and landing page. This gives you a practical view of visits attributed to assistants such as ChatGPT, Gemini and Claude. Then check whether those visitors sign up, submit a lead or buy. An AI mention does not necessarily lead to a visit.</p>
      <p><strong>Documentation checked: October 1, 2026.</strong> This guide separates Google’s documented reporting behavior from our suggested audit workflow. Regex patterns, tagging examples and sample results below are illustrative; they are not measurements from a live GA4 property.</p>

      <h2 id="quick-start">Quick start: find AI assistant traffic in GA4</h2>
      <ol>
        <li>Open the correct GA4 property and go to <strong>Reports → Acquisition → Traffic acquisition</strong>. If the report is missing from your navigation, an Editor can add it back.</li>
        <li>Choose <strong>Session default channel group</strong> as the table’s primary dimension.</li>
        <li>Search the table for <strong>AI Assistant</strong>, or apply an Include filter where Session default channel group exactly matches that value.</li>
        <li>Add <strong>Session source / medium</strong> as a secondary dimension to see the sources behind the channel.</li>
        <li>Use a completed reporting period, such as the last full month. Compare sessions, engagement and the key event that represents your business goal.</li>
      </ol>
      <p>Google’s <a href="https://support.google.com/analytics/answer/12923437?hl=en" target="_blank" rel="noopener">Traffic acquisition documentation</a> explains the report and filters. A missing row is a reason to investigate source data; it does not prove that nobody discovered you through AI.</p>

      <h2 id="what-ga4-measures">What the AI Assistant channel actually measures</h2>
      <p>Google announced native AI assistant measurement on <a href="https://support.google.com/analytics/answer/9164320?hl=en#05132026" target="_blank" rel="noopener">May 13, 2026</a>. When a referrer matches a recognized assistant, Google documents an automatically assigned medium of <code>ai-assistant</code>, an AI Assistant channel, and a campaign name of <code>(ai-assistant)</code>.</p>
      <p>The current <a href="https://support.google.com/analytics/answer/9756891?hl=en" target="_blank" rel="noopener">default channel rules</a> specify an exact medium match of <code>ai-assistant</code>. Native recognition means a custom regex is not the starting requirement for supported traffic.</p>
      <div class="callout callout-recommended">
        <div class="callout-header"><strong>What you can measure</strong></div>
        <ul>
          <li><strong>Visibility:</strong> did an assistant show or mention your page?</li>
          <li><strong>Acquisition:</strong> did someone arrive with a source signal GA4 could use?</li>
          <li><strong>Outcome:</strong> did the visit lead to a signup, qualified lead or purchase?</li>
        </ul>
        <p>A traffic report answers the second question and helps analyze the third. It is not a complete inventory of AI citations, prompts or brand mentions.</p>
      </div>
      <p>Use <strong>session</strong> dimensions for a visit-based baseline. <a href="https://support.google.com/analytics/answer/14731736?hl=en" target="_blank" rel="noopener">User acquisition and Traffic acquisition have different scopes</a>: a customer originally acquired through email can later arrive from an AI assistant without changing the source that first acquired them.</p>

      <h2 id="ai-assistants-vs-google-search">ChatGPT, Gemini and Claude vs Google AI Overviews and AI Mode</h2>
      <p>Google explicitly excludes <strong>AI Overviews and AI Mode</strong> from the AI Assistant channel. Their non-ad search visits belong to <strong>Organic Search</strong>. A visit from the standalone Gemini assistant should therefore be evaluated separately from a Google Search visit involving an AI feature.</p>
      <div class="editorial-table-wrap">
        <table class="editorial-table">
          <caption>Use the reporting tool that matches the measurement question</caption>
          <thead><tr><th scope="col">Journey or question</th><th scope="col">Where to look</th><th scope="col">What to avoid concluding</th></tr></thead>
          <tbody>
            <tr><td>Visit attributed to ChatGPT, Gemini or Claude</td><td>GA4 AI Assistant channel, then Session source / medium</td><td>The channel captures every visit influenced by that assistant.</td></tr>
            <tr><td>Organic visit from Google AI Overviews or AI Mode</td><td>GA4 Organic Search for on-site behavior</td><td>Every google / organic session came from an AI feature.</td></tr>
            <tr><td>Your pages’ visibility within Google’s generative AI features</td><td>Search Console Generative AI performance reports</td><td>Impressions equal visits, or include ChatGPT and Claude visibility.</td></tr>
            <tr><td>A visitor copies a URL or returns later without a source signal</td><td>Check collected data and supplementary attribution evidence</td><td>A Direct session proves an AI origin.</td></tr>
          </tbody>
        </table>
      </div>
      <p>For Google AI visibility, use the dedicated <a href="https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports" target="_blank" rel="noopener">Search Console Generative AI performance reports</a>. Google’s June announcement, updated August 31, says the insights rolled out worldwide and describes impressions, pages, countries, devices and dates. That is different from identifying a GA4 session’s source. Avoid promising a session-level connection between an impression in Search Console and a conversion in Analytics.</p>

      <h2 id="build-a-report">Build a report by source and landing page</h2>
      <p>Start with two views: <strong>which assistants send attributable visits</strong> and <strong>which entry pages help those visitors complete a goal</strong>. Keep the same date range and key event selection in both.</p>
      <h3>View 1: source and outcomes</h3>
      <p>In Traffic acquisition, keep the AI Assistant filter and use Session source / medium. Include Sessions, Engaged sessions, Engagement rate, Key events, and Session key event rate where available. Select the relevant key event, such as <code>generate_lead</code> or <code>purchase</code>, rather than pooling every action into one success measure.</p>
      <h3>View 2: entry pages</h3>
      <p>For a flexible breakdown, create a <strong>Free-form exploration</strong>. Import Session default channel group, Session source / medium, and Landing page + query string. Import your session and outcome metrics, add the AI Assistant filter, and place source and landing page in the rows. Keep the channel filter while changing the row dimensions.</p>
      <p>If query strings create many versions of the same entry page, summarize them by the base page when reviewing content performance. Keep the query-string version for debugging. Landing pages answer where sessions began; a general page-view report also includes pages visited later.</p>
      <ul>
        <li><strong>Many visits, few qualified leads:</strong> review the page’s promise, next step and visitor intent.</li>
        <li><strong>Few visits, useful leads:</strong> inspect the content and lead quality before deciding whether to expand the topic.</li>
        <li><strong>An abrupt change:</strong> check measurement and channel rules before crediting a content edit.</li>
      </ul>

      <h2 id="custom-channel-group">When to use a custom AI channel group</h2>
      <p>Use the native channel as your baseline. Add a custom audit group if you want to compare older source records, inspect known assistant domains outside the native channel, or apply an explicitly documented source list. <a href="https://support.google.com/analytics/answer/13051316?hl=en" target="_blank" rel="noopener">Google supports custom groups retroactively</a> and requires Editor access or higher to create them.</p>
      <p>This rule matches specific hostnames. Broad expressions containing just <code>ai</code>, <code>google</code> or <code>openai</code> can include unrelated referrals. Even a matching hostname is evidence of a source, not proof that a particular answer cited you.</p>
      <div class="code-block-wrap"><pre><code>^(chatgpt\\.com|chat\\.openai\\.com|gemini\\.google\\.com|claude\\.ai|perplexity\\.ai|copilot\\.microsoft\\.com)$</code></pre></div>
      <p><strong>Apply this pattern to Source, or Session source in an exploration.</strong> The combined source / medium field needs a different pattern. It is a conservative starter list, not Google’s complete recognized-assistant list. Review source values in your own data and add verified hosts or subdomains as needed.</p>
      <ol>
        <li>Go to <strong>Admin → Data display → Channel groups</strong> and create a group by copying an existing one.</li>
        <li>Name the audit channel <strong>AI assistants: audit</strong>.</li>
        <li>Add one condition group where <strong>Default channel group exactly matches AI Assistant</strong>.</li>
        <li>Add an <strong>OR</strong> condition group where <strong>Source matches regex</strong> using the pattern above and <strong>Medium exactly matches referral</strong>. The medium restriction keeps this fallback focused on referrals.</li>
        <li>Move the audit channel above Referral and the copied AI Assistant channel. Save and use the <strong>session version of your custom group</strong> in reporting.</li>
      </ol>
      <p>You can use this setup to audit your source data. Test both branches before adopting it. Keep the native report alongside it; avoid changing your property’s primary channel group merely to investigate AI sources.</p>
      <p>A custom group can reclassify available records. It cannot recreate a referrer that was never collected, identify an unknown Direct visit, or make historical native-channel totals comparable automatically. Document the rule and the date you changed it.</p>

      <h2 id="utm-tagging">Use UTMs only where you control the distributed link</h2>
      <p>You do not control the URL every public assistant chooses to cite. Leave your normal website links clean. For links you distribute through your own assistant experience or a controlled placement, <a href="https://support.google.com/analytics/answer/10917952?hl=en" target="_blank" rel="noopener">manual campaign tagging</a> can identify a specific initiative.</p>
      <p>For example, suppose you manage a branded assistant and can configure its outbound website link. An illustrative URL is:</p>
      <div class="code-block-wrap"><pre><code>https://example.com/demo/?utm_source=brand_assistant&amp;utm_medium=ai-assistant&amp;utm_campaign=product_help&amp;utm_content=demo_link</code></pre></div>
      <ul>
        <li><code>utm_source=brand_assistant</code> identifies the experience you actually control.</li>
        <li><code>utm_medium=ai-assistant</code> uses the documented AI Assistant medium.</li>
        <li><code>utm_campaign=product_help</code> distinguishes the initiative.</li>
        <li><code>utm_content=demo_link</code> distinguishes the placement within that initiative.</li>
      </ul>
      <p>Build controlled URLs with the <a href="/campaign-url-builder/">campaign URL builder</a> and follow a stable <a href="/utm-naming-conventions-guide/">UTM naming convention</a>. Validate the processed result: manually tagged campaigns and other classification rules can affect what appears in reports.</p>
      <p><strong>Tag the actual distribution channel.</strong> A newsletter about ChatGPT still uses your email source and medium. Do not label it AI traffic just because the topic is AI. Likewise, putting an AI UTM on every internal link would manufacture source labels rather than measure discovery. Do not assume every assistant adds UTMs, and do not put personal data or private conversation text into a tracking URL.</p>

      <h2 id="test-attribution">Test the real click path before trusting the report</h2>
      <p>Use this repeatable QA procedure for each assistant and device experience that matters to you. A tagged test validates your controlled URL; an untagged click from a real assistant tests whether a referrer survives that particular journey. These are different tests.</p>
      <ol>
        <li><strong>Prepare a clean visit.</strong> Use a fresh browser profile with tracking allowed under your normal consent settings. Record the assistant, browser, device, test time and destination. An existing session can complicate interpretation.</li>
        <li><strong>Click the actual link.</strong> For a referral test, follow a real link from the assistant. Pasting a destination into the address bar does not reproduce the referral journey.</li>
        <li><strong>Check the final URL.</strong> Record any parameters before and after redirects. A shortcut, consent flow or redirect may change the destination. Use our <a href="/redirects-removing-utms/">redirect troubleshooting guide</a> if tags disappear.</li>
        <li><strong>Check collection.</strong> In browser developer tools or your tag-debugging workflow, inspect the initial analytics event. Check <code>page_location</code> for the landing URL and <code>page_referrer</code> for the referring URL, where present. Google documents these in its <a href="https://support.google.com/analytics/table/13594742?hl=en" target="_blank" rel="noopener">event parameter reference</a>.</li>
        <li><strong>Confirm the intended action.</strong> Enable debug mode for a controlled test and use <a href="https://support.google.com/analytics/answer/7201382?hl=en" target="_blank" rel="noopener">DebugView</a> to check page and goal events. A missing debug event can reflect debug-mode or consent configuration, so check collection as well.</li>
        <li><strong>Recheck processed attribution.</strong> Compare the recorded visit with session reporting once processing has completed. Google says <a href="https://support.google.com/analytics/answer/11198161?hl=en" target="_blank" rel="noopener">processing can take 24–48 hours</a> and report values can change during that period.</li>
      </ol>
      <p>Use DebugView to inspect events, then check channel attribution in processed reports. Our <a href="/how-to-test-utms/">UTM testing guide</a> covers the broader QA workflow. Avoid logging sensitive referring URLs into a shared test sheet.</p>

      <h2 id="troubleshooting">Why AI traffic is missing, Direct or Referral</h2>
      <div class="editorial-table-wrap">
        <table class="editorial-table">
          <caption>Check the source signal before changing classification rules</caption>
          <thead><tr><th scope="col">Symptom</th><th scope="col">What to check</th><th scope="col">Useful response</th></tr></thead>
          <tbody>
            <tr><td>No AI Assistant row</td><td>Date range, session dimension, assistant source rows and recent processing</td><td>Audit Session source / medium before assuming zero AI discovery.</td></tr>
            <tr><td>A known assistant source appears under Referral</td><td>The exact source, medium, custom-group rules and collected referrer</td><td>Preserve the native view; compare a narrowly defined audit group.</td></tr>
            <tr><td>A test appears as Direct</td><td>Missing referrer, lost UTMs, existing session and the real click path</td><td>Repeat a clean test. A regex cannot identify an empty source signal.</td></tr>
            <tr><td>Tagged traffic appears as Unassigned</td><td>Exact medium value, spelling, casing and competing rules</td><td>Compare against documented definitions; inspect the final URL.</td></tr>
            <tr><td>No events from the test</td><td>Correct property and stream, tag loading, consent, blocking and active filters</td><td>Resolve collection before diagnosing the channel.</td></tr>
            <tr><td>A custom report finds more AI sessions</td><td>Added hosts, overlapping rules, historical range and non-referral matches</td><td>Investigate the difference; do not treat the larger number as inherently more accurate.</td></tr>
          </tbody>
        </table>
      </div>
      <p>Use the table to decide what to test next. Test desktop and mobile separately rather than assuming identical behavior. For wider issues, use the <a href="/ga4-direct-traffic-troubleshooting/">Direct traffic diagnosis guide</a> or the <a href="/ga4-unassigned-traffic/">Unassigned traffic checklist</a>.</p>
      <p>A rise in Direct traffic after an AI mention can support a hypothesis, but it cannot identify individual sessions as AI-sourced. Keep self-reported discovery, such as an optional “How did you hear about us?” answer, alongside analytics attribution rather than overwriting it.</p>

      <h2 id="measure-business-value">Measure leads and revenue without overstating AI’s impact</h2>
      <p>Use <strong>Session key event rate</strong> for the percentage of sessions that contained the selected key event. Google defines the metric in the <a href="https://support.google.com/analytics/answer/12923437?hl=en" target="_blank" rel="noopener">Traffic acquisition report reference</a>. Repeated events matter: dividing the number of event occurrences by sessions is not always the same calculation.</p>
      <p><strong>Illustrative example:</strong> 200 AI-attributed sessions produce 12 lead-event occurrences, but only 8 distinct sessions contain that event. The session key event rate is <strong>8 ÷ 200 = 4%</strong>, not 6%. If only 3 leads qualify in your CRM, report those 3 qualified leads separately. Eight sessions with a lead event do not necessarily represent eight unique qualified people.</p>
      <p>Review source and landing page alongside the following measures:</p>
      <ul>
        <li><strong>Sessions and engaged sessions:</strong> acquisition volume and on-site engagement.</li>
        <li><strong>Selected key event rate:</strong> how often a visit includes the intended action.</li>
        <li><strong>Qualified leads or completed sales:</strong> whether the outcome has business value.</li>
        <li><strong>Revenue:</strong> where ecommerce measurement is valid, with the attribution scope stated.</li>
        <li><strong>Sample size:</strong> show the counts behind percentages before drawing comparisons.</li>
      </ul>
      <p>For lead generation, preserve first-touch and latest-touch campaign evidence where appropriate and use our <a href="/storing-utm-parameters-in-crm/">CRM UTM capture guide</a>. Keep self-reported AI discovery in a separate field. Someone can first hear about you in Claude, search Google later, and submit a form during an organic-search visit; those records describe different parts of the journey.</p>
      <p>For a monthly review, record the date range, native channel totals, custom-rule version, top sources, entry pages, selected goal and qualified outcomes. Compare like periods and note measurement changes. Treat a shift around the May rollout or a custom-rule change as a possible reporting discontinuity before declaring traffic growth.</p>

      <h2 id="faq">Frequently asked questions</h2>
      <div class="faq-item"><h3>Do I need a custom regex to track ChatGPT traffic?</h3><p>Start with the native AI Assistant channel. Use a custom audit rule only to investigate additional recorded sources or historical data. Neither method recovers a source signal that was never collected.</p></div>
      <div class="faq-item"><h3>Can GA4 show the exact prompt that sent a visitor?</h3><p>The AI Assistant channel does not provide a prompt report. A source or referring URL should not be interpreted as a transcript of someone’s conversation.</p></div>
      <div class="faq-item"><h3>Should I tag every website link with utm_source=chatgpt?</h3><p>No. Tag only controlled distributed links whose source you can truthfully identify. Adding an AI label to normal website or newsletter links would make the report misleading.</p></div>
      <div class="faq-item"><h3>Does the channel measure AI crawler activity?</h3><p>Do not use the channel as an AI crawler inventory. It classifies analytics traffic using source signals. Inspect server or CDN logs for requests from crawlers, and keep that analysis separate from visitor acquisition.</p></div>
      <div class="faq-item"><h3>Can I count Direct sessions as hidden AI traffic?</h3><p>Not reliably from the Direct label alone. Use click-path tests and supplementary discovery evidence to investigate. Avoid applying a guessed percentage to Direct traffic and presenting it as measured AI sessions.</p></div>
      <div class="faq-item"><h3>Can I compare the native channel with last year?</h3><p>First inspect the available history and definitions. Do not assume native recognition is backfilled consistently. A documented custom group can help review historical source records, but it cannot recover missing attribution evidence.</p></div>
    `
  }
];
