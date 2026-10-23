// Small typographic helpers for Armenian text.

const WJ = '⁠'; // word joiner: invisible, forbids a line break, needs no glyph

/**
 * Uppercase for display labels. Unicode maps «և» to the classical «ԵՒ»; modern Eastern
 * Armenian writes «ԵՎ», so the ligature is expanded first.
 */
export const hyUpper = (s: string): string => s.replace(/և/g, 'եվ').toLocaleUpperCase('hy');

/**
 * Keeps visible text from breaking at awkward points: between a Latin name and its Armenian
 * ending («Armenia-ում», «Academy-ի») and inside time or number ranges («11:00–12:30»).
 * For rendered text only — not for meta tags or structured data.
 */
export const keep = (s: string): string =>
  s
    .replace(/([A-Za-z0-9»)])-(?=[Ա-և])/g, `$1-${WJ}`)
    .replace(/(\d)–(?=\d)/g, `$1${WJ}–${WJ}`);
