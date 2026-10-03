import test from 'node:test';
import assert from 'node:assert/strict';
import { externalLinksInNewTabs } from '../scripts/normalize-external-links.js';

test('External links open in a new tab while preserving existing relationship tokens', () => {
  assert.equal(externalLinksInNewTabs('<a href="https://support.google.com/" target="_self" rel="nofollow noreferrer">Help</a>'), '<a href="https://support.google.com/" target="_blank" rel="nofollow noreferrer noopener">Help</a>');
  const input='<a href="//example.com/">Example</a>';
  const result=externalLinksInNewTabs(input);
  assert.ok(result.includes('target="_blank"'));
  assert.equal(externalLinksInNewTabs(result),result);
});

test('Internal links and non-web actions retain their behaviour', () => {
  const input='<a href="/blog/">Guides</a><a href="https://utmcraft.com/blog/">Guides</a><a href="https://www.utmcraft.com/">Home</a><a href="#intro">Intro</a><a href="mailto:contact@utmcraft.com">Email</a>';
  assert.equal(externalLinksInNewTabs(input),input);
  assert.ok(externalLinksInNewTabs('<a href="https://utmcraft.com.example.org/">External</a>').includes('target="_blank"'));
});
