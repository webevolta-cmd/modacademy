// "Find your course": matches interests and experience to verified course audiences.
type LevelId = 'new' | 'pro';
interface FinderCourse {
  slug: string;
  title: string;
  kicker: string;
  duration: string | null;
  fee: string | null;
  interests: string[];
  levels: LevelId[];
  reason: Partial<Record<LevelId, string>>;
}

export function initFinder(root: HTMLElement): void {
  const form = root.querySelector<HTMLFormElement>('[data-finder-form]');
  const list = root.querySelector<HTMLOListElement>('[data-finder-list]');
  const empty = root.querySelector<HTMLElement>('[data-finder-empty]');
  const dataEl = root.querySelector('[data-finder-courses]');
  if (!form || !list || !empty || !dataEl) return;

  const courses = JSON.parse(dataEl.textContent || '[]') as FinderCourse[];

  const el = <K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  };

  const render = () => {
    const data = new FormData(form);
    const interests = data.getAll('interest').map(String);
    const level = (data.get('level') as LevelId) || 'new';

    list.replaceChildren();
    if (!interests.length) {
      empty.hidden = false;
      return;
    }
    empty.hidden = true;

    const scored = courses
      .map((c) => {
        const hits = interests.filter((i) => c.interests.includes(i));
        const primary = interests.includes(c.interests[0]) ? 1 : 0;
        // Courses designed specifically for the chosen experience level rank first.
        const specific = c.levels.length === 1 && c.levels[0] === level ? 2 : 0;
        return { c, score: hits.length * 2 + primary + specific, fits: c.levels.includes(level) };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => Number(b.fits) - Number(a.fits) || b.score - a.score);

    scored.forEach(({ c, fits }, i) => {
      const li = el('li', 'match');
      li.style.setProperty('--i', String(i));

      const top = el('div', 'match__top');
      top.append(el('span', 'match__title', c.title));
      top.append(el('span', 'match__badge', fits ? (i === 0 ? 'Առաջարկվող' : 'Համապատասխան') : 'Հետագա քայլ'));
      li.append(top);

      const reason = fits
        ? c.reason[level] ?? ''
        : 'Նախատեսված է ոլորտում արդեն աշխատող մասնագետների համար՝ կարող է լինել հաջորդ քայլը հիմքերից հետո։';
      if (reason) li.append(el('p', '', reason));

      const meta = [c.kicker, c.duration, c.fee].filter(Boolean).join(' · ');
      li.append(el('p', 'match__meta', meta));

      const links = el('div', 'match__links');
      const more = el('a', 'link-arrow', 'Մանրամասն');
      more.href = `/courses/${c.slug}/`;
      const ask = el('a', 'link-arrow', 'Ուղարկել հայտ');
      ask.href = `/?course=${c.slug}#inquiry`;
      ask.dataset.inquiryCourse = c.slug;
      links.append(more, ask);
      li.append(links);
      list.append(li);
    });
  };

  form.addEventListener('change', render);
  form.addEventListener('submit', (e) => e.preventDefault());
  render();
}
