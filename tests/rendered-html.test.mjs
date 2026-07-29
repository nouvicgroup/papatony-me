import assert from "node:assert/strict";
import test from "node:test";

const routes = [
  ["/", "en", "Know the ground before you commit in Cameroon"],
  ["/enterprise", "en", "Opportunity needs more than capital"],
  ["/leadership", "en", "Convening people"],
  ["/about", "en", "A builder shaped"],
  ["/ministry", "en", "Faith that forms people"],
  ["/contact", "en", "Tell me what you"],
  ["/privacy", "en", "A simple, respectful"],
  ["/fr", "fr", "Connaissez le terrain avant de vous engager"],
  ["/fr/enterprise", "fr", "Une opportunité exige"],
  ["/fr/leadership", "fr", "Rassembler les personnes"],
  ["/fr/about", "fr", "Un bâtisseur façonné"],
  ["/fr/ministry", "fr", "Une foi qui forme"],
  ["/fr/contact", "fr", "Dites-moi ce que vous avez en vue"],
  ["/fr/privacy", "fr", "Une prise de contact"],
];

let worker;

test.before(async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  ({ default: worker } = await import(workerUrl.href));
});

async function render(path) {
  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

for (const [path, language, heading] of routes) {
  test(`server-renders ${path}`, async () => {
    const response = await render(path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, new RegExp(`<html[^>]+lang="${language}"`, "i"));
    assert.match(html, new RegExp(heading, "i"));
    assert.match(html, /rel="canonical"/i);
    assert.match(html, /hreflang="en"/i);
    assert.match(html, /hreflang="fr"/i);
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  });
}

test("home page exposes direct optimized media and structured data", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.match(html, /\/media\/hero-desktop-v4\.webp/);
  assert.match(html, /\/media\/hero-mobile-v4\.webp/);
  assert.match(html, /"@type":"ProfilePage"/);
  assert.match(html, /"@type":"Person"/);
  assert.match(html, /"@type":"WebSite"/);
  assert.doesNotMatch(html, /_vinext\/image/);
  assert.doesNotMatch(html, /review-v[1-4]/i);
});

test("page titles carry the brand exactly once", async () => {
  const home = await (await render("/")).text();
  const title = home.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "";
  assert.match(title, /Papa Tony/);
  assert.equal(title.match(/Papa Tony/g)?.length, 1, title);

  const inner = await (await render("/enterprise")).text();
  const innerTitle = inner.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "";
  assert.equal(innerTitle.match(/Papa Tony/g)?.length, 1, innerTitle);
});

const IMAGE_ROUTES = [
  "/",
  "/enterprise",
  "/leadership",
  "/about",
  "/ministry",
];

async function collectImages() {
  const byRoute = new Map();
  for (const path of IMAGE_ROUTES) {
    const html = await (await render(path)).text();
    // Only rendered image sources. The Person schema also references the
    // headshot on every page, which is correct and is not a visual repeat.
    const found = [
      ...html.matchAll(/(?:src|srcSet|srcset)="\/media\/([\w.-]+\.(?:webp|jpe?g|png))"/g),
    ]
      .map((match) => match[1])
      .filter((name) => !/esmel|eles|mbs|eagles-family/i.test(name));
    byRoute.set(path, new Set(found));
  }
  return byRoute;
}

test("every approved portrait ships somewhere on the site", async () => {
  const byRoute = await collectImages();
  const all = new Set([...byRoute.values()].flatMap((set) => [...set]));
  for (const asset of [
    "hero-desktop-v4.webp",
    "hero-mobile-v4.webp",
    "leadership-v4.webp",
    "headshot-v4.webp",
    "engagement-v4.webp",
    "working-session-v4.webp",
    "operator-standing-v4.webp",
    "enterprise-construction.webp",
  ]) {
    assert.ok(all.has(asset), `${asset} is not used anywhere`);
  }
});

test("no portrait is reused across pages", async () => {
  const byRoute = await collectImages();
  const seen = new Map();
  for (const [path, images] of byRoute) {
    for (const image of images) {
      // The marble portrait deliberately backs the mobile splash and the
      // mobile hero on the same route; that is launch continuity, not reuse.
      const routes = seen.get(image) ?? [];
      routes.push(path);
      seen.set(image, routes);
    }
  }
  const duplicated = [...seen.entries()].filter(
    ([, routes]) => routes.length > 1,
  );
  assert.deepEqual(
    duplicated,
    [],
    `reused across pages: ${duplicated
      .map(([image, routes]) => `${image} on ${routes.join(", ")}`)
      .join(" | ")}`,
  );
});

test("legacy stays text-only until an approved portrait exists", async () => {
  const html = await (await render("/")).text();
  assert.match(html, /Build people who can build beyond you/i);
  const legacy = html.split("legacy-note")[1]?.slice(0, 1200) ?? "";
  assert.doesNotMatch(legacy, /<img/i);
  assert.doesNotMatch(html, /carine[^<"]*\.(png|webp|jpe?g)/i);
});

test("navigation uses drawn icons rather than placeholder glyphs", async () => {
  const html = await (await render("/")).text();
  const nav = html.split('class="bottom-nav"')[1]?.split("</nav>")[0] ?? "";
  assert.notEqual(nav, "");
  assert.match(nav, /<svg/);
  assert.doesNotMatch(nav, /[⌂◫◎✦]/u);
});

test("contact form is honest about unavailable delivery", async () => {
  const response = await render("/contact");
  const html = await response.text();
  assert.match(html, /no email address or WhatsApp number has been published/i);
  assert.match(html, /Review my message/i);
  assert.doesNotMatch(html, /message sent|thank you for your submission/i);
});

test("the home page states the delivery gap rather than implying it works", async () => {
  const html = await (await render("/")).text();
  assert.match(html, /send yet/i);
  assert.doesNotMatch(html, /message sent|we will get back to you/i);
});

test("unknown routes return a useful 404", async () => {
  const response = await render("/not-a-real-page");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /This pathway does not exist/i);
});
