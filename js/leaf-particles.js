// leaf-particles.js - Reusable leaf particles for all pages
(function () {
  'use strict';

  class LeafParticles {
    constructor() {
      this._running = false;
      this._intervalId = null;
      this.start();
    }

    start() {
      if (this._running) return;
      this._running = true;
      this.spawnInitialLeaves();
      this.addInteractivity();
      this.startContinuousSpawning();
    }

    stop() {
      this._running = false;
      if (this._intervalId) {
        clearInterval(this._intervalId);
        this._intervalId = null;
      }
    }

    spawnInitialLeaves() {
      for (let i = 0; i < 8; i++) {
        setTimeout(() => this.spawnRandomLeaf(), i * 300);
      }
    }

    startContinuousSpawning() {
      this._intervalId = setInterval(() => {
        if (this._running && Math.random() > 0.7) {
          this.spawnRandomLeaf();
        }
      }, 2000);
    }

    spawnRandomLeaf() {
      const viewportWidth = window.innerWidth;
      const x = Math.random() * viewportWidth;
      const startY = -50;
      this.createLeaf(x, startY);
    }

    createLeaf(x, y) {
      const leaf = document.createElement('div');
      leaf.className = 'leaf-particle';
      leaf.style.left = x + 'px';
      leaf.style.top = y + 'px';

      const size = 16 + Math.random() * 12;
      leaf.style.width = size + 'px';
      leaf.style.height = size + 'px';
      leaf.innerHTML = this.getLeafSVG();
      document.body.appendChild(leaf);

      const dx = (Math.random() - 0.5) * 200;
      const dy = window.innerHeight + 100;
      const rotate = (Math.random() - 0.5) * 720;
      const duration = 8000 + Math.random() * 4000;
      const delay = Math.random() * 2000;

      const anim = leaf.animate([
        { transform: 'translate(0px, 0px) rotate(0deg)', opacity: 0.8 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`, opacity: 0 }
      ], {
        duration: duration,
        delay: delay,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      });

      anim.onfinish = () => {
        if (leaf.parentNode) leaf.remove();
      };
      
      setTimeout(() => { 
        if (leaf.parentNode) leaf.remove(); 
      }, duration + delay + 300);
    }

    getLeafSVG() {
      const leafTypes = [
        `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c-1.5 0-5 2-7 6s-2 7 2 11 7 4 11 2 6-5 6-7-2-5-6-7c-4-2-7-5-6-5z" fill="url(#g1)"></path><defs><linearGradient id="g1" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#9EE6B2"/><stop offset="1" stop-color="#5FE07A"/></linearGradient></defs></svg>`,
        `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c-3 2-5 6-5 9s1 7 5 9 7 1 9-3 1-7-3-9c-2-2-5-6-6-6z" fill="url(#g2)"></path><defs><linearGradient id="g2" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#A3E8B5"/><stop offset="1" stop-color="#67D285"/></linearGradient></defs></svg>`,
        `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4c4-2 8-1 10 2s1 7-2 10-7 3-10 0-3-8 2-12z" fill="url(#g3)"></path><defs><linearGradient id="g3" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#8CDFA4"/><stop offset="1" stop-color="#4ACA6C"/></linearGradient></defs></svg>`
      ];
      return leafTypes[Math.floor(Math.random() * leafTypes.length)];
    }

    addInteractivity() {
      ['pointerdown', 'touchstart', 'click'].forEach(ev => {
        window.addEventListener(ev, (e) => {
          const t = e.target;
          if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.closest && t.closest('.contact-form'))) return;
          
          let clientX = e.clientX, clientY = e.clientY;
          if (e.touches && e.touches[0]) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
          }
          
          this.spawnInteractiveLeaf(clientX, clientY);
        }, { passive: true });
      });
    }

    spawnInteractiveLeaf(x, y) {
      const leaf = document.createElement('div');
      leaf.className = 'leaf-particle interactive';
      leaf.style.left = (x - 12) + 'px';
      leaf.style.top = (y - 12) + 'px';
      leaf.style.width = '22px';
      leaf.style.height = '22px';
      leaf.innerHTML = this.getLeafSVG();
      document.body.appendChild(leaf);

      const dx = (Math.random() - 0.5) * 360;
      const dy = -(Math.random() * 10 + 80);
      const rotate = (Math.random() - 0.5) * 540;
      const duration = 1100 + Math.random() * 700;

      const anim = leaf.animate([
        { transform: 'translate(0px, 0px) rotate(0deg)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`, opacity: 0.02 }
      ], {
        duration: duration,
        easing: 'cubic-bezier(.12,.9,.4,1)'
      });

      anim.onfinish = () => {
        if (leaf.parentNode) leaf.remove();
      };
      
      setTimeout(() => { 
        if (leaf.parentNode) leaf.remove(); 
      }, duration + 200);
    }
  }

  // Initialize when DOM is loaded (defensive: only once)
  if (!window.__LeafParticlesInitialized) {
    let leafParticlesInstance = null;
    
    function initLeafParticles() {
      if (!leafParticlesInstance) {
        leafParticlesInstance = new LeafParticles();
      }
    }

    function destroyLeafParticles() {
      if (leafParticlesInstance) {
        leafParticlesInstance.stop();
        leafParticlesInstance = null;
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => { 
        initLeafParticles(); 
        window.__LeafParticlesInitialized = true;
      });
    } else {
      initLeafParticles();
      window.__LeafParticlesInitialized = true;
    }

    // Expose for manual control
    window.LeafParticles = {
      init: initLeafParticles,
      destroy: destroyLeafParticles
    };
  }

})();