function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navOverlay = document.querySelector('.nav-overlay');
  const menuClose = document.querySelector('.menu-close');
  const navLinks = document.querySelectorAll('.main-nav a');
  
  if (!menuToggle || !mainNav) return;
  
  function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('active');
    navOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isExpanded ? '' : 'hidden';
  }
  
  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Event listeners
  menuToggle.addEventListener('click', toggleMenu);
  menuClose.addEventListener('click', closeMenu);
  navOverlay.addEventListener('click', closeMenu);
  
  // Close menu when clicking on nav links (for single page navigation)
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        // For internal links, close menu after a short delay
        if (link.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute('href'));
          if (target) {
            closeMenu();
            setTimeout(() => {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
          }
        } else {
          // For external links, close menu immediately
          closeMenu();
        }
      }
    });
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
  
  // Close menu on window resize (if resizing to desktop)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
}


  function createCircularNodes() {
    const circle = document.querySelector('.circle');
    nodes.forEach((node) => {
      const nodeEl = document.createElement('div');
      nodeEl.className = 'node';
      nodeEl.id = node.id;
      nodeEl.textContent = node.title;
      nodeEl.setAttribute('role', 'button');
      nodeEl.setAttribute('tabindex', '0');
      nodeEl.setAttribute('aria-label', `Learn about ${node.title}`);
      circle.appendChild(nodeEl);
    });
  }



  // Leaf particle global on any pointer
function initLeafParticles() {
    function spawnLeaf(x, y, interactive = false) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf-particle' + (interactive ? ' interactive' : '');
        leaf.style.left = (x - 12) + 'px';
        leaf.style.top = (y - 12) + 'px';
        leaf.innerHTML = `<svg class="leaf-svg" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2c-1.5 0-5 2-7 6s-2 7 2 11 7 4 11 2 6-5 6-7-2-5-6-7c-4-2-7-5-6-5z" fill="url(#g)"></path>
            <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stop-color="#9EE6B2"/><stop offset="1" stop-color="#5FE07A"/>
            </linearGradient></defs>
        </svg>`;
        document.body.appendChild(leaf);
        
        const dx = (Math.random() - 0.5) * 360;
        const dy = interactive ? -(Math.random() * 10 + 80) : (window.innerHeight + 100);
        const rotate = (Math.random() - 0.5) * 540;
        const duration = interactive ? (1100 + Math.random() * 700) : (8000 + Math.random() * 4000);
        
        leaf.animate([
            { transform: 'translate(0px,0px) rotate(0deg)', opacity: interactive ? 1 : 0.8 },
            { transform: `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`, opacity: 0.02 }
        ], { duration: duration, easing: 'cubic-bezier(.12,.9,.4,1)' });
        
        setTimeout(() => leaf.remove(), duration + 50);
    }

    // Background leaves
    setInterval(() => {
        if (Math.random() > 0.7) {
            const x = Math.random() * window.innerWidth;
            spawnLeaf(x, -50);
        }
    }, 2000);

    // Interactive leaves
    ['pointerdown','touchstart','click'].forEach(ev => {
        window.addEventListener(ev, function(e) {
            const t = e.target;
            if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.closest('.contact-form'))) return;
            let clientX = e.clientX, clientY = e.clientY;
            if (e.touches && e.touches[0]) { 
                clientX = e.touches[0].clientX; 
                clientY = e.touches[0].clientY; 
            }
            spawnLeaf(clientX, clientY, true);
        }, { passive: true });
    });
}









































