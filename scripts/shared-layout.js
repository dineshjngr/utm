import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const layoutDir = join(import.meta.dirname, '..', 'src', 'layout');
const headerTemplate = readFileSync(join(layoutDir, 'header.partial'), 'utf8').trim();
const footerTemplate = readFileSync(join(layoutDir, 'footer.partial'), 'utf8').trim();
const appActions = readFileSync(join(layoutDir, 'app-actions.partial'), 'utf8').trimEnd();
const staticActions = readFileSync(join(layoutDir, 'static-actions.partial'), 'utf8').trimEnd();

export function renderHeader(activeNav = '', { app = false } = {}) {
  return headerTemplate
    .replace('{{BUILDER_ACTIVE}}', activeNav === 'builder' ? ' active' : '')
    .replace('{{CHECKER_ACTIVE}}', activeNav === 'checker' ? ' active' : '')
    .replace('{{GUIDES_ACTIVE}}', activeNav === 'guides' || activeNav === 'blog' ? ' active' : '')
    .replace('{{HEADER_ACTIONS}}', `\n${app ? appActions : staticActions}\n      `);
}

export function renderFooter() {
  return footerTemplate;
}
