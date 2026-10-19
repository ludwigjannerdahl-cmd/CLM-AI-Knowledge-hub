# V22 Render Automation Spec

When the nine independent directions exist, automation should:

1. serve `prototypes/v22-composition-lab/` over a local HTTP server;
2. launch Chromium/Playwright;
3. set viewport to 1920×1200;
4. load each direction independently;
5. wait for fonts/layout/declared animation settling;
6. capture the first viewport;
7. optionally capture full page where scrolling is part of the design;
8. record console/page errors;
9. record clientWidth/scrollWidth;
10. upload screenshots and machine-readable results as an artifact.

The render job should **not** score aesthetic quality. It creates reliable visual evidence for human/model comparison.

Do not run a placeholder lab and call it visual validation. The nine actual directions must exist first.