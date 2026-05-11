// js/rituals.js — Ritual interactions & animations (Sprint 3)

const Rituals = (() => {

    // --- Arrival Blessing (#1) ---
    function initArrivalBlessing() {
        // Only show once per session
        if (sessionStorage.getItem('arrival_shown')) return;
        sessionStorage.setItem('arrival_shown', '1');

        const lang = (window.I18n && window.I18n.getLang()) || localStorage.getItem('neha_lang') || 'en';
        const overlay = document.createElement('div');
        overlay.className = 'arrival-overlay';
        overlay.innerHTML = `
            <div class="arrival-diya"></div>
            <div class="arrival-text ${lang === 'hi' ? 'hindi' : ''}">
                ${lang === 'hi'
                    ? 'नेहा तोमर की याद में आपका स्वागत है'
                    : 'Welcome — you are in a place of remembrance'}
            </div>`;
        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.classList.add('fade-out');
            setTimeout(() => overlay.remove(), 900);
        }, 2200);
    }

    // --- Moment Clock (#2) ---
    function initMomentClock() {
        const clockValue = document.getElementById('momentClockValue');
        const clockLabel = document.getElementById('momentClockLabel');
        if (!clockValue) return;

        // Neha's date of passing — update this to the actual date
        const passingDate = new Date('2023-10-01T00:00:00');

        function formatClockValue(lang) {
            const now = new Date();
            const diff = now - passingDate;
            if (diff <= 0) return '';

            const totalDays = Math.floor(diff / 86400000);
            const years = Math.floor(totalDays / 365);
            const months = Math.floor((totalDays % 365) / 30);
            const days = totalDays % 30;

            if (lang === 'hi') {
                const toHindi = n => n.toString().replace(/\d/g, d => '०१२३४५६७८९'[d]);
                const parts = [];
                if (years > 0) parts.push(`${toHindi(years)} साल`);
                if (months > 0) parts.push(`${toHindi(months)} महीने`);
                parts.push(`${toHindi(days)} दिन`);
                return parts.join(', ');
            } else {
                const parts = [];
                if (years > 0) parts.push(`${years} year${years !== 1 ? 's' : ''}`);
                if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`);
                parts.push(`${days} day${days !== 1 ? 's' : ''}`);
                return parts.join(', ');
            }
        }

        function updateClock() {
            const lang = (window.I18n && window.I18n.getLang()) || 'en';
            clockValue.textContent = formatClockValue(lang);
            clockValue.className = `moment-clock-value${lang === 'hi' ? ' hindi' : ''}`;
            if (clockLabel) {
                const labelKey = 'clock.label';
                clockLabel.textContent = window.I18n ? window.I18n.t(labelKey) : clockLabel.textContent;
                clockLabel.setAttribute('lang', lang);
            }
        }

        updateClock();
        setInterval(updateClock, 60000);
        document.addEventListener('langChange', updateClock);
    }

    // --- Scroll Petals (#3, #17) ---
    const PETALS = {
        hero: ['🌼', '🌼', '🌸'],       // marigold
        gallery: ['🌹', '🌹', '🌸'],     // rose
        memory: ['✿', '🌸', '✿'],        // jasmine-style
    };

    let lastScrollY = 0;
    let petalThrottle = false;

    function spawnPetal(section) {
        if (petalThrottle) return;
        petalThrottle = true;
        setTimeout(() => { petalThrottle = false; }, 320);

        const petals = PETALS[section] || PETALS['hero'];
        const char = petals[Math.floor(Math.random() * petals.length)];
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = char;
        petal.style.left = `${15 + Math.random() * 70}vw`;
        petal.style.top = `${Math.random() * 40 + 20}vh`;
        petal.style.fontSize = `${0.9 + Math.random() * 0.8}rem`;
        document.body.appendChild(petal);
        // Trigger animation
        requestAnimationFrame(() => { petal.style.opacity = '0.9'; });
        setTimeout(() => petal.remove(), 2400);
    }

    function getCurrentSection() {
        const sections = [
            { id: 'heroSection', name: 'hero' },
            { id: 'slideshowContainer', name: 'gallery' },
            { id: 'memorySlideshowContainer', name: 'memory' },
        ];
        for (const s of sections) {
            const el = document.getElementById(s.id);
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.6 && rect.bottom > 0) return s.name;
        }
        return 'hero';
    }

    function initScrollPetals() {
        window.addEventListener('scroll', () => {
            const currentY = window.scrollY;
            const delta = Math.abs(currentY - lastScrollY);
            if (delta > 80) {
                spawnPetal(getCurrentSection());
                lastScrollY = currentY;
            }
        }, { passive: true });
    }

    // --- Rangoli Loading State (#36) ---
    function showRangoliLoader() {
        let loader = document.getElementById('rangoliLoader');
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'rangoliLoader';
            loader.className = 'rangoli-loader';
            loader.innerHTML = '<div class="rangoli-spinner"></div><div class="rangoli-loader-text">Loading…</div>';
            document.body.appendChild(loader);
        }
        loader.classList.add('active');
    }
    function hideRangoliLoader() {
        const loader = document.getElementById('rangoliLoader');
        if (loader) loader.classList.remove('active');
    }

    // --- Milestone Acknowledgment (#14) ---
    function initMilestoneCheck() {
        const passingDate = new Date('2023-10-01T00:00:00');
        const now = new Date();
        const totalDays = Math.floor((now - passingDate) / 86400000);
        const milestones = [100, 365, 500, 730, 1000, 1500, 2000];
        const clockEl = document.getElementById('momentClockValue');
        if (!clockEl) return;

        if (milestones.includes(totalDays)) {
            clockEl.style.background = 'var(--gradient-gold)';
            clockEl.style.webkitBackgroundClip = 'text';
            clockEl.style.webkitTextFillColor = 'transparent';
            clockEl.style.filter = 'drop-shadow(0 0 8px rgba(255,215,0,0.5))';
        }
    }

    function init() {
        initArrivalBlessing();
        initMomentClock();
        initScrollPetals();
        initMilestoneCheck();
        window.Rituals = { showRangoliLoader, hideRangoliLoader };
    }

    return { init, showRangoliLoader, hideRangoliLoader };
})();

window.Rituals = Rituals;
