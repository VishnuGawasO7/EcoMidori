// script.js
// Main interactive script: header behavior, SVG flow particles, circular nodes and modal.

(function () {
  'use strict';

  // Header scroll state
  function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 60) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Smooth nav links for anchors
  function initSmoothNav() {
    document.querySelectorAll('a[href^="#"]').forEach(el => {
      el.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            // close mobile menu if open (if mobile-menu.js is loaded)
            if (window.initMobileMenu) {
              const menuToggle = document.querySelector('.menu-toggle');
              if (menuToggle && menuToggle.getAttribute('aria-expanded') === 'true') {
                // close via the global initMobileMenu logic (menu toggle listener)
                menuToggle.click();
                // allow close animation, then scroll
                setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 260);
                return;
              }
            }
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  // Circular flow SVG particle animation
  function initFlowParticles() {
    const svg = document.getElementById('flowSvg');
    const path = document.getElementById('flowPath');
    const particlesGroup = document.getElementById('particles');

    if (!svg || !path || !particlesGroup) return;

    // defensively compute path length
    let pathLength = 0;
    try {
      pathLength = path.getTotalLength();
    } catch (err) {
      return;
    }
    const particleCount = 10;
    const particleSpeed = 0.0009; // fraction per ms
    let movers = [];
    for (let i = 0; i < particleCount; i++) {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('r', '4');
      c.setAttribute('fill', '#9EE6B2');
      particlesGroup.appendChild(c);
      movers.push({ el: c, t: i / particleCount });
    }

    let last = performance.now();
    let running = true;

    function animateParticles(now) {
      if (!running) return;
      const dt = now - last;
      last = now;
      movers.forEach(m => {
        m.t += particleSpeed * dt;
        if (m.t > 1) m.t -= 1;
        const pos = path.getPointAtLength(m.t * pathLength);
        m.el.setAttribute('cx', pos.x);
        m.el.setAttribute('cy', pos.y);
      });
      requestAnimationFrame(animateParticles);
    }

    requestAnimationFrame(animateParticles);

    document.addEventListener('visibilitychange', () => {
      running = !document.hidden;
      if (running) {
        last = performance.now();
        requestAnimationFrame(animateParticles);
      }
    });
  }

  // Data for nodes (used by createCircularNodes + modal)
  const nodesData = [
    { id: 'node-make', title: 'Design & Make', body: 'Design with circularity: choose durable materials, modular parts and minimal waste.' },
    { id: 'node-use', title: 'Use', body: 'Extend product life through repair, maintenance and responsible consumption.' },
    { id: 'node-collect', title: 'Collect', body: 'Systems to take back products at end-of-life for proper processing.' },
    { id: 'node-recycle', title: 'Recycle', body: 'Recover and process materials to re-enter production as feedstock.' },
    { id: 'node-regenerate', title: 'Regenerate', body: 'Restore ecosystems and build nature-positive practices into production.' },
    { id: 'node-reinvent', title: 'Reinvent', body: 'New business models: leasing, sharing, and product-as-a-service to close the loop.' },
    { id: 'node-reuse', title: 'Reuse', body: 'Reuse and remanufacture products and components to extend lifecycle.' }
  ];

  // Create circular nodes (adds .node elements inside .circle if not present)
  function createCircularNodes() {
    const circle = document.querySelector('.circle');
    if (!circle) return;
    // avoid creating duplicates
    if (circle.querySelectorAll('.node').length) return;

    nodesData.forEach(node => {
      const nodeEl = document.createElement('div');
      nodeEl.className = 'node';
      nodeEl.id = node.id;
      nodeEl.textContent = node.title;
      nodeEl.setAttribute('role', 'button');
      nodeEl.setAttribute('tabindex', '0');
      nodeEl.setAttribute('aria-label', `Learn about ${node.title}`);
      circle.appendChild(nodeEl);

      // attach interaction events
      nodeEl.addEventListener('click', () => openNode(nodeEl, node));
      nodeEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          openNode(nodeEl, node);
          e.preventDefault();
        }
      });
      nodeEl.addEventListener('mouseenter', () => {
        nodeEl.classList.add('active');
        if (window.gsap) {
          gsap.to(nodeEl, { scale: 1.06, duration: 0.22, ease: 'power1.out' });
        }
      });
      nodeEl.addEventListener('mouseleave', () => {
        nodeEl.classList.remove('active');
        if (window.gsap) gsap.to(nodeEl, { scale: 1, duration: 0.2, ease: 'power1.out' });
      });
    });
  }

  // Modal and node open/close logic
  function initModal() {
    const modal = document.getElementById('nodeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const modalLink = document.getElementById('modalLink');

    function openNode(nodeEl, data) {
      if (!modal || !modalTitle || !modalBody) return;
      // highlight nodes
      document.querySelectorAll('.node').forEach(n => n.classList.remove('active'));
      if (nodeEl) nodeEl.classList.add('active');
      // set content
      modalTitle.textContent = data.title || '';
      modalBody.textContent = data.body || '';
      if (modalLink) modalLink.setAttribute('href', 'examples.html#' + (data.id || data.title?.toLowerCase?.().replace(/\s+/g, '-')));
      // show modal
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
      // optionally animate
      if (window.gsap) gsap.fromTo(modal, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
      // focus for accessibility
      modal.setAttribute('tabindex', '-1');
      modal.focus();
    }

    function closeModal() {
      if (!modal) return;
      if (window.gsap) {
        gsap.to(modal, { opacity: 0, y: 12, duration: 0.28, ease: 'power2.in', onComplete: () => {
          modal.style.display = 'none';
          modal.setAttribute('aria-hidden', 'true');
          document.querySelectorAll('.node').forEach(n => n.classList.remove('active'));
        }});
      } else {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.querySelectorAll('.node').forEach(n => n.classList.remove('active'));
      }
    }

    // expose openNode for nodes created elsewhere
    window.openNode = openNode;

    if (modalClose) modalClose.addEventListener('click', closeModal);
    // close modal on escape
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
    // close when clicking outside content
    if (modal) {
      modal.addEventListener('click', (ev) => {
        if (ev.target === modal) closeModal();
      });
    }
  }

  // init everything
  function init() {
    initHeaderScroll();
    initSmoothNav();
    initFlowParticles();
    createCircularNodes();
    initModal();
  }

  // Auto-run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
