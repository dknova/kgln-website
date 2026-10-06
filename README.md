# KGLN Website

## Run locally (with working chatbot)

1. Install Node 18+ (https://nodejs.org).
2. Copy `.env.example` to `.env` and paste your Anthropic API key (https://console.anthropic.com).
3. Run `node server.js` and open http://localhost:3000

(Internet is needed for Three.js and Google Fonts. Opening index.html directly shows the site but the chatbot needs the server.)

- css/style.css: styles
- js/preloader.js: loading screen
- js/three-scene.js: 3D background
- js/main.js: scroll effects, portfolio, palette, contact form
- js/chatbot.js: Kay chatbot (calls /api/chat in server.js, which proxies to the Anthropic API)
- js/hero-slider.js: hero slider
- js/art.js: SVG card illustrations
- js/welcome.js: welcome robot (voice needs HTTPS and mic permission)
- js/detail.js: in-depth panels for every clickable option. The top list T holds each item (format: key|scene|category|title|intro|get1~get2~get3~get4|step1|step2|step3|step4|stat1~stat2~stat3). The list K holds the longer sections per topic (why it matters, checklist, uses, tools, before/after, FAQ, timeline).

Replace hello@kgln.example, phone and all sample wording and statistics with real details.
