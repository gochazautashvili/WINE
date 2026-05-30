/*!
 * GD Company — motion layer (story-driven scroll animations).
 *
 * Progressive enhancement on top of the static site:
 *   • Runs only when <html> carries the `.anim` flag (set before paint in the
 *     <head>, and never set when the visitor prefers reduced motion).
 *   • If GSAP/ScrollTrigger are missing or anything throws, it removes `.anim`
 *     so every `.reveal` element becomes visible — the page never gets stuck
 *     in a hidden state.
 *
 * Choreography reads as a short story, section by section ("acts"):
 *   I   Hero      — cinematic arrival + parallax exit
 *   II  About     — the framed house breathes (parallax) as text rises
 *   III Catalogue — section chrome and cards stagger in
 *   IV  Brandy    — the lineup assembles bottle by bottle
 *   V   Heritage  — photos drift like a journey from vine to vessel
 *   VI  Numbers   — the house counts itself up
 */
(function () {
    'use strict';

    const root = document.documentElement;

    // Reveal everything and stop — used for reduced motion or any failure.
    function showAll() {
        root.classList.remove('anim');
    }

    // Bail safely if motion is off or the library didn't load.
    if (!root.classList.contains('anim') || !window.gsap || !window.ScrollTrigger) {
        showAll();
        return;
    }

    try {
        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.config({ignoreMobileResize: true});

        const EASE = 'power3.out';
        const $ = (s, ctx) => (ctx || document).querySelector(s);
        const $$ = (s, ctx) => Array.from((ctx || document).querySelectorAll(s));

        /* --------------------------------------------------------------
           Generic reveal — cards & section chrome rise + fade as they enter.
           Re-scannable so dynamically rendered cards (filter/language) also
           animate. `.in` elements (hero) and the brandy stage opt out — they
           have bespoke choreography below.
        -------------------------------------------------------------- */
        function revealScan() {
            const items = $$('.reveal:not(.in)').filter(el =>
                !el.__revealed && !el.classList.contains('brandy-stage'));
            if (!items.length) return;
            items.forEach(el => { el.__revealed = true; });
            gsap.set(items, {opacity: 0, y: 26});
            ScrollTrigger.batch(items, {
                start: 'top 88%',
                onEnter: batch => gsap.to(batch, {
                    opacity: 1, y: 0, duration: .9, ease: EASE, stagger: .09, overwrite: 'auto'
                })
            });
        }

        revealScan();
        document.addEventListener('content:rendered', () => {
            revealScan();
            ScrollTrigger.refresh();
        });

        /* --------------------------------------------------------------
           ACT I — Hero: cinematic arrival, then a parallax exit on scroll.
        -------------------------------------------------------------- */
        const heroBg = $('.hero-bg');
        const heroInner = $('.hero-inner');
        if (heroInner) {
            const intro = gsap.timeline({defaults: {ease: EASE}});
            if (heroBg) intro.from(heroBg, {autoAlpha: 0, duration: 1.1});
            intro.from($('.hero .eyebrow'), {y: 18, opacity: 0, duration: .7}, '-=.5')
                .from($('.hero h1'), {y: 34, opacity: 0, duration: 1}, '-=.35')
                .from($('.hero .sub'), {y: 22, opacity: 0, duration: .8}, '-=.6')
                .from($$('.hero .meta-row .btn'), {y: 18, opacity: 0, duration: .7, stagger: .12}, '-=.5')
                .from($('.scroll-cue'), {opacity: 0, duration: .8}, '-=.3');
        }
        // Ken Burns zoom + content lift as the hero scrolls away (depth).
        if (heroBg) {
            gsap.to(heroBg, {
                scale: 1.14, ease: 'none', transformOrigin: 'center center',
                scrollTrigger: {trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true}
            });
        }
        if (heroInner) {
            gsap.to(heroInner, {
                yPercent: -14, opacity: .25, ease: 'none',
                scrollTrigger: {trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true}
            });
        }

        /* --------------------------------------------------------------
           Shared helper: subtle vertical parallax for a cover image inside
           an overflow-hidden frame. The image is over-scaled so it never
           reveals an edge as it drifts.
        -------------------------------------------------------------- */
        function parallaxImage(img, frame, amount) {
            if (!img || !frame) return;
            gsap.set(img, {scale: 1.18, transformOrigin: 'center center'});
            gsap.fromTo(img,
                {yPercent: -amount},
                {
                    yPercent: amount, ease: 'none',
                    scrollTrigger: {trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true}
                });
        }

        /* ACT II — About: the framed scene breathes as you pass it. */
        parallaxImage($('.about-visual .landscape'), $('.about-visual'), 6);

        /* ACT V — Heritage: each photo drifts at its own pace, like a journey. */
        $$('.hblock').forEach(block => parallaxImage($('.hbg', block), block, 7));

        /* --------------------------------------------------------------
           ACT IV — Brandy: the lineup assembles, centre bottle first.
        -------------------------------------------------------------- */
        const stage = $('.brandy-stage');
        if (stage) {
            gsap.set(stage, {opacity: 1, y: 0});            // opt out of the CSS reveal-hide
            const bottles = $$('.bottle', stage);
            if (bottles.length) {
                gsap.set(bottles, {opacity: 0, yPercent: 16});
                ScrollTrigger.create({
                    trigger: stage, start: 'top 80%', once: true,
                    onEnter: () => gsap.to(bottles, {
                        opacity: 1, yPercent: 0, duration: 1, ease: EASE,
                        stagger: {each: .16, from: 'center'}
                    })
                });
            }
        }

        /* --------------------------------------------------------------
           ACT VI — Numbers: the house counts itself up (text only; the
           markup, layout and icons of the stats section are untouched).
        -------------------------------------------------------------- */
        $$('.stats .num').forEach(num => {
            const node = num.firstChild;                    // leading text node, e.g. "8000"
            if (!node || node.nodeType !== 3) return;
            const target = parseInt(node.nodeValue, 10);
            if (!isFinite(target)) return;
            const counter = {v: 0};
            node.nodeValue = '0';
            ScrollTrigger.create({
                trigger: num, start: 'top 90%', once: true,
                onEnter: () => gsap.to(counter, {
                    v: target, duration: 1.5, ease: 'power2.out',
                    onUpdate: () => { node.nodeValue = String(Math.round(counter.v)); }
                })
            });
        });

        // Recalculate trigger positions once images/fonts have settled.
        window.addEventListener('load', () => ScrollTrigger.refresh());
    } catch (err) {
        // Anything unexpected: fall back to the fully-visible static site.
        showAll();
        if (window.console) console.error('[animations] disabled:', err);
    }
})();
