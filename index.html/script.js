document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('currentYear');
  if (year) year.textContent = new Date().getFullYear();

  const heroCanvas = document.getElementById('heroChart');
  if (window.Chart && heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        datasets: [{
          label: 'Platform activity',
          data: [12, 19, 28, 45, 62, 89, 101],
          borderColor: '#00f2ff',
          backgroundColor: 'rgba(0,242,255,0.1)',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#ccc' } } },
        scales: {
          y: { grid: { color: '#ffffff20' }, ticks: { color: '#aaa' } },
          x: { ticks: { color: '#ccc' } }
        }
      }
    });
  }

  const counters = document.querySelectorAll('.stats-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        const target = Number(entry.target.dataset.target || 0);
        let count = 0;
        const step = () => {
          const increment = target / 45;
          if (count < target) {
            count += increment;
            entry.target.textContent = `${Math.floor(count)}${entry.target.textContent.includes('%') ? '%' : '+'}`;
            requestAnimationFrame(step);
          } else {
            entry.target.textContent = `${target}${entry.target.textContent.includes('%') ? '%' : '+'}`;
          }
        };
        step();
      }
    });
  }, { threshold: 0.4 });
  counters.forEach((counter) => observer.observe(counter));

  const revealElements = document.querySelectorAll('.scroll-reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });
  revealElements.forEach((el) => revealObserver.observe(el));

  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobilePanel = document.getElementById('mobileMenuPanel');
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  let isMenuOpen = false;

  function closeMobileMenu() {
    if (!isMenuOpen) return;
    isMenuOpen = false;
    hamburgerBtn?.setAttribute('aria-expanded', 'false');
    mobilePanel?.classList.remove('open');
    hamburgerIcon?.classList.remove('fa-times');
    hamburgerIcon?.classList.add('fa-bars');
  }

  function openMobileMenu() {
    if (isMenuOpen) return;
    isMenuOpen = true;
    hamburgerBtn?.setAttribute('aria-expanded', 'true');
    mobilePanel?.classList.add('open');
    hamburgerIcon?.classList.remove('fa-bars');
    hamburgerIcon?.classList.add('fa-times');
  }

  function toggleMobileMenu() {
    isMenuOpen ? closeMobileMenu() : openMobileMenu();
  }

  hamburgerBtn?.addEventListener('click', toggleMobileMenu);

  document.querySelectorAll('#mobileMenuPanel .mobile-nav-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }
      closeMobileMenu();
    });
  });

  document.getElementById('mobileLaunchBtn')?.addEventListener('click', () => {
    closeMobileMenu();
    openLaunchModal();
  });

  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  window.showToast = showToast;
  window.openWhatsApp = () => window.open('https://wa.me/256789722263?text=Hello%20Venus%20TECH', '_blank');

  const launchModal = document.getElementById('launchModal');
  const serviceModal = document.getElementById('serviceModal');
  const portfolioModal = document.getElementById('portfolioModal');

  window.openLaunchModal = () => launchModal?.classList.add('show');
  window.closeLaunchModal = (event) => {
    if (!event || event.target === launchModal) launchModal?.classList.remove('show');
  };
  window.openServiceModal = (title, description, techs) => {
    document.getElementById('serviceTitle').textContent = title;
    document.getElementById('serviceDescription').textContent = description;
    document.getElementById('serviceTechs').innerHTML = techs.map((tech) => `<span class="text-xs bg-cyan-500/20 px-3 py-1 rounded-full">${tech}</span>`).join('');
    serviceModal?.classList.add('show');
  };
  window.closeServiceModal = (event) => {
    if (!event || event.target === serviceModal) serviceModal?.classList.remove('show');
  };
  window.openPortfolioModal = (title, description, techs, type) => {
    document.getElementById('portfolioTitle').textContent = title;
    document.getElementById('portfolioDescription').textContent = description;
    document.getElementById('portfolioType').textContent = type;
    document.getElementById('portfolioTechs').innerHTML = techs.map((tech) => `<span class="text-xs bg-purple-500/20 px-3 py-1 rounded-full">${tech}</span>`).join('');
    portfolioModal?.classList.add('show');
  };
  window.closePortfolioModal = (event) => {
    if (!event || event.target === portfolioModal) portfolioModal?.classList.remove('show');
  };

  window.launchProject = () => {
    showToast('🚀 Thank you! Our team will contact you shortly.', 'success');
    window.closeLaunchModal();
    window.openWhatsApp();
  };

  window.exploreSolutions = () => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  window.viewCaseStudies = () => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
  window.scrollToHome = () => document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
  window.scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      launchModal?.classList.remove('show');
      serviceModal?.classList.remove('show');
      portfolioModal?.classList.remove('show');
    }
  });

  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) backToTop?.classList.add('show');
    else backToTop?.classList.remove('show');
  });
});
