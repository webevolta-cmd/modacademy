// Click-to-load map: no third-party request until the visitor asks for it.
const EMBED = 'https://www.google.com/maps?q=40.175927,44.513697&z=17&hl=hy&output=embed';

export function initMap(root: HTMLElement): void {
  const button = root.querySelector<HTMLButtonElement>('[data-map-load]');
  const canvas = root.querySelector<HTMLElement>('[data-map-canvas]');
  if (!button || !canvas) return;

  button.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = EMBED;
    frame.title = 'MOD Academy-ի գտնվելու վայրը քարտեզի վրա՝ Տիգրան Մեծի պողոտա 4, Երևան';
    frame.loading = 'lazy';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.allowFullscreen = true;
    canvas.replaceChildren(frame);
    button.remove();
  });
}
