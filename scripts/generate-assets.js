import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { blogPosts } from '../src/data/blog-posts.js';
import { blogCategories } from '../src/data/blog-categories.js';

const outDir = path.resolve(import.meta.dirname, '../public/blog/images');
const brandLogoData = fs.readFileSync(path.resolve(import.meta.dirname, '../public/UTMCraft-white.png')).toString('base64');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function getCategoryTheme(categoryId) {
  switch (categoryId) {
    case 'utm-strategy':
      return { accent: '#34D399', accentMuted: '#059669', glow: 'rgba(52, 211, 153, 0.12)', label: 'STRATEGY' };
    case 'utm-parameters':
      return { accent: '#38BDF8', accentMuted: '#0284C7', glow: 'rgba(56, 189, 248, 0.12)', label: 'PARAMETERS' };
    case 'ga4-attribution':
      return { accent: '#F87171', accentMuted: '#DC2626', glow: 'rgba(248, 113, 113, 0.12)', label: 'DIAGNOSTICS' };
    case 'google-ads':
      return { accent: '#60A5FA', accentMuted: '#2563EB', glow: 'rgba(96, 165, 250, 0.12)', label: 'GOOGLE ADS' };
    case 'meta-ads':
      return { accent: '#818CF8', accentMuted: '#4F46E5', glow: 'rgba(129, 140, 248, 0.12)', label: 'META ADS' };
    case 'linkedin-ads':
      return { accent: '#38BDF8', accentMuted: '#0284C7', glow: 'rgba(56, 189, 248, 0.12)', label: 'LINKEDIN ADS' };
    case 'email-tracking':
      return { accent: '#FB923C', accentMuted: '#EA580C', glow: 'rgba(251, 146, 60, 0.12)', label: 'EMAIL' };
    case 'organic-social-pr':
      return { accent: '#A78BFA', accentMuted: '#7C3AED', glow: 'rgba(167, 139, 250, 0.12)', label: 'NON-PAID & PR' };
    case 'offline-qr':
      return { accent: '#F472B6', accentMuted: '#DB2777', glow: 'rgba(244, 114, 182, 0.12)', label: 'OFFLINE & QR' };
    case 'utm-operations':
      return { accent: '#2DD4BF', accentMuted: '#0D9488', glow: 'rgba(45, 212, 191, 0.12)', label: 'REVOPS & QA' };
    default:
      return { accent: '#34D399', accentMuted: '#059669', glow: 'rgba(52, 211, 153, 0.12)', label: 'ATTRIBUTION' };
  }
}

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function wrapTitle(title, maxChars = 28, maxLines = 3) {
  const words = title.split(/\s+/);
  const lines = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);

  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/[.,:;!?]?$/, '') + '…';
  }
  return lines;
}