document.addEventListener('DOMContentLoaded', function(){
  // header behavior
  const header = document.getElementById('header');
  function onScroll(){ if(window.scrollY > 60) header.classList.add('scrolled'); else header.classList.remove('scrolled'); }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Smooth nav
  document.querySelectorAll('.main-nav a, .link-cta, .btn.primary, .btn.outline').forEach(el=>{
    el.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href && href.startsWith('#')){ e.preventDefault(); const target = document.querySelector(href); if(target) target.scrollIntoView({behavior:'smooth', block:'start'}); }
    })
  });

  // SVG flow interactions
  const svg = document.getElementById('flowSvg');
  const path = document.getElementById('flowPath');
  const particlesGroup = document.getElementById('particles');
  const pathLength = path.getTotalLength();
  // create animated resource particles that loop along path
  const particleCount = 10;
  const particleSpeed = 0.0009; // fraction per ms
  let movers = [];
  for(let i=0;i<particleCount;i++){
    const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('r','4');
    c.setAttribute('fill', '#9EE6B2');
    particlesGroup.appendChild(c);
    movers.push({el:c, t: i/particleCount});
  }

  let last = performance.now();
  let running = true;
  function animateParticles(now){
    if(!running) return;
    const dt = now - last;
    last = now;
    movers.forEach(m=>{
      m.t += particleSpeed * dt;
      if(m.t > 1) m.t -= 1;
      const pos = path.getPointAtLength(m.t * pathLength);
      m.el.setAttribute('cx', pos.x);
      m.el.setAttribute('cy', pos.y);
    });
    requestAnimationFrame(animateParticles);
  }
  requestAnimationFrame(animateParticles);

  // nodes data
  const nodes = [
    {id:'node-make', title:'Design & Make', body:'Design with circularity: choose durable materials, modular parts and minimal waste.'},
    {id:'node-use', title:'Use', body:'Extend product life through repair, maintenance and responsible consumption.'},
    {id:'node-collect', title:'Collect', body:'Systems to take back products at end-of-life for proper processing.'},
    {id:'node-recycle', title:'Recycle', body:'Recover and process materials to re-enter production as feedstock.'},
    {id:'node-regenerate', title:'Regenerate', body:'Restore ecosystems and build nature-positive practices into production.'},
    {id:'node-reinvent', title:'Reinvent', body:'New business models: leasing, sharing, and product-as-a-service to close the loop.'},
    {id:'node-reuse', title:'Reuse', body:'Reuse and remanufacture products and components to extend lifecycle.'}
  ];

  // Create circular nodes


  //createCircularNodes();

  const modal = document.getElementById('nodeModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const modalLink = document.getElementById('modalLink');

  function openNode(nodeEl, data){
    // highlight
    document.querySelectorAll('.node').forEach(n => n.classList.remove('active'));
    nodeEl.classList.add('active');
    modalTitle.textContent = data.title;
    modalBody.textContent = data.body;
    modalLink.href = 'examples.html#' + (data.id || data.title.toLowerCase());
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden','false');
    // animate modal entrance
    if(window.gsap) gsap.fromTo(modal, {opacity:0, y:20}, {opacity:1, y:0, duration:0.45, ease:'power2.out'});
  }
  function closeModal(){
    if(window.gsap){
      gsap.to(modal, {opacity:0, y:8, duration:0.28, ease:'power2.in', onComplete: ()=>{
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden','true');
      }});
    } else {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden','true');
    }
    document.querySelectorAll('.node').forEach(n => n.classList.remove('active'));
  }
  modalClose.addEventListener('click', closeModal);

  // attach events to nodes
  nodes.forEach(n=>{
    const el = document.getElementById(n.id);
    if(!el) return;
    el.addEventListener('keydown', (e)=> { if(e.key === 'Enter' || e.key === ' ') { openNode(el, n); e.preventDefault(); } });
    el.addEventListener('click', ()=> openNode(el, n));
    el.addEventListener('mouseenter', ()=> {
      el.classList.add('active');
      if(window.gsap) {
        gsap.to('#movingArrows', {stroke:'#CFFFF0', duration:0.4, ease:'power1.out'});
        setTimeout(()=> gsap.to('#movingArrows', {stroke:'#9EE6B2', duration:0.6, ease:'power1.out'}), 400);
      }
    });
    el.addEventListener('mouseleave', ()=> el.classList.remove('active'));
  });

  // close modal on escape
  window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });


    // initMobileMenu();
    initLeafParticles();

  // performance: pause particle animation on visibility hidden
  document.addEventListener('visibilitychange', ()=> { running = !document.hidden; if(running) requestAnimationFrame(animateParticles); });
});


