import assert from "node:assert/strict";
import test from "node:test";

const routes = [
  ["/", "en", "Building trusted pathways"],
  ["/enterprise", "en", "Opportunity needs more than capital"],
  ["/leadership", "en", "Convening people"],
  ["/about", "en", "A builder shaped"],
  ["/ministry", "en", "Faith that forms people"],
  ["/contact", "en", "Start with the opportunity"],
  ["/privacy", "en", "A simple, respectful"],
  ["/fr", "fr", "Créer des passerelles"],
  ["/fr/enterprise", "fr", "Une opportunité exige"],
  ["/fr/leadership", "fr", "Rassembler les personnes"],
  ["/fr/about", "fr", "Un bâtisseur façonné"],
  ["/fr/ministry", "fr", "Une foi qui forme"],
  ["/fr/contact", "fr", "Commencez par l'opportunité"],
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
  assert.match(html, /\/media\/hero-desktop\.webp/);
  assert.match(html, /\/media\/hero-mobile\.webp/);
  assert.match(html, /"@type":"ProfilePage"/);
  assert.match(html, /"@type":"Person"/);
  assert.match(html, /"@type":"WebSite"/);
  assert.doesNotMatch(html, /_vinext\/image/);
  assert.doesNotMatch(html, /review-v[1-4]/i);
});

test("contact form is honest about unavailable delivery", async () => {
  const response = await render("/contact");
  const html = await response.text();
  assert.match(html, /Online delivery is intentionally not active/i);
  assert.match(html, /Prepare inquiry/i);
  assert.doesNotMatch(html, /message sent|thank you for your submission/i);
});

test("unknown routes return a useful 404", async () => {
  const response = await render("/not-a-real-page");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /This pathway does not exist/i);
});
