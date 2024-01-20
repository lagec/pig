(function () {
  const r = document.createElement('link').relList;
  if (r && r.supports && r.supports('modulepreload')) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) b(t);
  new MutationObserver(t => {
    for (const n of t) if (n.type === 'childList') for (const d of n.addedNodes) d.tagName === 'LINK' && d.rel === 'modulepreload' && b(d);
  }).observe(document, {childList: !0, subtree: !0});
  function o(t) {
    const n = {};
    return (
      t.integrity && (n.integrity = t.integrity),
      t.referrerPolicy && (n.referrerPolicy = t.referrerPolicy),
      t.crossOrigin === 'use-credentials' ? (n.credentials = 'include') : t.crossOrigin === 'anonymous' ? (n.credentials = 'omit') : (n.credentials = 'same-origin'),
      n
    );
  }
  function b(t) {
    if (t.ep) return;
    t.ep = !0;
    const n = o(t);
    fetch(t.href, n);
  }
})();
const y = document.querySelector('.app__interface-roll-btn'),
  u = document.querySelector('.app__interface-new-btn'),
  i = document.querySelector('.app__interface-keep-btn'),
  s = document.querySelector('.app__interface-dice-img');
let c = document.querySelector('.app__player1-points-block-score'),
  a = document.querySelector('.app__player2-points-block-score'),
  p = document.querySelector('.app__player1-total-score'),
  f = document.querySelector('.app__player2-total-score'),
  g = document.querySelector('.app__player1'),
  l = document.querySelector('.app__player2');
const m = () => {
  g.classList.toggle('waiting'), l.classList.toggle('waiting');
};
y.addEventListener('click', () => {
  u.removeAttribute('disabled', ''), i.removeAttribute('disabled', '');
  let e, r;
  l.classList.contains('waiting') ? ((e = c), (r = +c.textContent)) : ((e = a), (r = +a.textContent));
  let o = Math.trunc(Math.random() * 6) + 1;
  s.classList.remove('hidden'), (s.src = `./images/dice${o}.png`), o !== 1 ? (e.textContent = r + o) : ((e.textContent = 0), m());
});
i.addEventListener('click', () => {
  if (l.classList.contains('waiting'))
    var e = p,
      r = c,
      o = f;
  else
    var e = f,
      r = a,
      o = p;
  (e.textContent = +r.textContent + +e.textContent),
    e.textContent >= 100 ? ((e.textContent = '🏆'), (o.textContent = '🐽'), s.classList.add('hidden'), y.setAttribute('disabled', ''), i.setAttribute('disabled', ''), m()) : (r.textContent = 0),
    m();
});
u.addEventListener('click', () => {
  g.classList.remove('waiting'),
    l.classList.add('waiting'),
    [y, i].forEach(e => e.removeAttribute('disabled')),
    s.classList.add('hidden'),
    u.setAttribute('disabled', ''),
    i.setAttribute('disabled', ''),
    [p, f, c, a].forEach(e => {
      e.textContent = 0;
    });
});