// Generate tailored, intent-matching technical schematics for each post
function getBespokeDiagram(post, theme) {
  const { accent, accentMuted } = theme;
  const slug = post.slug;

  switch (slug) {
    case 'utm-strategy-guide':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">ENTERPRISE TAXONOMY GOVERNANCE</text>
        <!-- Master Node -->
        <rect x="610" y="135" width="490" height="54" rx="8" fill="#17222C" stroke="${accent}" stroke-width="1.5"/>
        <text x="630" y="167" font-family="Inter, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">Global Taxonomy Matrix (Single Source of Truth)</text>
        <rect x="990" y="148" width="90" height="26" rx="13" fill="${accent}" opacity="0.15"/>
        <text x="1035" y="165" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="${accent}" text-anchor="middle">LOCKED</text>

        <!-- Branch lines -->
        <path d="M855 189 L855 225 M690 225 L1020 225 M690 225 L690 250 M855 225 L855 250 M1020 225 L1020 250" stroke="#2A3B4A" stroke-width="2" fill="none"/>

        <!-- 3 Channel Nodes -->
        <rect x="610" y="250" width="155" height="130" rx="8" fill="#141E26" stroke="#243442" stroke-width="1.2"/>
        <rect x="622" y="262" width="60" height="18" rx="4" fill="#1E2D38"/>
        <text x="652" y="275" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="#94A3B8" text-anchor="middle">PAID</text>
        <text x="622" y="302" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">Google / Meta</text>
        <text x="622" y="324" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">utm_medium=cpc</text>
        <text x="622" y="344" font-family="'JetBrains Mono', monospace" font-size="10" fill="#64748B">paid_social</text>
        <circle cx="628" cy="365" r="4" fill="${accent}"/><text x="638" y="368" font-family="Inter, sans-serif" font-size="9" fill="#94A3B8">Strict Macros</text>

        <rect x="778" y="250" width="155" height="130" rx="8" fill="#141E26" stroke="#243442" stroke-width="1.2"/>
        <rect x="790" y="262" width="60" height="18" rx="4" fill="#1E2D38"/>
        <text x="820" y="275" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="#94A3B8" text-anchor="middle">LIFECYCLE</text>
        <text x="790" y="302" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">Klaviyo / Braze</text>
        <text x="790" y="324" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">utm_medium=email</text>
        <text x="790" y="344" font-family="'JetBrains Mono', monospace" font-size="10" fill="#64748B">drip_flows</text>
        <circle cx="796" cy="365" r="4" fill="${accent}"/><text x="806" y="368" font-family="Inter, sans-serif" font-size="9" fill="#94A3B8">Flow Tags</text>

        <rect x="945" y="250" width="155" height="130" rx="8" fill="#141E26" stroke="#243442" stroke-width="1.2"/>
        <rect x="957" y="262" width="60" height="18" rx="4" fill="#1E2D38"/>
        <text x="987" y="275" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="#94A3B8" text-anchor="middle">PARTNER</text>
        <text x="957" y="302" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">Affiliate &amp; PR</text>
        <text x="957" y="324" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">utm_medium=affiliate</text>
        <text x="957" y="344" font-family="'JetBrains Mono', monospace" font-size="10" fill="#64748B">creator_collab</text>
        <circle cx="963" cy="365" r="4" fill="${accent}"/><text x="973" y="368" font-family="Inter, sans-serif" font-size="9" fill="#94A3B8">Promo Code Sync</text>

        <!-- Bottom validation audit pill -->
        <rect x="610" y="405" width="490" height="46" rx="8" fill="#121D24" stroke="#223340"/>
        <circle cx="632" cy="428" r="6" fill="${accent}"/>
        <text x="648" y="432" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">Multi-Touch GA4 &amp; CRM Consistency: 100% Verified</text>
      `;

    case 'utm-naming-conventions-guide':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">STANDARDIZED PARAMETER FORMULA</text>
        <!-- Formula Box -->
        <rect x="610" y="135" width="490" height="60" rx="8" fill="#17222C" stroke="${accent}" stroke-width="1.5"/>
        <text x="630" y="171" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" fill="#FFFFFF">[channel]_[objective]_[audience]_[creative]</text>

        <!-- Component breakdown -->
        <g transform="translate(610, 215)">
          <rect x="0" y="0" width="112" height="66" rx="6" fill="#141E26" stroke="#243442"/>
          <text x="12" y="24" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="#94A3B8">CHANNEL</text>
          <text x="12" y="48" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600" fill="${accent}">paid_social</text>

          <rect x="126" y="0" width="112" height="66" rx="6" fill="#141E26" stroke="#243442"/>
          <text x="138" y="24" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="#94A3B8">OBJECTIVE</text>
          <text x="138" y="48" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600" fill="#F8FAFC">leadgen_q4</text>

          <rect x="252" y="0" width="112" height="66" rx="6" fill="#141E26" stroke="#243442"/>
          <text x="264" y="24" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="#94A3B8">AUDIENCE</text>
          <text x="264" y="48" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600" fill="#F8FAFC">saas_execs</text>

          <rect x="378" y="0" width="112" height="66" rx="6" fill="#141E26" stroke="#243442"/>
          <text x="390" y="24" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="#94A3B8">CREATIVE</text>
          <text x="390" y="48" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600" fill="${accent}">video_demo</text>
        </g>

        <!-- Rules Checklist -->
        <rect x="610" y="305" width="490" height="145" rx="8" fill="#141E26" stroke="#243442"/>
        <text x="630" y="335" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">Taxonomy Enforcement Rules:</text>
        <circle cx="636" cy="360" r="5" fill="${accent}"/><text x="652" y="364" font-family="Inter, sans-serif" font-size="11" fill="#E2E8F0">Strict Lowercase (no "Facebook" or "CPC" fragmentation)</text>
        <circle cx="636" cy="388" r="5" fill="${accent}"/><text x="652" y="392" font-family="Inter, sans-serif" font-size="11" fill="#E2E8F0">Underscores (_) between tokens, hyphens (-) inside slugs</text>
        <circle cx="636" cy="416" r="5" fill="${accent}"/><text x="652" y="420" font-family="Inter, sans-serif" font-size="11" fill="#E2E8F0">Zero spaces, zero emojis, zero sensitive customer data</text>
      `;

    case 'gclid-vs-utms':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">TRACKING MECHANISM COMPARISON</text>
        <!-- GCLID Column -->
        <rect x="610" y="135" width="235" height="190" rx="8" fill="#141E26" stroke="#2563EB" stroke-width="1.5"/>
        <rect x="625" y="150" width="80" height="22" rx="4" fill="#1E3A8A"/>
        <text x="665" y="165" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#93C5FD" text-anchor="middle">GCLID</text>
        <text x="625" y="195" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">Google Auto-Tagging</text>
        <text x="625" y="220" font-family="'JetBrains Mono', monospace" font-size="10" fill="#94A3B8">gclid=Cj0KCQj...</text>
        <line x1="625" y1="235" x2="830" y2="235" stroke="#1E2D38"/>
        <text x="625" y="255" font-family="Inter, sans-serif" font-size="11" fill="#60A5FA">• Auto GA4 sync</text>
        <text x="625" y="275" font-family="Inter, sans-serif" font-size="11" fill="#60A5FA">• Encrypted payload</text>
        <text x="625" y="295" font-family="Inter, sans-serif" font-size="11" fill="#EF4444">• Blocked by external CRM</text>

        <!-- UTM Column -->
        <rect x="865" y="135" width="235" height="190" rx="8" fill="#141E26" stroke="${accent}" stroke-width="1.5"/>
        <rect x="880" y="150" width="80" height="22" rx="4" fill="#065F46"/>
        <text x="920" y="165" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#A7F3D0" text-anchor="middle">MANUAL UTM</text>
        <text x="880" y="195" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">Universal Parameters</text>
        <text x="880" y="220" font-family="'JetBrains Mono', monospace" font-size="10" fill="#94A3B8">utm_source=google...</text>
        <line x1="880" y1="235" x2="1085" y2="235" stroke="#1E2D38"/>
        <text x="880" y="255" font-family="Inter, sans-serif" font-size="11" fill="${accent}">• Open plaintext</text>
        <text x="880" y="275" font-family="Inter, sans-serif" font-size="11" fill="${accent}">• Feeds Salesforce / CRM</text>
        <text x="880" y="295" font-family="Inter, sans-serif" font-size="11" fill="${accent}">• Multi-touch attribution</text>

        <!-- Hybrid Architecture Box -->
        <rect x="610" y="345" width="490" height="105" rx="8" fill="#121D24" stroke="${accent}" stroke-dasharray="3 3"/>
        <text x="630" y="375" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">RECOMMENDED: Hybrid Setup</text>
        <text x="630" y="400" font-family="Inter, sans-serif" font-size="11" fill="#CBD5E1">Enable Auto-Tagging for Google Ads + Set Final URL Suffix with UTMs</text>
        <text x="630" y="425" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="${accent}">GCLID (for GA4 Conversions) + UTM (for Downstream CRM Leads)</text>
      `;

    case 'redirects-removing-utms':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">REDIRECT ATTRIBUTION LOSS INSPECTOR</text>
        <!-- Bad Flow: Query Stripped -->
        <rect x="610" y="135" width="490" height="135" rx="8" fill="#1C1414" stroke="#DC2626" stroke-width="1.2"/>
        <rect x="625" y="148" width="130" height="22" rx="4" fill="#7F1D1D"/>
        <text x="690" y="163" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#FCA5A5" text-anchor="middle">LEAK DETECTED</text>
        <text x="625" y="195" font-family="'JetBrains Mono', monospace" font-size="11" fill="#F8FAFC">Ad Click: /signup?utm_source=meta</text>
        <path d="M625 210 L680 210" stroke="#EF4444" stroke-width="2"/>
        <text x="695" y="214" font-family="Inter, sans-serif" font-size="10" fill="#EF4444">301 Redirect to /signup/ (Drops Query)</text>
        <text x="625" y="245" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#F87171">Result: Shows as (direct) / (none) in GA4</text>

        <!-- Good Flow: Query Preserved -->
        <rect x="610" y="290" width="490" height="160" rx="8" fill="#121D24" stroke="#059669" stroke-width="1.2"/>
        <rect x="625" y="303" width="130" height="22" rx="4" fill="#065F46"/>
        <text x="690" y="318" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#A7F3D0" text-anchor="middle">RESOLVED ROUTE</text>
        <text x="625" y="350" font-family="'JetBrains Mono', monospace" font-size="11" fill="#F8FAFC">Server Config: RewriteRule ^(.*)$ $1 [QSA,L]</text>
        <text x="625" y="375" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="${accent}">Destination: /signup/?utm_source=meta&amp;utm_medium=paid_social</text>
        <line x1="625" y1="395" x2="1085" y2="395" stroke="#1E2D38"/>
        <circle cx="633" cy="420" r="5" fill="${accent}"/>
        <text x="648" y="424" font-family="Inter, sans-serif" font-size="11.5" font-weight="600" fill="#FFFFFF">100% Attribution Preserved across 301/302 chains</text>
      `;

    case 'ga4-unassigned-traffic':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">GA4 CHANNEL GROUPING RULE ENGINE</text>
        <!-- Rule condition card -->
        <rect x="610" y="135" width="490" height="145" rx="8" fill="#17222C" stroke="#243442"/>
        <text x="630" y="165" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">Paid Social Default Rule Definition:</text>
        <rect x="630" y="180" width="450" height="32" rx="4" fill="#0F171D"/>
        <text x="645" y="201" font-family="'JetBrains Mono', monospace" font-size="11" fill="${accent}">Medium matches regex: ^(.*cp[ac]|ppc|paid.*)$</text>
        <text x="630" y="235" font-family="Inter, sans-serif" font-size="11" fill="#94A3B8">AND Source matches regex list of social platforms</text>
        <text x="630" y="255" font-family="Inter, sans-serif" font-size="11" fill="#94A3B8">Any mismatch falls into the "Unassigned" default channel bucket.</text>

        <!-- Test cases comparison -->
        <rect x="610" y="300" width="235" height="150" rx="8" fill="#1C1414" stroke="#DC2626"/>
        <rect x="625" y="315" width="90" height="20" rx="4" fill="#7F1D1D"/>
        <text x="670" y="329" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" fill="#FCA5A5" text-anchor="middle">FAILS RULE</text>
        <text x="625" y="360" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="#EF4444">medium=social-ad</text>
        <text x="625" y="380" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="#EF4444">source=fb</text>
        <text x="625" y="415" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FCA5A5">-> Unassigned</text>

        <rect x="865" y="300" width="235" height="150" rx="8" fill="#121D24" stroke="#059669"/>
        <rect x="880" y="315" width="90" height="20" rx="4" fill="#065F46"/>
        <text x="925" y="329" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" fill="#A7F3D0" text-anchor="middle">PASSES RULE</text>
        <text x="880" y="360" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="${accent}">medium=paid_social</text>
        <text x="880" y="380" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="${accent}">source=facebook</text>
        <text x="880" y="415" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#A7F3D0">-> Paid Social</text>
      `;

    case 'qr-code-utm-tracking':
    case 'offline-qr-utm-tracking':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">PHYSICAL-TO-DIGITAL ATTRIBUTION BRIDGE</text>
        <!-- QR Code Matrix Graphic -->
        <g transform="translate(630, 145)">
          <rect x="0" y="0" width="130" height="130" rx="10" fill="#FFFFFF"/>
          <!-- Position Detection Squares -->
          <rect x="12" y="12" width="34" height="34" rx="4" fill="#0F172A"/>
          <rect x="18" y="18" width="22" height="22" rx="2" fill="#FFFFFF"/>
          <rect x="22" y="22" width="14" height="14" rx="2" fill="#0F172A"/>

          <rect x="84" y="12" width="34" height="34" rx="4" fill="#0F172A"/>
          <rect x="90" y="18" width="22" height="22" rx="2" fill="#FFFFFF"/>
          <rect x="94" y="22" width="14" height="14" rx="2" fill="#0F172A"/>

          <rect x="12" y="84" width="34" height="34" rx="4" fill="#0F172A"/>
          <rect x="18" y="90" width="22" height="22" rx="2" fill="#FFFFFF"/>
          <rect x="22" y="94" width="14" height="14" rx="2" fill="#0F172A"/>

          <!-- Dummy data modules -->
          <rect x="54" y="16" width="8" height="8" fill="#0F172A"/>
          <rect x="68" y="24" width="8" height="8" fill="#0F172A"/>
          <rect x="54" y="54" width="8" height="8" fill="#0F172A"/>
          <rect x="68" y="68" width="8" height="8" fill="#0F172A"/>
          <rect x="84" y="60" width="8" height="8" fill="#0F172A"/>
          <rect x="98" y="74" width="8" height="8" fill="#0F172A"/>
          <rect x="54" y="94" width="8" height="8" fill="#0F172A"/>
          <rect x="68" y="108" width="8" height="8" fill="#0F172A"/>
          <rect x="94" y="94" width="8" height="8" fill="#0F172A"/>
        </g>

        <!-- Flow Description on the right -->
        <g transform="translate(780, 150)">
          <text x="0" y="20" font-family="Inter, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">1. Camera Scan</text>
          <text x="0" y="40" font-family="Inter, sans-serif" font-size="11" fill="#94A3B8">High Error Correction (Level H)</text>

          <text x="0" y="75" font-family="Inter, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">2. Branded Vanity Link</text>
          <text x="0" y="95" font-family="'JetBrains Mono', monospace" font-size="11" fill="${accent}">go.utmcraft.com/expo</text>

          <text x="0" y="130" font-family="Inter, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">3. 301 Ingestion to GA4</text>
        </g>

        <!-- Final Landing URL Box -->
        <rect x="610" y="305" width="490" height="145" rx="8" fill="#141E26" stroke="#243442"/>
        <text x="630" y="335" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">Attributed Destination URL:</text>
        <rect x="630" y="350" width="450" height="40" rx="4" fill="#0F171D"/>
        <text x="645" y="375" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="${accent}">https://utmcraft.com/?utm_source=nyc_billboard&amp;utm_medium=qr</text>
        <text x="630" y="415" font-family="Inter, sans-serif" font-size="11" fill="#94A3B8">Default Channel Group: "Cross-network" or "Offline / QR"</text>
      `;

    case 'meta-dynamic-url-parameters':
    case 'meta-ads-utm-guide':
    case 'meta-ads-utm-tracking':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">META DYNAMIC MACRO RESOLVER</text>
        <!-- Parameter Builder Card -->
        <rect x="610" y="135" width="490" height="145" rx="8" fill="#17222C" stroke="#243442"/>
        <text x="630" y="165" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">Ads Manager Parameter Input:</text>
        <rect x="630" y="180" width="450" height="42" rx="4" fill="#0F171D"/>
        <text x="645" y="206" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">utm_campaign={{campaign.name}}&amp;utm_content={{placement}}</text>
        <text x="630" y="248" font-family="Inter, sans-serif" font-size="11" fill="#94A3B8">Ad Serve Token Expansion Pipeline (Zero manual edits)</text>

        <!-- Token resolution examples -->
        <g transform="translate(610, 300)">
          <rect x="0" y="0" width="235" height="150" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="16" y="28" font-family="'JetBrains Mono', monospace" font-size="10" fill="#94A3B8">{{campaign.name}}</text>
          <path d="M16 42 L40 42" stroke="${accent}" stroke-width="2"/>
          <text x="16" y="70" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Resolved at Click:</text>
          <rect x="16" y="85" width="200" height="28" rx="4" fill="#1C2731"/>
          <text x="26" y="103" font-family="'JetBrains Mono', monospace" font-size="11" fill="${accent}">q4_prospecting_us</text>

          <rect x="255" y="0" width="235" height="150" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="271" y="28" font-family="'JetBrains Mono', monospace" font-size="10" fill="#94A3B8">{{placement}}</text>
          <path d="M271 42 L295 42" stroke="${accent}" stroke-width="2"/>
          <text x="271" y="70" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Placement Breakdown:</text>
          <rect x="271" y="85" width="200" height="28" rx="4" fill="#1C2731"/>
          <text x="281" y="103" font-family="'JetBrains Mono', monospace" font-size="11" fill="${accent}">Instagram_Reels</text>
        </g>
      `;

    case 'linkedin-dynamic-parameters':
    case 'linkedin-ads-utm-guide':
    case 'linkedin-ads-utm-tracking':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">LINKEDIN DYNAMIC PARAMETER ARCHITECTURE</text>
        <!-- Notice badge -->
        <rect x="610" y="135" width="490" height="60" rx="8" fill="#0C4A6E" stroke="#0284C7" stroke-width="1.2"/>
        <text x="630" y="160" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">CRITICAL: Strict Uppercase Syntax</text>
        <text x="630" y="180" font-family="'JetBrains Mono', monospace" font-size="11" fill="#BAE6FD">Use {{CAMPAIGN_ID}} &amp; {{AD_ID}} (lowercase will NOT expand!)</text>

        <!-- Parameter Grid -->
        <g transform="translate(610, 215)">
          <rect x="0" y="0" width="235" height="105" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="16" y="28" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${accent}">{{CAMPAIGN_ID}}</text>
          <text x="16" y="55" font-family="Inter, sans-serif" font-size="11" fill="#94A3B8">Static Campaign Identifier</text>
          <text x="16" y="85" font-family="'JetBrains Mono', monospace" font-size="12" fill="#F8FAFC">id=19827364</text>

          <rect x="255" y="0" width="235" height="105" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="271" y="28" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${accent}">{{CAMPAIGN_NAME}}</text>
          <text x="271" y="55" font-family="Inter, sans-serif" font-size="11" fill="#94A3B8">Dynamic Campaign Label</text>
          <text x="271" y="85" font-family="'JetBrains Mono', monospace" font-size="12" fill="#F8FAFC">Enterprise_ABM_Q4</text>
        </g>

        <!-- B2B CRM Sync Box -->
        <rect x="610" y="340" width="490" height="110" rx="8" fill="#141E26" stroke="#243442"/>
        <text x="630" y="370" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Downstream B2B Account Mapping:</text>
        <circle cx="636" cy="395" r="4" fill="${accent}"/><text x="650" y="399" font-family="Inter, sans-serif" font-size="11" fill="#E2E8F0">Syncs directly into HubSpot / Salesforce target accounts</text>
        <circle cx="636" cy="422" r="4" fill="${accent}"/><text x="650" y="426" font-family="Inter, sans-serif" font-size="11" fill="#E2E8F0">Distinguishes Sponsored Content vs Lead Gen InMail forms</text>
      `;

    case 'storing-utm-parameters-in-crm':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">END-TO-END CRM ATTRIBUTION PIPELINE</text>
        <!-- 4-step pipeline horizontal/vertical -->
        <g transform="translate(610, 135)">
          <rect x="0" y="0" width="490" height="66" rx="8" fill="#141E26" stroke="#243442"/>
          <circle cx="28" cy="33" r="12" fill="#1E2D38"/>
          <text x="28" y="38" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${accent}" text-anchor="middle">1</text>
          <text x="56" y="26" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">URL Query Ingestion</text>
          <text x="56" y="46" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="#94A3B8">Parse utm_source, utm_medium, utm_campaign</text>

          <rect x="0" y="80" width="490" height="66" rx="8" fill="#141E26" stroke="#243442"/>
          <circle cx="28" cy="113" r="12" fill="#1E2D38"/>
          <text x="28" y="118" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${accent}" text-anchor="middle">2</text>
          <text x="56" y="106" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Browser Cookie / localStorage Cache</text>
          <text x="56" y="126" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="${accent}">Store first-touch + last-touch with 30-day TTL</text>

          <rect x="0" y="160" width="490" height="66" rx="8" fill="#141E26" stroke="#243442"/>
          <circle cx="28" cy="193" r="12" fill="#1E2D38"/>
          <text x="28" y="198" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${accent}" text-anchor="middle">3</text>
          <text x="56" y="186" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Form Hidden Field Injection</text>
          <text x="56" y="206" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="#94A3B8">&lt;input type="hidden" name="utm_source" value="..."&gt;</text>

          <rect x="0" y="240" width="490" height="66" rx="8" fill="#121D24" stroke="${accent}" stroke-width="1.2"/>
          <circle cx="28" cy="273" r="12" fill="${accent}"/>
          <text x="28" y="278" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#0F172A" text-anchor="middle">4</text>
          <text x="56" y="266" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">HubSpot / Salesforce Contact Created</text>
          <text x="56" y="286" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="${accent}">Lead Record attributed to actual paying pipeline</text>
        </g>
      `;

    case 'first-touch-vs-last-touch-utm':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">MULTI-TOUCH CUSTOMER JOURNEY TIMELINE</text>
        <!-- Touchpoint 1 -->
        <rect x="610" y="135" width="490" height="85" rx="8" fill="#141E26" stroke="#243442"/>
        <rect x="625" y="148" width="60" height="20" rx="4" fill="#1E2D38"/>
        <text x="655" y="162" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="${accent}" text-anchor="middle">DAY 1</text>
        <text x="700" y="163" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">First-Touch Acquisition (Paid Search)</text>
        <text x="625" y="195" font-family="'JetBrains Mono', monospace" font-size="11" fill="#94A3B8">GA4: First user source / medium = google / cpc</text>

        <!-- Touchpoint 2 -->
        <rect x="610" y="235" width="490" height="85" rx="8" fill="#141E26" stroke="#243442"/>
        <rect x="625" y="248" width="60" height="20" rx="4" fill="#1E2D38"/>
        <text x="655" y="262" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#94A3B8" text-anchor="middle">DAY 7</text>
        <text x="700" y="263" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Mid-Funnel Nurture (Organic Social)</text>
        <text x="625" y="295" font-family="'JetBrains Mono', monospace" font-size="11" fill="#94A3B8">GA4: Session source / medium = linkedin / organic_social</text>

        <!-- Touchpoint 3 -->
        <rect x="610" y="335" width="490" height="115" rx="8" fill="#121D24" stroke="${accent}" stroke-width="1.2"/>
        <rect x="625" y="348" width="60" height="20" rx="4" fill="${accent}"/>
        <text x="655" y="362" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#0F172A" text-anchor="middle">DAY 14</text>
        <text x="700" y="363" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Conversion Touch (Email Newsletter)</text>
        <text x="625" y="395" font-family="'JetBrains Mono', monospace" font-size="11" fill="${accent}">GA4: Session source / medium = newsletter / email</text>
        <text x="625" y="425" font-family="Inter, sans-serif" font-size="11" fill="#E2E8F0">Conversion credited accurately to both Acquisition and Assist channels.</text>
      `;

    case 'ga4-utm-parameters-guide':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">GA4 MANUAL DIMENSION MAPPING MATRIX</text>
        <!-- Mapping Rows -->
        <g transform="translate(610, 135)">
          <!-- Row 1 -->
          <rect x="0" y="0" width="220" height="42" rx="6" fill="#141E26" stroke="#243442"/>
          <text x="14" y="26" font-family="'JetBrains Mono', monospace" font-size="11" fill="${accent}">utm_source</text>
          <path d="M228 21 L260 21" stroke="${accent}" stroke-width="2"/>
          <rect x="270" y="0" width="220" height="42" rx="6" fill="#17222C" stroke="${accent}"/>
          <text x="284" y="26" font-family="Inter, sans-serif" font-size="11.5" font-weight="600" fill="#FFFFFF">Session source</text>

          <!-- Row 2 -->
          <rect x="0" y="52" width="220" height="42" rx="6" fill="#141E26" stroke="#243442"/>
          <text x="14" y="78" font-family="'JetBrains Mono', monospace" font-size="11" fill="${accent}">utm_medium</text>
          <path d="M228 73 L260 73" stroke="${accent}" stroke-width="2"/>
          <rect x="270" y="52" width="220" height="42" rx="6" fill="#17222C" stroke="${accent}"/>
          <text x="284" y="78" font-family="Inter, sans-serif" font-size="11.5" font-weight="600" fill="#FFFFFF">Session medium (Channel)</text>

          <!-- Row 3 -->
          <rect x="0" y="104" width="220" height="42" rx="6" fill="#141E26" stroke="#243442"/>
          <text x="14" y="130" font-family="'JetBrains Mono', monospace" font-size="11" fill="${accent}">utm_campaign</text>
          <path d="M228 125 L260 125" stroke="${accent}" stroke-width="2"/>
          <rect x="270" y="104" width="220" height="42" rx="6" fill="#17222C" stroke="${accent}"/>
          <text x="284" y="130" font-family="Inter, sans-serif" font-size="11.5" font-weight="600" fill="#FFFFFF">Session campaign</text>

          <!-- Row 4 -->
          <rect x="0" y="156" width="220" height="42" rx="6" fill="#141E26" stroke="#243442"/>
          <text x="14" y="182" font-family="'JetBrains Mono', monospace" font-size="11" fill="${accent}">utm_content</text>
          <path d="M228 177 L260 177" stroke="${accent}" stroke-width="2"/>
          <rect x="270" y="156" width="220" height="42" rx="6" fill="#17222C" stroke="${accent}"/>
          <text x="284" y="182" font-family="Inter, sans-serif" font-size="11.5" font-weight="600" fill="#FFFFFF">Manual creative format</text>

          <!-- Row 5 -->
          <rect x="0" y="208" width="220" height="42" rx="6" fill="#141E26" stroke="#243442"/>
          <text x="14" y="234" font-family="'JetBrains Mono', monospace" font-size="11" fill="${accent}">utm_term</text>
          <path d="M228 229 L260 229" stroke="${accent}" stroke-width="2"/>
          <rect x="270" y="208" width="220" height="42" rx="6" fill="#17222C" stroke="${accent}"/>
          <text x="284" y="234" font-family="Inter, sans-serif" font-size="11.5" font-weight="600" fill="#FFFFFF">Manual term / keyword</text>
        </g>
        <!-- Scope note -->
        <rect x="610" y="400" width="490" height="50" rx="8" fill="#121D24" stroke="#223340"/>
        <text x="630" y="430" font-family="Inter, sans-serif" font-size="11" fill="#E2E8F0">Evaluated at User, Session &amp; Event scopes with zero data truncation.</text>
      `;

    case 'utm-source-guide':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">CANONICAL SOURCE DICTIONARY</text>
        <!-- Accepted Sources Card -->
        <rect x="610" y="135" width="235" height="200" rx="8" fill="#121D24" stroke="#059669" stroke-width="1.2"/>
        <rect x="625" y="150" width="90" height="22" rx="4" fill="#065F46"/>
        <text x="670" y="165" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#A7F3D0" text-anchor="middle">APPROVED</text>
        <g transform="translate(625, 195)" font-family="'JetBrains Mono', monospace" font-size="11" fill="${accent}">
          <text x="0" y="0">✓ google</text>
          <text x="0" y="25">✓ meta</text>
          <text x="0" y="50">✓ linkedin</text>
          <text x="0" y="75">✓ tiktok</text>
          <text x="0" y="100">✓ newsletter</text>
        </g>

        <!-- Rejected Typos Card -->
        <rect x="865" y="135" width="235" height="200" rx="8" fill="#1C1414" stroke="#DC2626" stroke-width="1.2"/>
        <rect x="880" y="150" width="90" height="22" rx="4" fill="#7F1D1D"/>
        <text x="925" y="165" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#FCA5A5" text-anchor="middle">REJECTED</text>
        <g transform="translate(880, 195)" font-family="'JetBrains Mono', monospace" font-size="11" fill="#EF4444">
          <text x="0" y="0">✕ Google_Ads</text>
          <text x="0" y="25">✕ FB_Feed</text>
          <text x="0" y="50">✕ LinkedIn-Ads</text>
          <text x="0" y="75">✕ TikTok_Paid</text>
          <text x="0" y="100">✕ Email_Blast</text>
        </g>

        <!-- Outcome note -->
        <rect x="610" y="355" width="490" height="95" rx="8" fill="#17222C" stroke="#243442"/>
        <text x="630" y="385" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Governance Impact:</text>
        <text x="630" y="410" font-family="Inter, sans-serif" font-size="11" fill="#CBD5E1">Prevents source fragmentation and keeps campaign drill-downs unified.</text>
        <text x="630" y="430" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="${accent}">Strict lowercase enforcement eliminates split analytics rows.</text>
      `;

    case 'utm-medium-guide':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">GA4 CHANNEL GROUPING RULE MATCHER</text>
        <!-- Table entries -->
        <g transform="translate(610, 135)">
          <rect x="0" y="0" width="490" height="52" rx="6" fill="#141E26" stroke="#243442"/>
          <text x="16" y="32" font-family="'JetBrains Mono', monospace" font-size="11.5" fill="${accent}">utm_medium=cpc</text>
          <path d="M220 26 L270 26" stroke="${accent}" stroke-width="2"/>
          <text x="285" y="32" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">Paid Search</text>

          <rect x="0" y="62" width="490" height="52" rx="6" fill="#141E26" stroke="#243442"/>
          <text x="16" y="94" font-family="'JetBrains Mono', monospace" font-size="11.5" fill="${accent}">utm_medium=paid_social</text>
          <path d="M220 88 L270 88" stroke="${accent}" stroke-width="2"/>
          <text x="285" y="94" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">Paid Social</text>

          <rect x="0" y="124" width="490" height="52" rx="6" fill="#141E26" stroke="#243442"/>
          <text x="16" y="156" font-family="'JetBrains Mono', monospace" font-size="11.5" fill="${accent}">utm_medium=email</text>
          <path d="M220 150 L270 150" stroke="${accent}" stroke-width="2"/>
          <text x="285" y="156" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">Email</text>

          <rect x="0" y="186" width="490" height="52" rx="6" fill="#141E26" stroke="#243442"/>
          <text x="16" y="218" font-family="'JetBrains Mono', monospace" font-size="11.5" fill="${accent}">utm_medium=affiliate</text>
          <path d="M220 212 L270 212" stroke="${accent}" stroke-width="2"/>
          <text x="285" y="218" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">Affiliates</text>
        </g>

        <!-- Rule enforcement badge -->
        <rect x="610" y="390" width="490" height="60" rx="8" fill="#121D24" stroke="#059669" stroke-width="1.2"/>
        <text x="630" y="415" font-family="Inter, sans-serif" font-size="11.5" font-weight="600" fill="#FFFFFF">GA4 System Rule Match: 100% Valid</text>
        <text x="630" y="435" font-family="Inter, sans-serif" font-size="10.5" fill="#94A3B8">Zero sessions lost into "Unassigned" default channel bucket.</text>
      `;

    case 'utm-campaign-guide':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">COMPOUND CAMPAIGN NAME PARSER</text>
        <!-- Full Campaign String Box -->
        <rect x="610" y="135" width="490" height="56" rx="8" fill="#17222C" stroke="${accent}" stroke-width="1.5"/>
        <text x="630" y="169" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#FFFFFF">2026_q4_enterprise_leadgen_us</text>

        <!-- 4 Sub Token Cards -->
        <g transform="translate(610, 210)">
          <rect x="0" y="0" width="112" height="75" rx="6" fill="#141E26" stroke="#243442"/>
          <text x="12" y="22" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="#94A3B8">YEAR/QUARTER</text>
          <text x="12" y="46" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="${accent}">2026_q4</text>
          <text x="12" y="65" font-family="Inter, sans-serif" font-size="9" fill="#64748B">Time Scope</text>

          <rect x="126" y="0" width="112" height="75" rx="6" fill="#141E26" stroke="#243442"/>
          <text x="138" y="22" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="#94A3B8">AUDIENCE</text>
          <text x="138" y="46" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#F8FAFC">enterprise</text>
          <text x="138" y="65" font-family="Inter, sans-serif" font-size="9" fill="#64748B">Target ICP</text>

          <rect x="252" y="0" width="112" height="75" rx="6" fill="#141E26" stroke="#243442"/>
          <text x="264" y="22" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="#94A3B8">OBJECTIVE</text>
          <text x="264" y="46" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#F8FAFC">leadgen</text>
          <text x="264" y="65" font-family="Inter, sans-serif" font-size="9" fill="#64748B">Campaign Goal</text>

          <rect x="378" y="0" width="112" height="75" rx="6" fill="#141E26" stroke="#243442"/>
          <text x="390" y="22" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="#94A3B8">GEOGRAPHY</text>
          <text x="390" y="46" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="${accent}">us</text>
          <text x="390" y="65" font-family="Inter, sans-serif" font-size="9" fill="#64748B">Market Region</text>
        </g>

        <!-- Reporting benefit card -->
        <rect x="610" y="305" width="490" height="145" rx="8" fill="#141E26" stroke="#243442"/>
        <text x="630" y="335" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Reporting Aggregation Benefits:</text>
        <text x="630" y="360" font-family="Inter, sans-serif" font-size="11" fill="#94A3B8">• Filter by Year/Quarter across all campaigns in Looker Studio</text>
        <text x="630" y="385" font-family="Inter, sans-serif" font-size="11" fill="#94A3B8">• Segment ICP performance without manual spreadsheet lookups</text>
        <text x="630" y="410" font-family="Inter, sans-serif" font-size="11" fill="#94A3B8">• Synchronize campaign names directly with Salesforce campaign IDs</text>
      `;

    case 'ga4-utm-troubleshooting-guide':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">GA4 ATTRIBUTION TRIAGE FLOWCHART</text>
        <!-- Triage Tree -->
        <rect x="610" y="135" width="490" height="52" rx="8" fill="#1C1414" stroke="#DC2626" stroke-width="1.2"/>
        <text x="630" y="166" font-family="Inter, sans-serif" font-size="13" font-weight="700" fill="#FCA5A5">Issue: Missing UTMs / Traffic Showing as Direct</text>

        <!-- Diagnostic Steps -->
        <g transform="translate(610, 205)">
          <rect x="0" y="0" width="155" height="110" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="14" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="${accent}">STEP 1</text>
          <text x="14" y="48" font-family="Inter, sans-serif" font-size="11.5" font-weight="600" fill="#FFFFFF">Redirect Audit</text>
          <text x="14" y="70" font-family="Inter, sans-serif" font-size="10" fill="#94A3B8">Inspect 301/302 query string retention</text>

          <rect x="168" y="0" width="155" height="110" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="182" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="${accent}">STEP 2</text>
          <text x="182" y="48" font-family="Inter, sans-serif" font-size="11.5" font-weight="600" fill="#FFFFFF">Consent Mode</text>
          <text x="182" y="70" font-family="Inter, sans-serif" font-size="10" fill="#94A3B8">Verify ad_storage &amp; analytics_storage state</text>

          <rect x="335" y="0" width="155" height="110" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="349" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="${accent}">STEP 3</text>
          <text x="349" y="48" font-family="Inter, sans-serif" font-size="11.5" font-weight="600" fill="#FFFFFF">DebugView Test</text>
          <text x="349" y="70" font-family="Inter, sans-serif" font-size="10" fill="#94A3B8">Live parameter inspection in GA4</text>
        </g>

        <!-- Resolved Card -->
        <rect x="610" y="335" width="490" height="115" rx="8" fill="#121D24" stroke="#059669" stroke-width="1.2"/>
        <text x="630" y="365" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#A7F3D0">Outcome: Verified Attribution</text>
        <text x="630" y="390" font-family="Inter, sans-serif" font-size="11" fill="#E2E8F0">100% of campaign hits correctly attributed to Paid Social &amp; Search.</text>
        <text x="630" y="415" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="${accent}">Session manual dimensions restored in standard reports.</text>
      `;

    case 'ga4-utms-not-showing':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">GA4 REALTIME PAYLOAD INSPECTOR</text>
        <!-- Browser URL Input -->
        <rect x="610" y="135" width="490" height="48" rx="8" fill="#17222C" stroke="#243442"/>
        <text x="630" y="164" font-family="'JetBrains Mono', monospace" font-size="11" fill="${accent}">https://example.com/?utm_source=meta&amp;utm_medium=cpc</text>

        <!-- Ingestion Stream -->
        <g transform="translate(610, 200)">
          <rect x="0" y="0" width="490" height="135" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="16" y="28" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Network Request: /g/collect</text>
          <text x="16" y="52" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="#94A3B8">en=page_view &amp; ep.source=meta &amp; ep.medium=cpc</text>
          <line x1="16" y1="68" x2="474" y2="68" stroke="#1E2D38"/>
          <circle cx="24" cy="92" r="5" fill="${accent}"/>
          <text x="38" y="96" font-family="Inter, sans-serif" font-size="11" fill="#E2E8F0">Realtime Report: Latency &lt; 2 seconds</text>
          <circle cx="24" cy="116" r="5" fill="#FBBF24"/>
          <text x="38" y="120" font-family="Inter, sans-serif" font-size="11" fill="#E2E8F0">Standard Acquisition Reports: 24-48 hours processing threshold</text>
        </g>

        <!-- Diagnostic Result -->
        <rect x="610" y="355" width="490" height="95" rx="8" fill="#121D24" stroke="${accent}" stroke-width="1.2"/>
        <text x="630" y="385" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Diagnostic Verdict:</text>
        <text x="630" y="410" font-family="Inter, sans-serif" font-size="11" fill="#CBD5E1">Traffic IS being captured in Realtime; standard report delay is expected.</text>
      `;

    case 'ga4-direct-traffic-troubleshooting':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">ATTRIBUTION LEAK DETECTOR</text>
        <!-- Leak Path -->
        <rect x="610" y="135" width="490" height="135" rx="8" fill="#1C1414" stroke="#DC2626" stroke-width="1.2"/>
        <rect x="625" y="148" width="130" height="22" rx="4" fill="#7F1D1D"/>
        <text x="690" y="163" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#FCA5A5" text-anchor="middle">LEAK DETECTED</text>
        <text x="625" y="195" font-family="'JetBrains Mono', monospace" font-size="11" fill="#F8FAFC">Ad Click: /signup?utm_source=meta</text>
        <path d="M625 210 L680 210" stroke="#EF4444" stroke-width="2"/>
        <text x="695" y="214" font-family="Inter, sans-serif" font-size="10" fill="#EF4444">301 Redirect to /signup/ (Drops Query)</text>
        <text x="625" y="245" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#F87171">Result: Shows as (direct) / (none) in GA4</text>

        <!-- Fixed Path -->
        <rect x="610" y="290" width="490" height="160" rx="8" fill="#121D24" stroke="#059669" stroke-width="1.2"/>
        <rect x="625" y="303" width="130" height="22" rx="4" fill="#065F46"/>
        <text x="690" y="318" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#A7F3D0" text-anchor="middle">RESOLVED ROUTE</text>
        <text x="625" y="350" font-family="'JetBrains Mono', monospace" font-size="11" fill="#F8FAFC">Server Config: RewriteRule ^(.*)$ $1 [QSA,L]</text>
        <text x="625" y="375" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="${accent}">Destination: /signup/?utm_source=meta&amp;utm_medium=paid_social</text>
        <line x1="625" y1="395" x2="1085" y2="395" stroke="#1E2D38"/>
        <circle cx="633" cy="420" r="5" fill="${accent}"/>
        <text x="648" y="424" font-family="Inter, sans-serif" font-size="11.5" font-weight="600" fill="#FFFFFF">100% Attribution Preserved across 301/302 chains</text>
      `;

    case 'ga4-not-set':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">GA4 (NOT SET) RESOLUTION PIPELINE</text>
        <!-- Scope Mismatch Card -->
        <rect x="610" y="135" width="490" height="145" rx="8" fill="#17222C" stroke="#243442"/>
        <text x="630" y="165" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">Common Causes of (not set):</text>
        <g transform="translate(630, 185)" font-family="Inter, sans-serif" font-size="11" fill="#94A3B8">
          <text x="0" y="0">• Late GTM tag firing after session_start has already completed</text>
          <text x="0" y="25">• Measurement Protocol server hits missing client_id</text>
          <text x="0" y="50">• Google Ads account link disconnected or auto-tagging disabled</text>
        </g>

        <!-- Solution Card -->
        <rect x="610" y="300" width="490" height="150" rx="8" fill="#121D24" stroke="${accent}" stroke-width="1.2"/>
        <text x="630" y="330" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Resolution Architecture:</text>
        <rect x="630" y="345" width="450" height="35" rx="4" fill="#0F171D"/>
        <text x="645" y="367" font-family="'JetBrains Mono', monospace" font-size="11" fill="${accent}">Sequence: Initialization Tag -&gt; Page View with Campaign Params</text>
        <text x="630" y="415" font-family="Inter, sans-serif" font-size="11" fill="#E2E8F0">Eliminates orphan events and locks campaign attribution to session ID.</text>
      `;

    case 'how-to-test-utms':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">3-TIER PRE-LAUNCH QA STACK</text>
        <g transform="translate(610, 135)">
          <!-- Tier 1 -->
          <rect x="0" y="0" width="490" height="85" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="16" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="${accent}">TIER 1: BROWSER DEVTOOLS</text>
          <text x="16" y="48" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">Network Tab Payload Check</text>
          <text x="16" y="70" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="#94A3B8">Inspect /g/collect?v=2&amp;tid=G-XXXXX for correct query keys</text>

          <!-- Tier 2 -->
          <rect x="0" y="100" width="490" height="85" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="16" y="124" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="${accent}">TIER 2: GA4 DEBUGVIEW</text>
          <text x="16" y="148" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">Realtime Event Timeline</text>
          <text x="16" y="170" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="#94A3B8">Live verification of page_view &amp; campaign parameters</text>

          <!-- Tier 3 -->
          <rect x="0" y="200" width="490" height="110" rx="8" fill="#121D24" stroke="${accent}" stroke-width="1.2"/>
          <text x="16" y="224" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="${accent}">TIER 3: CRM INGESTION</text>
          <text x="16" y="248" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">Hidden Form Field Verification</text>
          <text x="16" y="270" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="#A7F3D0">Confirm test lead record contains source, medium, campaign</text>
        </g>
      `;

    case 'google-ads-utm-guide':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">GOOGLE ADS FINAL URL SUFFIX ENGINE</text>
        <!-- Final URL Box -->
        <rect x="610" y="135" width="490" height="70" rx="8" fill="#17222C" stroke="#243442"/>
        <text x="630" y="160" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#94A3B8">FINAL URL (Landing Page)</text>
        <text x="630" y="185" font-family="'JetBrains Mono', monospace" font-size="12" fill="#FFFFFF">https://utmcraft.com/features</text>

        <!-- Final URL Suffix Box -->
        <rect x="610" y="220" width="490" height="85" rx="8" fill="#141E26" stroke="${accent}" stroke-width="1.5"/>
        <text x="630" y="245" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="${accent}">FINAL URL SUFFIX (Account / Campaign Level)</text>
        <text x="630" y="270" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="#F8FAFC">utm_source=google&amp;utm_medium=cpc&amp;utm_campaign={campaignid}&amp;utm_term={keyword}</text>

        <!-- ValueTrack Output -->
        <rect x="610" y="320" width="490" height="130" rx="8" fill="#121D24" stroke="#223340"/>
        <text x="630" y="350" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">ValueTrack Dynamic Resolution at Auction:</text>
        <circle cx="636" cy="378" r="4" fill="${accent}"/><text x="650" y="382" font-family="'JetBrains Mono', monospace" font-size="11" fill="#CBD5E1">{keyword} -&gt; "b2b campaign tracking software"</text>
        <circle cx="636" cy="405" r="4" fill="${accent}"/><text x="650" y="409" font-family="'JetBrains Mono', monospace" font-size="11" fill="#CBD5E1">{campaignid} -&gt; "21893721"</text>
        <circle cx="636" cy="432" r="4" fill="${accent}"/><text x="650" y="436" font-family="'JetBrains Mono', monospace" font-size="11" fill="#CBD5E1">{matchtype} -&gt; "e" (exact match)</text>
      `;

    case 'google-ads-auto-tagging-vs-utms':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">HYBRID ATTRIBUTION ARCHITECTURE</text>
        <!-- Click Node -->
        <rect x="610" y="135" width="490" height="60" rx="8" fill="#17222C" stroke="#2563EB" stroke-width="1.2"/>
        <text x="630" y="171" font-family="Inter, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">Google Ads Auction Click Event</text>

        <!-- Split Streams -->
        <g transform="translate(610, 215)">
          <rect x="0" y="0" width="235" height="135" rx="8" fill="#141E26" stroke="#2563EB"/>
          <text x="16" y="28" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#93C5FD">GCLID STREAM</text>
          <text x="16" y="55" font-family="Inter, sans-serif" font-size="11" fill="#94A3B8">Google Analytics 4</text>
          <text x="16" y="80" font-family="Inter, sans-serif" font-size="11" fill="#60A5FA">• Smart Bidding ROI</text>
          <text x="16" y="100" font-family="Inter, sans-serif" font-size="11" fill="#60A5FA">• Auto conversion sync</text>

          <rect x="255" y="0" width="235" height="135" rx="8" fill="#141E26" stroke="${accent}"/>
          <text x="271" y="28" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${accent}">UTM STREAM</text>
          <text x="271" y="55" font-family="Inter, sans-serif" font-size="11" fill="#94A3B8">Salesforce / HubSpot</text>
          <text x="271" y="80" font-family="Inter, sans-serif" font-size="11" fill="${accent}">• Lead source tracking</text>
          <text x="271" y="100" font-family="Inter, sans-serif" font-size="11" fill="${accent}">• Pipeline revenue match</text>
        </g>

        <!-- Result Box -->
        <rect x="610" y="365" width="490" height="85" rx="8" fill="#121D24" stroke="#223340"/>
        <text x="630" y="395" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Result of Hybrid Configuration:</text>
        <text x="630" y="420" font-family="Inter, sans-serif" font-size="11" fill="#CBD5E1">Full Google Ads conversion optimization + complete CRM transparency.</text>
      `;

    case 'google-ads-tracking-templates':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">TRACKING TEMPLATE OVERRIDE CASCADE</text>
        <g transform="translate(610, 135)">
          <rect x="0" y="0" width="490" height="66" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="16" y="26" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#94A3B8">1. ACCOUNT LEVEL TEMPLATE</text>
          <text x="16" y="48" font-family="'JetBrains Mono', monospace" font-size="11" fill="${accent}">{lpurl}?utm_source=google&amp;utm_medium=cpc</text>

          <rect x="0" y="78" width="490" height="66" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="16" y="104" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#94A3B8">2. CAMPAIGN LEVEL OVERRIDE</text>
          <text x="16" y="126" font-family="'JetBrains Mono', monospace" font-size="11" fill="#F8FAFC">&amp;utm_campaign={_campaign_label}</text>

          <rect x="0" y="156" width="490" height="66" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="16" y="182" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#94A3B8">3. AD GROUP / CREATIVE LEVEL OVERRIDE</text>
          <text x="16" y="204" font-family="'JetBrains Mono', monospace" font-size="11" fill="#F8FAFC">&amp;utm_content={creative}&amp;utm_term={keyword}</text>

          <!-- Resolved URL Box -->
          <rect x="0" y="235" width="490" height="80" rx="8" fill="#121D24" stroke="${accent}" stroke-width="1.2"/>
          <text x="16" y="262" font-family="Inter, sans-serif" font-size="11.5" font-weight="700" fill="#FFFFFF">Executed Click Destination:</text>
          <text x="16" y="288" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="${accent}">https://utmcraft.com/?utm_source=google&amp;utm_medium=cpc&amp;utm_term=saas</text>
        </g>
      `;

    case 'email-utm-guide':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">EMAIL LIFECYCLE TAXONOMY</text>
        <!-- 3 Lifecycle categories -->
        <g transform="translate(610, 135)">
          <rect x="0" y="0" width="490" height="70" rx="8" fill="#141E26" stroke="#243442"/>
          <rect x="14" y="14" width="90" height="20" rx="4" fill="#1E2D38"/>
          <text x="59" y="28" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="${accent}" text-anchor="middle">NEWSLETTER</text>
          <text x="120" y="28" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">Weekly Broadcast</text>
          <text x="14" y="54" font-family="'JetBrains Mono', monospace" font-size="11" fill="#94A3B8">utm_campaign=weekly_dispatch_issue_48</text>

          <rect x="0" y="82" width="490" height="70" rx="8" fill="#141E26" stroke="#243442"/>
          <rect x="14" y="96" width="90" height="20" rx="4" fill="#1E2D38"/>
          <text x="59" y="110" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="${accent}" text-anchor="middle">DRIP FLOW</text>
          <text x="120" y="110" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">Automated Onboarding</text>
          <text x="14" y="136" font-family="'JetBrains Mono', monospace" font-size="11" fill="#94A3B8">utm_campaign=welcome_sequence_day_3</text>

          <rect x="0" y="164" width="490" height="70" rx="8" fill="#141E26" stroke="#243442"/>
          <rect x="14" y="178" width="90" height="20" rx="4" fill="#1E2D38"/>
          <text x="59" y="192" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="${accent}" text-anchor="middle">TRIGGERED</text>
          <text x="120" y="192" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">Abandoned Cart Flow</text>
          <text x="14" y="218" font-family="'JetBrains Mono', monospace" font-size="11" fill="#94A3B8">utm_campaign=cart_recovery_step_1</text>
        </g>

        <!-- Scanner note -->
        <rect x="610" y="390" width="490" height="60" rx="8" fill="#121D24" stroke="#223340"/>
        <text x="630" y="415" font-family="Inter, sans-serif" font-size="11.5" font-weight="600" fill="#FFFFFF">Bot Scanner Protection:</text>
        <text x="630" y="435" font-family="Inter, sans-serif" font-size="10.5" fill="#94A3B8">Hardened against email security scanners that pre-click tracking URLs.</text>
      `;

    case 'email-utm-tracking':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">ESP INTEGRATION MATRIX</text>
        <g transform="translate(610, 135)">
          <rect x="0" y="0" width="155" height="150" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="16" y="28" font-family="Inter, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">Klaviyo</text>
          <text x="16" y="52" font-family="Inter, sans-serif" font-size="10" fill="#94A3B8">Account Tracking:</text>
          <text x="16" y="75" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">utm_source=klaviyo</text>
          <text x="16" y="95" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">utm_medium=email</text>
          <text x="16" y="125" font-family="Inter, sans-serif" font-size="10" fill="#A7F3D0">✓ Dynamic Flow Tags</text>

          <rect x="168" y="0" width="155" height="150" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="184" y="28" font-family="Inter, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">HubSpot</text>
          <text x="184" y="52" font-family="Inter, sans-serif" font-size="10" fill="#94A3B8">Marketing Email:</text>
          <text x="184" y="75" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">utm_source=hs_email</text>
          <text x="184" y="95" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">utm_medium=email</text>
          <text x="184" y="125" font-family="Inter, sans-serif" font-size="10" fill="#A7F3D0">✓ CRM Contact Sync</text>

          <rect x="335" y="0" width="155" height="150" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="351" y="28" font-family="Inter, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">Mailchimp</text>
          <text x="351" y="52" font-family="Inter, sans-serif" font-size="10" fill="#94A3B8">Auto-Tagging:</text>
          <text x="351" y="75" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">utm_source=mailchimp</text>
          <text x="351" y="95" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">utm_medium=email</text>
          <text x="351" y="125" font-family="Inter, sans-serif" font-size="10" fill="#A7F3D0">✓ Auto Campaign Title</text>
        </g>

        <!-- Destination verification -->
        <rect x="610" y="300" width="490" height="150" rx="8" fill="#121D24" stroke="${accent}" stroke-width="1.2"/>
        <text x="630" y="330" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">GA4 Verified Default Channel Group:</text>
        <text x="630" y="360" font-family="Inter, sans-serif" font-size="14" font-weight="700" fill="${accent}">Channel = Email</text>
        <text x="630" y="390" font-family="Inter, sans-serif" font-size="11" fill="#94A3B8">All ESP link wrappers resolve cleanly without query truncation.</text>
        <text x="630" y="415" font-family="Inter, sans-serif" font-size="11" fill="#94A3B8">First User and Session attribution scoped accurately.</text>
      `;

    case 'non-paid-marketing-utm-tracking':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">ORGANIC &amp; PR ATTRIBUTION HUB</text>
        <g transform="translate(610, 135)">
          <rect x="0" y="0" width="235" height="135" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="16" y="26" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">LinkedIn Organic Bio</text>
          <text x="16" y="48" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">utm_source=linkedin</text>
          <text x="16" y="68" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">utm_medium=organic_social</text>
          <text x="16" y="98" font-family="Inter, sans-serif" font-size="10" fill="#94A3B8">Profile link &amp; Featured posts</text>

          <rect x="255" y="0" width="235" height="135" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="271" y="26" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Podcast &amp; PR Features</text>
          <text x="271" y="48" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">utm_source=podcast_saas</text>
          <text x="271" y="68" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">utm_medium=podcast</text>
          <text x="271" y="98" font-family="Inter, sans-serif" font-size="10" fill="#94A3B8">Audio show notes &amp; vanity links</text>
        </g>

        <!-- Aggregation Box -->
        <rect x="610" y="285" width="490" height="165" rx="8" fill="#121D24" stroke="${accent}" stroke-width="1.2"/>
        <text x="630" y="315" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Separating Paid vs Non-Paid Traffic:</text>
        <circle cx="636" cy="345" r="4" fill="${accent}"/><text x="650" y="349" font-family="Inter, sans-serif" font-size="11" fill="#E2E8F0">Organic Social: utm_medium=organic_social</text>
        <circle cx="636" cy="372" r="4" fill="${accent}"/><text x="650" y="376" font-family="Inter, sans-serif" font-size="11" fill="#E2E8F0">Paid Social: utm_medium=paid_social</text>
        <circle cx="636" cy="399" r="4" fill="${accent}"/><text x="650" y="403" font-family="Inter, sans-serif" font-size="11" fill="#E2E8F0">Prevents organic viral spikes from distorting ROAS calculations.</text>
      `;

    case 'influencer-utm-tracking':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">CREATOR DUAL ATTRIBUTION MODEL</text>
        <g transform="translate(610, 135)">
          <rect x="0" y="0" width="235" height="150" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="16" y="28" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">TRACKING LINK</text>
          <text x="16" y="55" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="${accent}">utm_source=sarah_tech</text>
          <text x="16" y="75" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="${accent}">utm_medium=influencer</text>
          <text x="16" y="95" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="#94A3B8">utm_campaign=q4_review</text>
          <text x="16" y="125" font-family="Inter, sans-serif" font-size="11" fill="#A7F3D0">Measures Site Visits &amp; CTR</text>

          <rect x="255" y="0" width="235" height="150" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="271" y="28" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">PROMO CODE</text>
          <text x="271" y="55" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" fill="#F8FAFC">SARAH20</text>
          <text x="271" y="80" font-family="Inter, sans-serif" font-size="10.5" fill="#94A3B8">Checkout coupon redemption</text>
          <text x="271" y="125" font-family="Inter, sans-serif" font-size="11" fill="#A7F3D0">Measures Conversion &amp; Sales</text>
        </g>

        <!-- Reconciliation Box -->
        <rect x="610" y="305" width="490" height="145" rx="8" fill="#121D24" stroke="${accent}" stroke-width="1.2"/>
        <text x="630" y="335" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Dual Attribution Reconciliation:</text>
        <text x="630" y="360" font-family="Inter, sans-serif" font-size="11" fill="#CBD5E1">Captures both in-app browser direct clicks and delayed desktop purchases.</text>
        <text x="630" y="385" font-family="Inter, sans-serif" font-size="11" fill="#CBD5E1">Prevents over-crediting coupon sites for creator-driven demand.</text>
      `;

    case 'utm-operations-workflow':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">4-STAGE REVOPS CAMPAIGN LIFECYCLE</text>
        <g transform="translate(610, 135)">
          <rect x="0" y="0" width="490" height="66" rx="8" fill="#141E26" stroke="#243442"/>
          <circle cx="28" cy="33" r="12" fill="#1E2D38"/><text x="28" y="38" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${accent}" text-anchor="middle">1</text>
          <text x="56" y="26" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Taxonomy Definition &amp; Parameter Request</text>
          <text x="56" y="46" font-family="Inter, sans-serif" font-size="10.5" fill="#94A3B8">Campaign team submits approved tokens and objectives</text>

          <rect x="0" y="78" width="490" height="66" rx="8" fill="#141E26" stroke="#243442"/>
          <circle cx="28" cy="111" r="12" fill="#1E2D38"/><text x="28" y="116" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${accent}" text-anchor="middle">2</text>
          <text x="56" y="104" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Bulk Matrix Generation</text>
          <text x="56" y="124" font-family="Inter, sans-serif" font-size="10.5" fill="${accent}">Automated URL construction across channels and creatives</text>

          <rect x="0" y="156" width="490" height="66" rx="8" fill="#141E26" stroke="#243442"/>
          <circle cx="28" cy="189" r="12" fill="#1E2D38"/><text x="28" y="194" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${accent}" text-anchor="middle">3</text>
          <text x="56" y="182" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Pre-Launch QA Gate</text>
          <text x="56" y="202" font-family="Inter, sans-serif" font-size="10.5" fill="#94A3B8">Automated link checking, 301 redirect retention, GA4 testing</text>

          <rect x="0" y="234" width="490" height="72" rx="8" fill="#121D24" stroke="${accent}" stroke-width="1.2"/>
          <circle cx="28" cy="270" r="12" fill="${accent}"/><text x="28" y="275" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#0F172A" text-anchor="middle">4</text>
          <text x="56" y="260" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Live Execution &amp; CRM Attribution</text>
          <text x="56" y="280" font-family="Inter, sans-serif" font-size="10.5" fill="${accent}">Leads, pipeline opportunities, and revenue attributed accurately</text>
        </g>
      `;

    case 'bulk-utm-workflow':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">HIGH-VOLUME CAMPAIGN MATRIX GENERATOR</text>
        <!-- Spreadsheet Matrix Graphic -->
        <g transform="translate(610, 135)">
          <rect x="0" y="0" width="490" height="40" rx="6" fill="#1E2D38"/>
          <text x="16" y="24" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">LANDING PAGE</text>
          <text x="140" y="24" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">CHANNEL</text>
          <text x="240" y="24" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">MEDIUM</text>
          <text x="340" y="24" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">CAMPAIGN</text>

          <rect x="0" y="46" width="490" height="38" rx="4" fill="#141E26"/>
          <text x="16" y="69" font-family="'JetBrains Mono', monospace" font-size="10" fill="#94A3B8">/pricing</text>
          <text x="140" y="69" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">google</text>
          <text x="240" y="69" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">cpc</text>
          <text x="340" y="69" font-family="'JetBrains Mono', monospace" font-size="10" fill="#F8FAFC">q4_brand</text>

          <rect x="0" y="90" width="490" height="38" rx="4" fill="#141E26"/>
          <text x="16" y="113" font-family="'JetBrains Mono', monospace" font-size="10" fill="#94A3B8">/pricing</text>
          <text x="140" y="113" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">meta</text>
          <text x="240" y="113" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">paid_social</text>
          <text x="340" y="113" font-family="'JetBrains Mono', monospace" font-size="10" fill="#F8FAFC">q4_retargeting</text>

          <rect x="0" y="134" width="490" height="38" rx="4" fill="#141E26"/>
          <text x="16" y="157" font-family="'JetBrains Mono', monospace" font-size="10" fill="#94A3B8">/pricing</text>
          <text x="140" y="157" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">linkedin</text>
          <text x="240" y="157" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">paid_social</text>
          <text x="340" y="157" font-family="'JetBrains Mono', monospace" font-size="10" fill="#F8FAFC">q4_abm_demo</text>
        </g>

        <!-- Compile Outcome -->
        <rect x="610" y="325" width="490" height="125" rx="8" fill="#121D24" stroke="${accent}" stroke-width="1.2"/>
        <text x="630" y="355" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Batch Export Status: 100% Validated</text>
        <text x="630" y="380" font-family="Inter, sans-serif" font-size="11" fill="#CBD5E1">Generates 50+ URLs with verified GA4 taxonomy in 1 click.</text>
        <text x="630" y="405" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="${accent}">CSV Export compatible with Google Ads Editor &amp; Meta Ads Manager.</text>
      `;

    case 'agency-utm-governance':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">AGENCY MULTI-CLIENT WORKSPACE ROUTER</text>
        <!-- Central Agency Hub -->
        <rect x="610" y="135" width="490" height="54" rx="8" fill="#17222C" stroke="${accent}" stroke-width="1.5"/>
        <text x="630" y="167" font-family="Inter, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">Agency Master Taxonomy Control</text>

        <!-- 3 Client Workspaces -->
        <g transform="translate(610, 205)">
          <rect x="0" y="0" width="155" height="135" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="14" y="24" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Client Alpha</text>
          <text x="14" y="45" font-family="Inter, sans-serif" font-size="10" fill="#94A3B8">B2B SaaS Stack</text>
          <line x1="14" y1="58" x2="141" y2="58" stroke="#1E2D38"/>
          <text x="14" y="78" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">hubspot_crm</text>
          <text x="14" y="98" font-family="'JetBrains Mono', monospace" font-size="10" fill="#94A3B8">abm_taxonomy</text>
          <text x="14" y="120" font-family="Inter, sans-serif" font-size="9" fill="#A7F3D0">✓ Schema Locked</text>

          <rect x="168" y="0" width="155" height="135" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="182" y="24" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Client Beta</text>
          <text x="182" y="45" font-family="Inter, sans-serif" font-size="10" fill="#94A3B8">E-Commerce Brand</text>
          <line x1="182" y1="58" x2="309" y2="58" stroke="#1E2D38"/>
          <text x="182" y="78" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">shopify_klaviyo</text>
          <text x="182" y="98" font-family="'JetBrains Mono', monospace" font-size="10" fill="#94A3B8">sku_tracking</text>
          <text x="182" y="120" font-family="Inter, sans-serif" font-size="9" fill="#A7F3D0">✓ Schema Locked</text>

          <rect x="335" y="0" width="155" height="135" rx="8" fill="#141E26" stroke="#243442"/>
          <text x="349" y="24" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Client Gamma</text>
          <text x="349" y="45" font-family="Inter, sans-serif" font-size="10" fill="#94A3B8">Global Enterprise</text>
          <line x1="349" y1="58" x2="476" y2="58" stroke="#1E2D38"/>
          <text x="349" y="78" font-family="'JetBrains Mono', monospace" font-size="10" fill="${accent}">salesforce_v2</text>
          <text x="349" y="98" font-family="'JetBrains Mono', monospace" font-size="10" fill="#94A3B8">multi_geo</text>
          <text x="349" y="120" font-family="Inter, sans-serif" font-size="9" fill="#A7F3D0">✓ Schema Locked</text>
        </g>

        <!-- Isolation guarantee -->
        <rect x="610" y="355" width="490" height="95" rx="8" fill="#121D24" stroke="#223340"/>
        <text x="630" y="385" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Cross-Client Isolation Guarantee:</text>
        <text x="630" y="410" font-family="Inter, sans-serif" font-size="11" fill="#CBD5E1">Zero parameter bleed between client accounts. Automated QA pre-check.</text>
      `;

    case 'utm-qa-checklist':
      return `
        <text x="610" y="115" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="${accent}" letter-spacing="1">PRE-LAUNCH 5-POINT QA VERIFIER</text>
        <!-- 5 verification steps -->
        <g transform="translate(610, 135)">
          <rect x="0" y="0" width="490" height="52" rx="6" fill="#121D24" stroke="#059669" stroke-width="1.2"/>
          <circle cx="24" cy="26" r="8" fill="${accent}"/><text x="24" y="30" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#0F172A" text-anchor="middle">✓</text>
          <text x="44" y="30" font-family="Inter, sans-serif" font-size="11.5" font-weight="600" fill="#FFFFFF">1. Lowercase &amp; Delimiter Syntax Check (Passed)</text>

          <rect x="0" y="60" width="490" height="52" rx="6" fill="#121D24" stroke="#059669" stroke-width="1.2"/>
          <circle cx="24" cy="26" r="8" fill="${accent}"/><text x="24" y="30" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#0F172A" text-anchor="middle">✓</text>
          <text x="44" y="30" font-family="Inter, sans-serif" font-size="11.5" font-weight="600" fill="#FFFFFF">2. HTTP 301/302 Redirect Query Retention (Passed)</text>

          <rect x="0" y="120" width="490" height="52" rx="6" fill="#121D24" stroke="#059669" stroke-width="1.2"/>
          <circle cx="24" cy="26" r="8" fill="${accent}"/><text x="24" y="30" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#0F172A" text-anchor="middle">✓</text>
          <text x="44" y="30" font-family="Inter, sans-serif" font-size="11.5" font-weight="600" fill="#FFFFFF">3. Character Encoding / Zero Double-? Errors (Passed)</text>

          <rect x="0" y="180" width="490" height="52" rx="6" fill="#121D24" stroke="#059669" stroke-width="1.2"/>
          <circle cx="24" cy="26" r="8" fill="${accent}"/><text x="24" y="30" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#0F172A" text-anchor="middle">✓</text>
          <text x="44" y="30" font-family="Inter, sans-serif" font-size="11.5" font-weight="600" fill="#FFFFFF">4. GA4 Realtime Hit Inspection &amp; Channel Group (Passed)</text>

          <rect x="0" y="240" width="490" height="52" rx="6" fill="#121D24" stroke="#059669" stroke-width="1.2"/>
          <circle cx="24" cy="26" r="8" fill="${accent}"/><text x="24" y="30" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#0F172A" text-anchor="middle">✓</text>
          <text x="44" y="30" font-family="Inter, sans-serif" font-size="11.5" font-weight="600" fill="#FFFFFF">5. CRM Hidden Form Field Population (Passed)</text>
        </g>

        <!-- Launch authorization badge -->
        <rect x="610" y="440" width="490" height="40" rx="8" fill="${accent}"/>
        <text x="855" y="465" font-family="Inter, sans-serif" font-size="12" font-weight="800" fill="#0F172A" text-anchor="middle">STATUS: READY FOR AD SPEND AUTHORIZATION</text>
      `;

    default:
      return '';
  }
}

function createSvgForPost(post) {
  const theme = getCategoryTheme(post.category);
  const cat = blogCategories.find(c => c.id === post.category);
  const badgeText = cat ? cat.badge.toUpperCase() : 'ATTRIBUTION';
  const titleLines = wrapTitle(post.title, 26, 3);
  const titleMarkup = titleLines
    .map((line, index) => `<tspan x="72" dy="${index === 0 ? 0 : 42}">${escapeXml(line)}</tspan>`)
    .join('');

  const bespokeDiagram = getBespokeDiagram(post, theme);

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Dark Architectural Canvas Background -->
    <rect width="1200" height="630" fill="#0A0E12"/>

    <!-- Subtle Radial Glow behind Diagram -->
    <defs>
      <radialGradient id="card-glow" cx="80%" cy="40%" r="60%">
        <stop offset="0%" stop-color="${theme.accent}" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="#0A0E12" stop-opacity="0"/>
      </radialGradient>
      <pattern id="arch-grid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#16202A" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="1200" height="630" fill="url(#arch-grid)"/>
    <rect width="1200" height="630" fill="url(#card-glow)"/>

    <!-- Left Column: Editorial Information -->
    <g transform="translate(0, 0)">
      <!-- Top Brand Header Bar -->
      <g transform="translate(72, 60)">
        <image href="data:image/png;base64,${brandLogoData}" x="0" y="0" width="145" height="24" preserveAspectRatio="xMinYMid meet"/>

        <!-- Category Badge Pill -->
        <rect x="165" y="-1" width="${badgeText.length * 8 + 26}" height="26" rx="13" fill="${theme.glow}" stroke="${theme.accent}" stroke-width="1.2"/>
        <text x="${165 + (badgeText.length * 8 + 26)/2}" y="16" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="${theme.accent}" letter-spacing="0.5">${badgeText}</text>
      </g>

      <!-- Category Kicker -->
      <text x="72" y="165" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600" fill="${theme.accent}" letter-spacing="1.5">${escapeXml(cat ? cat.name.toUpperCase() : 'ATTRIBUTION GUIDE')}</text>

      <!-- Main Headline -->
      <text x="72" y="215" font-family="Inter, -apple-system, BlinkMacSystemFont, sans-serif" font-size="32" font-weight="800" fill="#FFFFFF" letter-spacing="-0.8">${titleMarkup}</text>

      <!-- Topic Metadata & Keyword Tag -->
      <g transform="translate(72, ${240 + titleLines.length * 42})">
        <rect x="0" y="0" width="${escapeXml(post.primaryKeyword).length * 8 + 24}" height="28" rx="6" fill="#141E26" stroke="#243442"/>
        <text x="12" y="18" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="500" fill="#94A3B8">${escapeXml(post.primaryKeyword)}</text>
        <text x="${escapeXml(post.primaryKeyword).length * 8 + 40}" y="18" font-family="Inter, sans-serif" font-size="12" fill="#64748B">• ${post.readingTime}</text>
      </g>

      <!-- Verification Footer Seal -->
      <g transform="translate(72, 555)">
        <line x1="0" y1="0" x2="450" y2="0" stroke="#1E2D38" stroke-width="1"/>
        <circle cx="6" cy="22" r="4" fill="${theme.accent}"/>
        <text x="20" y="26" font-family="Inter, sans-serif" font-size="11.5" font-weight="500" fill="#64748B">GA4 &amp; Ad Platform Rules Verified • September 2026</text>
      </g>
    </g>

    <!-- Right Column: Interactive-Style Technical Schematic -->
    <rect x="580" y="60" width="548" height="510" rx="16" fill="#0F161C" stroke="#1F2C38" stroke-width="1.5"/>

    <!-- Schematic Header Bar -->
    <rect x="580" y="60" width="548" height="42" rx="16" fill="#152028"/>
    <!-- Window controls -->
    <circle cx="606" cy="81" r="5" fill="#EF4444" opacity="0.8"/>
    <circle cx="622" cy="81" r="5" fill="#EAB308" opacity="0.8"/>
    <circle cx="638" cy="81" r="5" fill="#22C55E" opacity="0.8"/>
    <text x="660" y="85" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="#94A3B8">UTMCraft Attribution Architecture</text>
    <rect x="1035" y="71" width="75" height="20" rx="10" fill="${theme.glow}" stroke="${theme.accent}" stroke-width="1"/>
    <text x="1072" y="84" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" fill="${theme.accent}" text-anchor="middle">ACTIVE</text>

    <!-- Inner Visual Diagram Content -->
    ${bespokeDiagram}
  </svg>`;
}

export async function generateAllBannerImages() {
  console.log(`Generating ${blogPosts.length} WebP banner images (1200x630)...`);
  for (const post of blogPosts) {
    const svg = createSvgForPost(post);
    const destPath = path.join(outDir, `${post.slug}.webp`);
    await sharp(Buffer.from(svg))
      .webp({ quality: 92 })
      .toFile(destPath);
  }
  console.log(`Successfully generated all ${blogPosts.length} WebP images in public/blog/images/`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllBannerImages().catch(err => {
    console.error('Image generation failed:', err);
    process.exit(1);
  });
}
