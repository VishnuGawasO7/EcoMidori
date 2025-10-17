/* script.js — EcoMidori homepage interactivity (dark theme & leaf particles) */
document.addEventListener('DOMContentLoaded', function(){
  // Header scroll behavior
  const header = document.getElementById('header');
  function onScroll(){
    if(window.scrollY > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Smooth nav links
  document.querySelectorAll('.main-nav a, .link-cta, .btn.primary, .btn.outline').forEach(el=>{
    el.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    })
  });

  // Build circular segments with precise positioning
  const segments = [
    {key:'Make', desc:'Design and produce with sustainable materials and low-impact processes.'},
    {key:'Use', desc:'Products designed for longevity and repairability during active use.'},
    {key:'Recycle', desc:'Recover valuable materials at end-of-life to re-enter production.'},
    {key:'Regenerate', desc:'Restore ecosystems and replenish resources through nature-positive action.'},
    {key:'Reuse', desc:'Keep products in circulation via reuse, resale and sharing models.'},
    {key:'Reinvent', desc:'New business models and innovation that close the loop.'}
  ];
  const circle = document.getElementById('circle');
  let segEls = [];
  function buildSegments(){
    circle.innerHTML = '';
    segEls = [];
    const rect = circle.getBoundingClientRect();
    const cx = rect.width/2;
    const cy = rect.height/2;
    const radius = Math.min(cx,cy) - 90; // distance from center to place segments
    segments.forEach((s, i)=>{
      const seg = document.createElement('div');
      seg.className = 'seg';
      seg.setAttribute('role','button');
      seg.setAttribute('tabindex','0');
      seg.setAttribute('data-key', s.key);
      seg.innerHTML = `<div class="seg-label">${s.key}</div>`;
      circle.appendChild(seg);
      // compute angle
      const angleDeg = (i * (360 / segments.length)) - 90; // -90 so first at top
      const rad = angleDeg * (Math.PI/180);
      const x = Math.cos(rad) * radius;
      const y = Math.sin(rad) * radius;
      seg.style.left = '50%';
      seg.style.top = '50%';
      seg.style.transform = `translate(${x}px, ${y}px) rotate(${angleDeg}deg)`;
      // counter-rotate label so it reads upright
      const label = seg.querySelector('.seg-label');
      label.style.transform = `rotate(${-angleDeg}deg)`;
      // interactions
      seg.addEventListener('mouseenter', ()=> showInfo(s, seg));
      seg.addEventListener('focus', ()=> showInfo(s, seg));
      seg.addEventListener('mouseleave', hideInfo);
      seg.addEventListener('blur', hideInfo);
      seg.addEventListener('click', ()=> openExamples(s.key));
      seg.addEventListener('keydown', (ev)=> { if(ev.key === 'Enter' || ev.key === ' ') openExamples(s.key); });
      segEls.push(seg);
    });
  }
  buildSegments();
  window.addEventListener('resize', ()=> { buildSegments(); });

  const infoBox = document.getElementById('segmentInfo');
  const segTitle = document.getElementById('segTitle');
  const segDesc = document.getElementById('segDesc');
  function showInfo(obj, seg){
    segTitle.textContent = obj.key;
    segDesc.textContent = obj.desc;
    // position infoBox near segment (if space allows)
    const segRect = seg.getBoundingClientRect();
    // if segment on right side, keep right; if on left, position left
    if(segRect.left < window.innerWidth/2){
      infoBox.style.right = 'auto';
      infoBox.style.left = Math.max(12, segRect.left + window.scrollX) + 'px';
    } else {
      infoBox.style.left = 'auto';
      infoBox.style.right = Math.max(12, window.innerWidth - segRect.right - window.scrollX) + 'px';
    }
    infoBox.style.bottom = Math.max(80, window.innerHeight - segRect.bottom + 20) + 'px';
    infoBox.style.display = 'block';
    infoBox.setAttribute('aria-hidden','false');
  }
  function hideInfo(){
    infoBox.style.display = 'none';
    infoBox.setAttribute('aria-hidden','true');
  }
  function openExamples(key){
    // For now navigate to examples page; you could open a modal with resources.
    const center = document.querySelector('.circle-center');
    if(center){
      center.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}], {duration:450, easing:'ease-out'});
    }
    setTimeout(()=>{ window.location.href = 'examples.html'; }, 220);
  }

  // Pause rotation while hovered
  const circleEl = document.getElementById('circle');
  circleEl.addEventListener('mouseenter', ()=> circleEl.style.animationPlayState = 'paused');
  circleEl.addEventListener('mouseleave', ()=> circleEl.style.animationPlayState = 'running');

  // Intersection Observer for reveal animations
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('inview');
        io.unobserve(entry.target);
      }
    })
  }, {threshold:0.15});
  document.querySelectorAll('[data-animate], .teaser, .section-title').forEach(el=> io.observe(el));

  // GSAP animations if available
  if(window.gsap){
    gsap.utils.toArray('.card').forEach((el, i)=>{
      gsap.from(el, {opacity:0, y:18, delay: 0.18*i, duration:0.8, ease:'power2.out', scrollTrigger:{trigger:el, start:'top 85%'}});
    });
    gsap.from('.headline', {opacity:0, y:14, duration:1, delay:0.1});
    gsap.from('.subhead', {opacity:0, y:10, duration:1, delay:0.25});
    gsap.from('#exploreBtn', {opacity:0, scale:0.98, duration:0.7, delay:0.4});
  }

  // Sound toggle (ambient audio) — audio src left empty; user may add
  const soundBtn = document.getElementById('soundToggle');
  const audio = document.getElementById('ambientAudio');
  soundBtn.addEventListener('click', ()=>{
    if(!audio.src){ alert('No ambient sound file provided. Add a sound file URL to the audio element in the HTML to enable this feature.'); return; }
    const isPlaying = soundBtn.getAttribute('aria-pressed') === 'true';
    if(isPlaying){
      audio.pause(); soundBtn.setAttribute('aria-pressed','false');
    } else {
      audio.play(); soundBtn.setAttribute('aria-pressed','true');
    }
  });

  // Accessibility: close info on esc
  window.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') hideInfo();
  });

  // Mobile nav toggle
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  menuBtn.addEventListener('click', ()=>{
    const open = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!open));
    nav.style.display = open ? 'none' : 'flex';
  });

  // Leaf particle effect on click / touch anywhere
  function spawnLeaf(x, y){
    const leaf = document.createElement('div');
    leaf.className = 'leaf-particle';
    leaf.style.left = (x - 11) + 'px';
    leaf.style.top = (y - 11) + 'px';
    leaf.innerHTML = `<svg class="leaf-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2c-1.5 0-5 2-7 6s-2 7 2 11 7 4 11 2 6-5 6-7-2-5-6-7c-4-2-7-5-6-5z" fill="url(#g)"></path>
      <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#9EE6B2"/><stop offset="1" stop-color="#5FE07A"/></linearGradient></defs>
    </svg>`;
    document.body.appendChild(leaf);

    // random trajectory animation using Web Animations API
    const dx = (Math.random() - 0.5) * 200; // horizontal spread
    const dy = - (Math.random() * 180 + 80); // upward
    const rotate = (Math.random() - 0.5) * 720;
    const duration = 1200 + Math.random()*800;
    leaf.animate([
      { transform: 'translate(0px,0px) rotate(0deg)', opacity:1 },
      { transform: `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`, opacity:0.02 }
    ], { duration: duration, easing: 'cubic-bezier(.12,.9,.4,1)' });
    // remove after animation
    setTimeout(()=> leaf.remove(), duration + 50);
  }

  // Attach pointer handlers (works for mouse and touch)
  function onPointer(e){
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    spawnLeaf(x, y);
  }
  ['pointerdown','touchstart','click'].forEach(ev=>{
    window.addEventListener(ev, function(e){
      // avoid firing when clicking interactive controls like buttons (we still allow, though)
      // but to keep effect subtle, ignore if target is input or textarea
      const t = e.target;
      if(t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.closest('.contact-form'))) return;
      onPointer(e);
    }, {passive:true});
  });

  // Graffiti click effect for buttons (kept for buttons)
  function createGraffiti(e){
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const gx = e.clientX - rect.left;
    const gy = e.clientY - rect.top;
    const splat = document.createElement('span');
    splat.className = 'graffiti';
    const size = Math.max(40, Math.min(120, Math.random()*100 + 20));
    splat.style.width = size + 'px';
    splat.style.height = size + 'px';
    const colors = [
      'radial-gradient(circle at 30% 30%, rgba(255,200,100,0.95) 0%, rgba(255,100,100,0.85) 35%, rgba(200,50,180,0.65) 100%)',
      'radial-gradient(circle at 30% 30%, rgba(120,255,180,0.95) 0%, rgba(60,200,120,0.85) 35%, rgba(30,120,90,0.65) 100%)',
      'radial-gradient(circle at 30% 30%, rgba(160,220,255,0.95) 0%, rgba(100,150,255,0.85) 35%, rgba(60,90,200,0.65) 100%)'
    ];
    splat.style.background = colors[Math.floor(Math.random()*colors.length)];
    splat.style.left = gx + 'px';
    splat.style.top = gy + 'px';
    splat.style.position = 'absolute';
    splat.style.pointerEvents = 'none';
    btn.appendChild(splat);
    setTimeout(()=> { splat.remove(); }, 800);
  }
  document.querySelectorAll('.btn').forEach(b=>{
    b.addEventListener('click', createGraffiti);
  });

});
