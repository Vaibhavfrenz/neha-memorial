// js/i18n.js — Bilingual Hindi/English system (Sprint 2)
// Cultural translation: emotion-first, not dictionary-first

const TRANSLATIONS = {
    en: {
        // Hero
        'hero.title': 'In Loving Memory of a Soul Who Touched Us All.',
        'hero.name': 'Neha Tomar',
        // Nav
        'nav.candle': 'Candle',
        'nav.photo': 'Photo',
        'nav.memory': 'Memory',
        // Sections
        'section.about.heading': 'Remembering Neha Tomar',
        'section.about.text': 'Neha Tomar brought light into the lives of everyone she met — with her warmth, kindness, and gentle spirit. This memorial website is a small tribute to the love she gave so freely, and the countless memories we hold close in our hearts.',
        'section.candle.heading': 'Light a Candle',
        'section.candle.intro': 'Light a virtual candle in memory of Neha. Each candle represents a moment of remembrance and love.',
        'section.photo.heading': 'Photo Memories',
        'section.memory.heading': 'Memory Wall',
        'section.memory.intro': 'Share your memories, thoughts, and messages for Neha. Your words will be a lasting tribute to her beautiful spirit.',
        // Moment clock
        'clock.label': 'Days we\'ve carried her with us',
        'clock.years': 'years',
        'clock.months': 'months',
        'clock.days': 'days',
        // Love counter
        'love.counter.label': 'acts of love',
        'now.remembering': 'people remembering Neha right now',
        // Candle form
        'candle.modal.title': 'Light a Candle',
        'candle.name.placeholder': 'Your name',
        'candle.message.placeholder': 'Your message (optional)',
        'candle.submit': 'Light Candle',
        // Photo form
        'photo.modal.title': 'Share Your Photo',
        'photo.caption.placeholder': 'Photo caption (optional)',
        'photo.author.placeholder': 'Your name (optional)',
        'photo.submit': 'Upload Photo',
        // Memory form
        'memory.modal.title': 'Share a Memory',
        'memory.name.placeholder': 'Your name',
        'memory.message.placeholder': 'Share your memory, message, or tribute...',
        'memory.submit': 'Offer This Memory',
        'memory.relationship.label': 'How did you know Neha?',
        'memory.relationship.friend': 'Friend',
        'memory.relationship.family': 'Family',
        'memory.relationship.colleague': 'Colleague',
        'memory.relationship.teacher': 'Teacher',
        'memory.relationship.classmate': 'Classmate',
        'memory.relationship.other': 'Met her spirit through others',
        // Receipts & feedback
        'memory.receipt': 'Your memory has been placed on the wall. Neha\'s family will see this.',
        'memory.sort.newest': 'Newest first',
        'memory.sort.oldest': 'Oldest first',
        // Share
        'share.whatsapp': 'Share on WhatsApp',
        'share.whatsapp.message': "I just lit a diya for Neha Tomar. Come remember her with us:",
        // Footer
        'footer.note': 'This memorial website was created with love by family and friends.',
    },
    hi: {
        // Hero
        'hero.title': 'उस आत्मा की प्रिय स्मृति में जिसने हम सबको छुआ।',
        'hero.name': 'नेहा तोमर',
        // Nav
        'nav.candle': 'दीया',
        'nav.photo': 'फोटो',
        'nav.memory': 'याद',
        // Sections
        'section.about.heading': 'नेहा तोमर को याद करते हुए',
        'section.about.text': 'नेहा तोमर ने अपनी गर्मजोशी, दयालुता और कोमल भावना से जीवन में सबके दिलों में रोशनी भरी। यह स्मारक वेबसाइट उनके प्रेम और उन अनगिनत यादों को श्रद्धांजलि है जो हम अपने दिल में संजोए हुए हैं।',
        'section.candle.heading': 'दीया जलाएं',
        'section.candle.intro': 'नेहा की याद में एक दीया जलाएं। हर दीया स्मरण और प्रेम का एक पल है।',
        'section.photo.heading': 'फोटो यादें',
        'section.memory.heading': 'याद की दीवार',
        'section.memory.intro': 'नेहा के लिए अपनी यादें, विचार और संदेश साझा करें। आपके शब्द उनकी सुंदर आत्मा को हमेशा की श्रद्धांजलि होंगे।',
        // Moment clock
        'clock.label': 'जितने दिनों से हम उन्हें अपने साथ लेकर चल रहे हैं',
        'clock.years': 'साल',
        'clock.months': 'महीने',
        'clock.days': 'दिन',
        // Love counter
        'love.counter.label': 'प्रेम के पल',
        'now.remembering': 'लोग अभी नेहा को याद कर रहे हैं',
        // Candle form
        'candle.modal.title': 'दीया जलाएं',
        'candle.name.placeholder': 'आपका नाम',
        'candle.message.placeholder': 'आपका संदेश (वैकल्पिक)',
        'candle.submit': 'दीया जलाएं',
        // Photo form
        'photo.modal.title': 'अपनी फोटो साझा करें',
        'photo.caption.placeholder': 'फोटो का शीर्षक (वैकल्पिक)',
        'photo.author.placeholder': 'आपका नाम (वैकल्पिक)',
        'photo.submit': 'फोटो अपलोड करें',
        // Memory form
        'memory.modal.title': 'एक याद साझा करें',
        'memory.name.placeholder': 'आपका नाम',
        'memory.message.placeholder': 'अपनी याद, संदेश या श्रद्धांजलि साझा करें...',
        'memory.submit': 'यह याद अर्पित करें',
        'memory.relationship.label': 'आप नेहा को कैसे जानते थे?',
        'memory.relationship.friend': 'दोस्त',
        'memory.relationship.family': 'परिवार',
        'memory.relationship.colleague': 'सहकर्मी',
        'memory.relationship.teacher': 'शिक्षक',
        'memory.relationship.classmate': 'सहपाठी',
        'memory.relationship.other': 'दूसरों से उनकी आत्मा को जाना',
        // Receipts & feedback
        'memory.receipt': 'आपकी याद दीवार पर रख दी गई है। नेहा का परिवार इसे देखेगा।',
        'memory.sort.newest': 'नई यादें पहले',
        'memory.sort.oldest': 'पुरानी यादें पहले',
        // Share
        'share.whatsapp': 'WhatsApp पर साझा करें',
        'share.whatsapp.message': "मैंने नेहा तोमर के लिए दीया जलाया। उनकी याद में हमारे साथ आएं:",
        // Footer
        'footer.note': 'यह स्मारक वेबसाइट परिवार और दोस्तों ने प्यार से बनाई है।',
    }
};

const I18n = (() => {
    let currentLang = localStorage.getItem('neha_lang') || 'en';

    function t(key) {
        return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key])
            || TRANSLATIONS['en'][key]
            || key;
    }

    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const attr = el.dataset.i18nAttr;
            const val = t(key);
            if (attr) {
                el.setAttribute(attr, val);
            } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = val;
            } else {
                el.textContent = val;
            }
        });
        // Update html lang attribute
        document.documentElement.lang = currentLang;
        // Update toggle active state
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === currentLang);
        });
        // Store
        localStorage.setItem('neha_lang', currentLang);
        // Notify other modules
        document.dispatchEvent(new CustomEvent('langChange', { detail: { lang: currentLang } }));
    }

    function setLang(lang) {
        currentLang = lang;
        applyTranslations();
    }

    function getLang() { return currentLang; }

    function init() {
        applyTranslations();
        // Wire toggle buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => setLang(btn.dataset.lang));
        });
    }

    return { init, setLang, getLang, t, applyTranslations };
})();

window.I18n = I18n;
