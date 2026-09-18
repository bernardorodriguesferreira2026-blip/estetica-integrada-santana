const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');

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
    nav.style.background = '#171411';
    nav.style.borderTop = '1px solid rgba(212,178,116,.25)';
  } else {
    nav.removeAttribute('style');
  }
});

document.querySelectorAll('.desktop-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    nav?.removeAttribute('style');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const tiltCard = document.querySelector('.tilt-card');
if (tiltCard && window.matchMedia('(pointer: fine)').matches) {
  tiltCard.addEventListener('mousemove', (event) => {
    const bounds = tiltCard.getBoundingClientRect();
    const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -5;
    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 5;
    tiltCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  });
}

const header = document.querySelector('.site-header');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 30) {
    header?.classList.add('scrolled');
    header?.style.setProperty('background', 'rgba(23,20,17,.93)');
    header?.style.setProperty('backdrop-filter', 'blur(14px)');
  } else {
    header?.classList.remove('scrolled');
    header?.style.removeProperty('background');
    header?.style.removeProperty('backdrop-filter');
  }
  lastScroll = currentScroll;
}, { passive: true });
