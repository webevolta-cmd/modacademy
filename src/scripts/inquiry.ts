// Inquiry form: validation, submission and honest result states.
// Modes (set at build time, see site.config.mjs):
//   netlify  — POST to Netlify Forms (form detection must be enabled on the Netlify site)
//   endpoint — POST to FORM_ENDPOINT (e.g. Formspree)
//   offline  — no online receiver exists for this build; visitors get working direct channels
import { motionAllowed } from './motion';

const EMAIL = 'mod.modacademy@gmail.com';

const messages = {
  name: 'Խնդրում ենք նշել Ձեր անունը։',
  contact: 'Նշեք հեռախոսահամար կամ էլ. փոստ, որպեսզի ակադեմիան կարողանա կապվել Ձեզ հետ։',
  phone: 'Հեռախոսահամարը ճիշտ չէ։ Օրինակ՝ 093 950 960 կամ +374 93 950 960։',
  email: 'Էլ. փոստի հասցեն ճիշտ չէ։ Օրինակ՝ name@example.com',
  summary: 'Ստուգեք նշված դաշտերը։',
};

const phoneOk = (v: string) => {
  const digits = v.replace(/[^\d]/g, '');
  return /^[+\d][\d\s\-().]*$/.test(v.trim()) && digits.length >= 8 && digits.length <= 15;
};
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export function initInquiry(wrapper: HTMLElement): void {
  const form = wrapper.querySelector<HTMLFormElement>('[data-inquiry-form]');
  if (!form) return;
  const summary = wrapper.querySelector<HTMLElement>('[data-inq-summary]')!;
  const success = wrapper.querySelector<HTMLElement>('[data-inq-success]')!;
  const fallback = wrapper.querySelector<HTMLElement>('[data-inq-fallback]')!;
  const fallbackTitle = wrapper.querySelector<HTMLElement>('[data-inq-fallback-title]')!;
  const fallbackText = wrapper.querySelector<HTMLElement>('[data-inq-fallback-text]')!;
  const mailto = wrapper.querySelector<HTMLAnchorElement>('[data-inq-mailto]')!;
  const submit = wrapper.querySelector<HTMLButtonElement>('[data-inq-submit]')!;
  const label = wrapper.querySelector<HTMLElement>('[data-inq-label]')!;

  const mode = form.dataset.formMode ?? 'offline';
  const endpoint = form.dataset.endpoint ?? '';
  const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;

  const setError = (input: HTMLElement | null, message: string) => {
    if (!input) return;
    const err = document.getElementById(`${input.id}-err`);
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      if (err) {
        err.textContent = message;
        err.hidden = false;
      }
    } else {
      input.removeAttribute('aria-invalid');
      if (err) {
        err.textContent = '';
        err.hidden = true;
      }
    }
  };

  const validate = (): HTMLElement | null => {
    const name = field('name');
    const phone = field('phone');
    const email = field('email');
    let first: HTMLElement | null = null;
    const fail = (el: HTMLElement | null, msg: string) => {
      setError(el, msg);
      if (!first && el) first = el;
    };

    if (!name?.value.trim()) fail(name, messages.name);
    else setError(name, '');

    const p = phone?.value.trim() ?? '';
    const e = email?.value.trim() ?? '';
    setError(phone, '');
    setError(email, '');
    if (!p && !e) {
      fail(phone, messages.contact);
    } else {
      if (p && !phoneOk(p)) fail(phone, messages.phone);
      if (e && !emailOk(e)) fail(email, messages.email);
    }
    return first;
  };

  // Clear an error as soon as the visitor fixes the field.
  form.addEventListener('input', (event) => {
    const t = event.target as HTMLElement;
    if (t.getAttribute('aria-invalid') === 'true') {
      if (t.id === 'inq-phone' || t.id === 'inq-email') {
        setError(field('phone'), '');
        setError(field('email'), '');
      } else {
        setError(t, '');
      }
    }
  });

  const buildMailto = () => {
    const data = new FormData(form);
    const course = String(data.get('course') ?? '');
    const lines = [
      `Անուն՝ ${data.get('name') ?? ''}`,
      `Հեռախոս՝ ${data.get('phone') ?? ''}`,
      `Էլ. փոստ՝ ${data.get('email') ?? ''}`,
      `Դասընթաց՝ ${course}`,
      '',
      String(data.get('message') ?? ''),
    ];
    return `mailto:${EMAIL}?subject=${encodeURIComponent(`Հայտ — ${course}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  const showFallback = (offline: boolean) => {
    fallbackTitle.textContent = offline ? 'Ուղարկեք հայտն ուղղակիորեն' : 'Հայտը չհաջողվեց ուղարկել';
    fallbackText.textContent = offline
      ? 'Կայքի այս տարբերակում առցանց հայտերի ընդունումը դեռ միացված չէ։ Ձեր լրացրած տվյալները պահպանված են․ ուղարկեք դրանք էլ. փոստով կամ կապվեք ակադեմիայի հետ։'
      : 'Կապի խնդիր առաջացավ, և հայտը չի ուղարկվել։ Ձեր տվյալները պահպանված են․ փորձեք կրկին կամ կապվեք ակադեմիայի հետ ստորև նշված եղանակներով։';
    mailto.href = buildMailto();
    fallback.hidden = false;
    fallback.focus({ preventScroll: true });
    fallback.scrollIntoView({ behavior: motionAllowed() ? 'smooth' : 'auto', block: 'nearest' });
  };

  const setBusy = (busy: boolean) => {
    submit.setAttribute('aria-busy', String(busy));
    submit.disabled = busy;
    label.textContent = busy ? 'Ուղարկվում է…' : 'Ուղարկել հայտը';
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    summary.hidden = true;
    fallback.hidden = true;

    const firstInvalid = validate();
    if (firstInvalid) {
      summary.textContent = messages.summary;
      summary.hidden = false;
      (firstInvalid as HTMLElement).focus();
      return;
    }

    // Spam trap: silently stop if the hidden field was filled.
    if ((field('bot-field')?.value ?? '').length) return;

    if (mode === 'offline') {
      showFallback(true);
      return;
    }

    setBusy(true);
    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
      const res = await fetch(mode === 'endpoint' ? endpoint : '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json, text/html' },
        body,
      });
      if (!res.ok) throw new Error(String(res.status));
      form.hidden = true;
      success.hidden = false;
      success.focus({ preventScroll: true });
      success.scrollIntoView({ behavior: motionAllowed() ? 'smooth' : 'auto', block: 'center' });
    } catch {
      showFallback(false);
    } finally {
      setBusy(false);
    }
  });
}
