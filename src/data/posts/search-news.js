export const searchNewsPosts = [
  {
    slug: 'google-september-2026-spam-update',
    title: "Google Begins September 2026 Spam Update: Global Rollout May Take Two Weeks",
    seoTitle: "Google September 2026 Spam Update: What We Know | UTMCraft",
    description: 'Google began its September 2026 spam update on September 24. The rollout applies globally, covers all languages, and may take up to two weeks.',
    category: 'search-news',
    isPillar: false,
    author: {
      name: 'Dinesh Jeengar',
      role: 'Search & Analytics Editor',
      url: 'https://utmcraft.com/about/'
    },
    datePublished: '2026-09-28',
    dateModified: '2026-09-28',
    reviewedDate: 'September 28, 2026',
    readingTime: '4 min read',
    primaryKeyword: 'September 2026 Google spam update',
    secondaryKeywords: ['Google spam update September 2026', 'Google search ranking update', 'Google spam update rollout'],
    semanticKeywords: ['Google Search Status Dashboard', 'global spam update', 'ranking systems', 'spam policies'],
    relatedEntities: ['Google Search', 'Google Search Status Dashboard', 'Google Search spam updates'],
    searchIntent: 'Search News & Ranking Update',
    featuredImage: '/blog/images/google-september-2026-spam-update.webp',
    featuredImageAlt: 'Google Search Console shown through a magnifying glass beside a graphic about the September 2026 spam update',
    preserveFeaturedImage: true,
    tableOfContents: [
      { id: 'what-google-confirmed', title: 'What Google Confirmed', level: 2 },
      { id: 'how-this-rollout-compares', title: 'How This Rollout Compares With Earlier 2026 Spam Updates', level: 2 },
      { id: 'what-google-has-not-said', title: 'What Google Has Not Said', level: 2 },
      { id: 'what-site-owners-should-do', title: 'What Site Owners Should Do Now', level: 2 }
    ],
    toolCta: {
      title: 'Keep Search and Analytics Signals Separate',
      description: 'Compare organic search changes with GA4 session attribution carefully. Use our guide to diagnose UTM and session-source discrepancies.',
      link: '/ga4-utm-troubleshooting-guide/',
      buttonText: 'Read the GA4 Troubleshooting Guide'
    },
    relatedSlugs: ['utm-tracking-audit-signs', 'ga4-utms-not-showing', 'utm-tracking-mistakes'],
    references: [
      { title: 'September 2026 spam update - Google Search Status Dashboard', url: 'https://status.search.google.com/incidents/XhUDXP7A67iHCD2kmbVu', publisher: 'Google Search Status Dashboard' },
      { title: 'Google Search ranking updates history', url: 'https://status.search.google.com/summary', publisher: 'Google Search Status Dashboard' },
      { title: 'Google Search spam updates and your site', url: 'https://developers.google.com/search/docs/appearance/spam-updates', publisher: 'Google Search Central' }
    ],
    contentHtml: `
      <p class="lead-text">Google began rolling out its September 2026 spam update on September 24. The company says the update applies globally and to all languages, and that rollout may take up to two weeks. Google has not announced a specific target or described the system changes behind this update.</p>

      <h2 id="what-google-confirmed">What Google Confirmed</h2>
      <p>The <a href="https://status.search.google.com/incidents/XhUDXP7A67iHCD2kmbVu" target="_blank" rel="noopener">Google Search Status Dashboard</a> records the rollout start as September 24, 2026 at 09:15 PDT. It classifies the incident as affecting ranking and says the update applies globally, across all languages. Google’s stated completion window is up to two weeks.</p>
      <p>At publication on September 28, the dashboard has not posted a completion time. The rollout window is an estimate from Google; it does not mean every site will see ranking changes or that changes will happen evenly throughout the period.</p>

      <h2 id="how-this-rollout-compares">How This Rollout Compares With Earlier 2026 Spam Updates</h2>
      <p>The <a href="https://status.search.google.com/summary" target="_blank" rel="noopener">official ranking update history</a> lists three earlier spam updates in 2026:</p>
      <ul>
        <li><strong>March:</strong> 19 hours and 30 minutes, beginning March 24.</li>
        <li><strong>June:</strong> 2 days and 1 hour, beginning June 24.</li>
        <li><strong>August:</strong> 2 days and 16 hours, beginning August 18.</li>
      </ul>
      <p>That makes September the fourth confirmed spam update of the year. Its stated window is longer than the completed March, June, and August rollouts. Google has not said that this means the update is broader in scope; the supported distinction is the longer possible rollout window.</p>

      <h2 id="what-google-has-not-said">What Google Has Not Said</h2>
      <p>The status notice does not name a particular spam tactic, content format, language, or class of website being targeted. It also does not promise a ranking effect for any site. Avoid treating unverified claims about the update’s target as confirmed Google guidance.</p>
      <p>Google’s general <a href="https://developers.google.com/search/docs/appearance/spam-updates" target="_blank" rel="noopener">spam update guidance</a> explains that these updates are notable improvements to automated spam-detection systems. It advises sites that see changes to review Google’s spam policies.</p>

      <h2 id="what-site-owners-should-do">What Site Owners Should Do Now</h2>
      <ol>
        <li><strong>Record a baseline.</strong> In Search Console, note clicks, impressions, and average position for important pages and queries before comparing later periods.</li>
        <li><strong>Wait for the rollout to finish.</strong> Avoid attributing a short-lived fluctuation to this update while Google is still rolling it out.</li>
        <li><strong>Review the affected pages.</strong> If a sustained decline appears after completion, check the pages and practices involved against Google’s published spam policies. Do not assume the update’s target without evidence.</li>
        <li><strong>Separate search visibility from analytics attribution.</strong> Search Console clicks and GA4 sessions measure different things. If the reports diverge, use our <a href="/ga4-utm-troubleshooting-guide/">GA4 UTM troubleshooting guide</a> to check campaign tagging and session-source issues.</li>
      </ol>
      <p>We’ll update this news brief if Google posts a completion notice or publishes more detail about the rollout.</p>
    `
  },
  {
    slug: 'google-dsa-ai-max-migration-2027',
    title: 'Google Delays DSA Migration to AI Max Until February 2027: What Advertisers Should Do',
    seoTitle: 'Google DSA to AI Max Migration: 2027 Timeline & Checklist',
    description: 'Google moved Dynamic Search Ads auto-migration to February 2027. See the January creation cutoff, what campaign controls change, and a practical tracking and testing checklist.',
    category: 'search-news',
    isPillar: false,
    author: {
      name: 'Dinesh Jeengar',
      role: 'Digital Marketing & Technical SEO',
      url: 'https://dineshjeengar.com/',
      bio: 'Digital marketing and technical SEO professional based in Dubai, focused on data-led campaigns and measurable growth.',
      socials: [
        { label: 'Website', type: 'website', url: 'https://dineshjeengar.com/' },
        { label: 'LinkedIn', type: 'linkedin', url: 'https://www.linkedin.com/in/dinesh-jeengar/' },
        { label: 'Instagram', type: 'instagram', url: 'https://www.instagram.com/dinesshjngr/' }
      ]
    },
    datePublished: '2026-09-28',
    dateModified: '2026-09-28',
    reviewedDate: 'September 28, 2026',
    readingTime: '7 min read',
    primaryKeyword: 'Google DSA to AI Max migration',
    secondaryKeywords: ['Google Ads DSA migration 2027', 'Dynamic Search Ads sunset', 'AI Max migration timeline', 'Google Ads DSA upgrade'],
    semanticKeywords: ['Dynamic Search Ads', 'AI Max for Search', 'campaign experiments', 'URL rules', 'Google Ads tracking'],
    relatedEntities: ['Google Ads', 'Dynamic Search Ads', 'AI Max for Search campaigns', 'Google Ads campaign experiments'],
    searchIntent: 'Google Ads Product Update and Migration Guidance',
    featuredImage: '/blog/images/google-dsa-ai-max-migration.webp',
    featuredImageAlt: 'Timeline graphic showing new Google Ads DSA creation ending in January 2027 and automatic DSA upgrades beginning in February 2027',
    tableOfContents: [
      { id: 'confirmed-timeline', title: 'The Confirmed DSA and AI Max Timeline', level: 2 },
      { id: 'why-this-matters', title: 'Why the Change Matters to Advertisers', level: 2 },
      { id: 'what-changes', title: 'What Changes During an Upgrade', level: 2 },
      { id: 'google-overview', title: 'Google’s Comparison Graphic and Video', level: 2 },
      { id: 'migration-checklist', title: 'A Practical Migration Checklist', level: 2 },
      { id: 'should-you-upgrade-now', title: 'Should You Upgrade Before February?', level: 2 },
      { id: 'common-questions', title: 'Common Questions', level: 2 }
    ],
    toolCta: {
      title: 'Keep Paid Search Campaign Tracking Consistent',
      description: 'Review your Google Ads URL suffixes and ValueTrack setup before testing a migration, then compare performance using stable campaign naming.',
      link: '/utm-builder/google-ads/',
      buttonText: 'Open the Google Ads UTM Builder'
    },
    relatedSlugs: ['google-ads-utm-guide', 'google-ads-auto-tagging-vs-utms', 'gclid-vs-utms'],
    references: [
      { title: 'We’re upgrading Dynamic Search Ads to AI Max (updated June 11, 2026)', url: 'https://blog.google/products/ads-commerce/dsa-upgrade-to-ai-max-2026/', publisher: 'Google Ads & Commerce Blog' },
      { title: 'Dynamic Search Ads automigration delayed to February 2027 and campaign creation restored', url: 'https://ads-developers.googleblog.com/2026/06/dynamic-search-ads-dsa-automigration.html', publisher: 'Google Ads Developer Blog' },
      { title: 'Set up AI Max for Search campaigns: upgrade from DSA', url: 'https://support.google.com/google-ads/answer/15909989', publisher: 'Google Ads Help' },
      { title: 'About Dynamic Search Ads', url: 'https://support.google.com/google-ads/answer/2471185', publisher: 'Google Ads Help' }
    ],
    contentHtml: `
      <p class="lead-text">Google has moved the automatic migration of Dynamic Search Ads (DSA) to AI Max for Search campaigns to <strong>February 2027</strong>, giving advertisers more time to review and test their setup. The change matters if your business relies on DSA page targeting, generated headlines, or URL-level controls: the transition changes campaign structure, so you should confirm that the pages, ads, conversion signals, and tracking you depend on still behave as expected.</p>

      <div class="callout callout-recommended">
        <div class="callout-header"><strong>Quick timeline</strong></div>
        <ul>
          <li><strong>September 2026:</strong> ACA and campaign-level broad match upgrades to AI Max continue; Google expected eligible upgrades to finish by the end of September.</li>
          <li><strong>Through January 2027:</strong> Google’s June 11 developer update says advertisers can create and edit DSA campaigns until the January cutoff.</li>
          <li><strong>Starting February 2027:</strong> Google Ads Help says remaining DSA campaigns will be automatically upgraded to AI Max.</li>
        </ul>
      </div>

      <h2 id="confirmed-timeline">The Confirmed DSA and AI Max Timeline</h2>
      <p>Google first announced a September 2026 transition, then revised the DSA schedule on June 11. The updated plan separates DSA migration from two other legacy settings:</p>
      <ul>
        <li><strong>DSA campaigns:</strong> the automatic upgrade is scheduled to begin in February 2027. Google restored DSA campaign creation on June 15, 2026; its Ads Developer Blog says new DSA creation is removed in January 2027.</li>
        <li><strong>Automatically Created Assets (ACA) and campaign-level broad match:</strong> the delay does not apply to these. Google says their automatic upgrades continue starting in September 2026, with eligible upgrades expected to conclude by month-end.</li>
      </ul>
      <p>So the practical distinction is: the DSA window was extended, while the ACA and campaign-level broad-match transition remained on the September schedule. Check the notices and status in each Google Ads account rather than assuming all campaigns share one date. Google’s <a href="https://blog.google/products/ads-commerce/dsa-upgrade-to-ai-max-2026/" target="_blank" rel="noopener">updated migration announcement</a> and <a href="https://ads-developers.googleblog.com/2026/06/dynamic-search-ads-dsa-automigration.html" target="_blank" rel="noopener">June developer update</a> provide the timeline details.</p>
      <p><strong>One point to verify in your account:</strong> Google Ads Help describes the DSA destination as AI Max, while the June developer update describes remaining campaigns as moving to Performance Max or AI-powered Search. Since Google’s wording differs across these official pages, review the destination shown in each campaign’s upgrade notice before planning a bulk change.</p>

      <h2 id="why-this-matters">Why the Change Matters to Advertisers</h2>
      <p>DSA uses a site’s pages to match relevant searches and generate headlines. That can be useful for large catalogs, frequently changing inventory, and advertisers who need to cover relevant queries beyond a hand-built keyword list. It also means the campaign depends on site content and page-targeting rules being accurate.</p>
      <p>AI Max moves DSA into a Search campaign setup with standard ad groups and responsive search ads. That creates a useful opportunity to review messaging, URL selection, and search-term controls. It also creates a migration task: if your team has rules that protect certain pages, custom tracking at dynamic-target level, or a reporting process built around DSA, those details need to be checked before and after the change.</p>
      <p>This is not evidence that every advertiser will lose performance or that every account should upgrade immediately. The business risk is operational: an unreviewed transition can make it harder to spot a landing-page, ad-approval, lead-quality, or reporting change quickly. A planned test gives you a baseline and a chance to catch those issues while you still have time to adjust.</p>

      <h2 id="what-changes">What Changes During an Upgrade</h2>
      <p>Google’s upgrade guidance describes several structural changes. Dynamic ad groups convert to standard ad groups, and existing Dynamic Search Ads become responsive search ads. Google generates the minimum static assets needed using text customization. You can choose whether to enable Final URL expansion and use URL exclusions to control destinations.</p>
      <p>Review legacy URL rules carefully. Google says some older rule types-such as rules based on page title or page content-become read-only after upgrading. If a rule is unsupported, the upgrade dialog can identify it and mark it read-only. Save a record of your current rules and verify the resulting targeting before moving important spend.</p>
      <p>Google says the upgrade tools map DSA targets to modern equivalents and are intended to preserve historical reporting and reduce learning disruption. Treat that as the migration design, then verify the details in your account. Keep the original and post-upgrade reports available so you can compare performance on equivalent dates and conversion definitions.</p>

      <h2 id="google-overview">Google’s Comparison Graphic and Video</h2>
      <p>Google’s comparison highlights the shift from DSA’s page-based targeting toward AI Max’s combination of search-term matching, creative assets, and controls. Use it as a high-level product overview; the migration checklist below focuses on what to validate in your own account.</p>
      <figure class="article-source-media">
        <img src="/blog/images/google-dsa-ai-max-comparison.webp" alt="Comparison table of DSA and AI Max for Search campaigns covering targeting, creative assets, advertiser controls, reporting, and campaign workflows" width="1200" height="675" loading="lazy">
        <figcaption>Comparison graphic from <a href="https://blog.google/products/ads-commerce/dsa-upgrade-to-ai-max-2026/" target="_blank" rel="noopener">Google’s DSA-to-AI Max announcement</a>.</figcaption>
      </figure>
      <figure class="article-source-media">
        <video controls playsinline preload="metadata" aria-label="Google Ads overview video about the Dynamic Search Ads to AI Max transition">
          <source src="/blog/videos/google-dsa-ai-max-panel.mp4" type="video/mp4">
          Your browser does not support embedded video. <a href="/blog/videos/google-dsa-ai-max-panel.mp4">Download the video</a>.
        </video>
        <figcaption>Video from <a href="https://blog.google/products/ads-commerce/dsa-upgrade-to-ai-max-2026/" target="_blank" rel="noopener">Google’s DSA-to-AI Max announcement</a>.</figcaption>
      </figure>

      <h2 id="migration-checklist">A Practical Migration Checklist</h2>
      <ol>
        <li><strong>Inventory DSA campaigns.</strong> Record campaign status, spend, conversions, conversion value, target CPA or ROAS, and the business owner. Include paused campaigns if you may reactivate them.</li>
        <li><strong>Save what currently works.</strong> Export your dynamic targets, page feeds, URL inclusions and exclusions, ad descriptions, search terms, headlines, and landing-page results. Mark pages that must never receive paid traffic, such as expired offers or unavailable products.</li>
        <li><strong>Capture a fair baseline.</strong> Save a representative period of cost, qualified leads or sales, conversion value, search terms, and landing pages. Use the same attribution model and conversion actions when you compare results later.</li>
        <li><strong>Check measurement before changing campaigns.</strong> Document account, campaign, ad-group, and dynamic-target tracking templates; Final URL suffixes; ValueTrack tokens; auto-tagging; and any UTMs your CRM or analytics tools require. See our <a href="/google-ads-utm-guide/">Google Ads tracking guide</a> for a review of ValueTrack and UTM setup.</li>
        <li><strong>Test one representative campaign.</strong> Use Google Ads’ upgrade flow or an eligible experiment. Confirm the target mapping, generated responsive search ads, policy status, final URLs, URL exclusions, and conversion actions before expanding the rollout.</li>
        <li><strong>Monitor business outcomes after the change.</strong> Compare qualified conversions, revenue or lead quality, cost per result, search terms, and landing pages-not just clicks. Check that the intended tracking parameters reach the final page and remain available in downstream analytics or CRM records.</li>
      </ol>
      <p>If you use UTMs alongside Google Ads auto-tagging, keep the naming convention stable while you test. Changing campaign structure and tagging at the same time makes it harder to tell whether a result came from the migration or from a measurement change. Our guide to <a href="/google-ads-auto-tagging-vs-utms/">Google Ads auto-tagging and UTMs</a> explains how to use both consistently.</p>

      <h2 id="should-you-upgrade-now">Should You Upgrade Before February?</h2>
      <p>Use the extra time to audit, document, and test. If DSA is important to revenue and your team can review the results, a controlled voluntary migration can give you more time to adjust than waiting until the automatic transition. If the campaign is stable and you do not have a safe test plan yet, first map its targeting and measurement dependencies; avoid a rushed account-wide change made only to beat the date.</p>
      <p>For each campaign, decide based on evidence: are the resulting search terms relevant, do the ads meet policy and brand requirements, do users reach the intended pages, and do qualified conversions remain measurable? Keep a clear owner and a rollback or pause plan for material issues.</p>

      <h2 id="common-questions">Common Questions</h2>
      <h3>When does Google start automatically upgrading DSA campaigns?</h3>
      <p>Google Ads Help currently says automatic upgrades begin in February 2027. Google’s June developer update says the ability to create new DSA campaigns ends in January 2027, so these are separate dates.</p>

      <h3>Does the February delay also cover ACA and campaign-level broad match?</h3>
      <p>No. Google’s updated announcement says those upgrades continue starting in September 2026 and are expected to finish by the end of September for eligible campaigns.</p>

      <h3>Will Google preserve my DSA targeting and history?</h3>
      <p>Google describes its tools as mapping DSA targets and preserving historical reporting, and its upgrade flow explains how ad groups, ads, and unsupported URL rules change. Review the account-specific confirmation screen and verify the migrated campaign before relying on those settings.</p>

      <h3>What should I check first if leads or sales change?</h3>
      <p>Compare search terms and landing pages, then check ad eligibility, conversion actions, auto-tagging, tracking templates, UTMs, and the destination URL. Separate an actual change in lead or sales quality from a reporting change before adjusting bids or budgets.</p>
    `
  }
];
