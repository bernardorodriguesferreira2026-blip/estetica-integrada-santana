const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
const header = document.querySelector('.site-header');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const closeMenu = () => {
  menuToggle?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  nav?.removeAttribute('style');
};

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  if (isOpen) {
    nav.style.display = 'flex';
    nav.style.position = 'absolute';
    nav.style.top = '74px';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.margin = '0';
    nav.style.padding = '26px 6vw 30px';
    nav.style.flexDirection = 'column';
    nav.style.gap = '22px';
    nav.style.background = '#11120f';
    nav.style.borderTop = '1px solid rgba(217,227,107,.25)';
  } else {
    closeMenu();
  }
});

document.querySelectorAll('.desktop-nav a').forEach((link) => link.addEventListener('click', closeMenu));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const tiltCard = document.querySelector('.tilt-card');
if (tiltCard && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  tiltCard.addEventListener('mousemove', (event) => {
    const bounds = tiltCard.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const rotateX = (y - 0.5) * -5;
    const rotateY = (x - 0.5) * 5;
    tiltCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    tiltCard.style.setProperty('--mouse-x', `${x * 100}%`);
    tiltCard.style.setProperty('--mouse-y', `${y * 100}%`);
  });
  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  });
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  window.requestAnimationFrame(() => {
    header?.classList.toggle('scrolled', window.scrollY > 30);
    ticking = false;
  });
  ticking = true;
}, { passive: true });
