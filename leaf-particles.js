// leaf-particles.js - Reusable leaf particles for all pages
class LeafParticles {
    constructor() {
        this.init();
    }

    init() {
        // Spawn initial leaves
        this.spawnInitialLeaves();
        
        // Add click/touch listeners for interactive leaves
        this.addInteractivity();
        
        // Continuous leaf spawning
        this.startContinuousSpawning();
    }

    spawnInitialLeaves() {
        // Spawn some leaves randomly on page load
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                this.spawnRandomLeaf();
            }, i * 300);
        }
    }

    startContinuousSpawning() {
        // Spawn leaves periodically
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance every interval
                this.spawnRandomLeaf();
            }
        }, 2000);
    }

    spawnRandomLeaf() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Spawn from random positions at the top
        const x = Math.random() * viewportWidth;
        const startY = -50; // Start above viewport
        
        this.createLeaf(x, startY);
    }

    createLeaf(x, y) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf-particle';
        leaf.style.left = x + 'px';
        leaf.style.top = y + 'px';
        
        // Random size variation
        const size = 16 + Math.random() * 12;
        leaf.style.width = size + 'px';
        leaf.style.height = size + 'px';
        
        leaf.innerHTML = this.getLeafSVG();
        document.body.appendChild(leaf);

        // Animation
        const dx = (Math.random() - 0.5) * 200;
        const dy = viewportHeight + 100;
        const rotate = (Math.random() - 0.5) * 720;
        const duration = 8000 + Math.random() * 4000;
        const delay = Math.random() * 2000;

        leaf.animate([
            { 
                transform: 'translate(0px, 0px) rotate(0deg)', 
                opacity: 0.8 
            },
            { 
                transform: `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`, 
                opacity: 0 
            }
        ], { 
            duration: duration, 
            delay: delay,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)' 
        });

        setTimeout(() => leaf.remove(), duration + delay + 100);
    }

    getLeafSVG() {
        const leafTypes = [
            // Type 1 - Simple leaf
            `<svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2c-1.5 0-5 2-7 6s-2 7 2 11 7 4 11 2 6-5 6-7-2-5-6-7c-4-2-7-5-6-5z" fill="url(#g1)"></path>
                <defs><linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stop-color="#9EE6B2"/><stop offset="1" stop-color="#5FE07A"/>
                </linearGradient></defs>
            </svg>`,

            // Type 2 - Different leaf shape
            `<svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3c-3 2-5 6-5 9s1 7 5 9 7 1 9-3 1-7-3-9c-2-2-5-6-6-6z" fill="url(#g2)"></path>
                <defs><linearGradient id="g2" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stop-color="#A3E8B5"/><stop offset="1" stop-color="#67D285"/>
                </linearGradient></defs>
            </svg>`,

            // Type 3 - Another variation
            `<svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 4c4-2 8-1 10 2s1 7-2 10-7 3-10 0-3-8 2-12z" fill="url(#g3)"></path>
                <defs><linearGradient id="g3" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stop-color="#8CDFA4"/><stop offset="1" stop-color="#4ACA6C"/>
                </linearGradient></defs>
            </svg>`
        ];

        return leafTypes[Math.floor(Math.random() * leafTypes.length)];
    }

    addInteractivity() {
        ['pointerdown', 'touchstart', 'click'].forEach(ev => {
            window.addEventListener(ev, (e) => {
                const t = e.target;
                if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.closest('.contact-form'))) return;
                
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
        leaf.innerHTML = this.getLeafSVG();
        document.body.appendChild(leaf);

        const dx = (Math.random() - 0.5) * 360;
        const dy = -(Math.random() * 10 + 80);
        const rotate = (Math.random() - 0.5) * 540;
        const duration = 1100 + Math.random() * 700;

        leaf.animate([
            { transform: 'translate(0px, 0px) rotate(0deg)', opacity: 1 },
            { transform: `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`, opacity: 0.02 }
        ], { 
            duration: duration, 
            easing: 'cubic-bezier(.12,.9,.4,1)' 
        });

        setTimeout(() => leaf.remove(), duration + 50);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new LeafParticles();
});