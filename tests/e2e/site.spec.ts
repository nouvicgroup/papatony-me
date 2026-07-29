import { expect, test, type Locator, type Page } from "@playwright/test";

/** Turnstile injects a hidden input once it has solved; wait for the token. */
async function waitForTurnstile(scope: Page | Locator) {
  await expect
    .poll(
      async () =>
        await scope
          .locator('input[name="cf-turnstile-response"]')
          .first()
          .inputValue()
          .catch(() => ""),
      { timeout: 20_000 },
    )
    .not.toBe("");
}


const routes = [
  "/",
  "/enterprise",
  "/leadership",
  "/about",
  "/ministry",
  "/contact",
  "/privacy",
  "/fr",
  "/fr/enterprise",
  "/fr/leadership",
  "/fr/about",
  "/fr/ministry",
  "/fr/contact",
  "/fr/privacy",
];

test.describe("desktop experience", () => {
  test.skip(({ isMobile }) => isMobile, "Desktop-only route sweep");

  test("all routes render without broken media or horizontal overflow", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    for (const path of routes) {
      const response = await page.goto(path, {
        waitUntil: "domcontentloaded",
        timeout: 15_000,
      });
      expect(response?.status(), path).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(120);
      const diagnostics = await page.evaluate(() => ({
        overflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        broken: Array.from(document.images)
          .filter((image) => image.complete && image.naturalWidth === 0)
          .map((image) => image.getAttribute("src")),
      }));
      expect(diagnostics.overflow, path).toBeLessThanOrEqual(1);
      expect(diagnostics.broken, path).toEqual([]);
    }
  });

  test("desktop navigation and language switching preserve the page", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Enterprise", exact: true }).click();
    await expect(page).toHaveURL(/\/enterprise$/);
    await expect(
      page.getByRole("heading", {
        name: /Opportunity needs more than capital/,
        level: 1,
      }),
    ).toBeVisible();
    await page.getByRole("link", { name: "Français version" }).click();
    await expect(page).toHaveURL(/\/fr\/enterprise$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
      "href",
      "https://papatony.me/enterprise",
    );
  });

  test("tablet navigation remains reachable through the menu", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 900, height: 1000 });
    await page.goto("/");
    // Located by class, not by name: the label flips to "Close menu" once open.
    const menu = page.locator("button.menu-toggle");
    await expect(menu).toBeVisible();
    await expect(menu).toHaveAccessibleName("Open menu");
    // The toggle only responds once React has hydrated the header.
    await expect(async () => {
      await menu.click();
      await expect(menu).toHaveAttribute("aria-expanded", "true");
    }).toPass({ timeout: 15_000 });
    const navigation = page.getByRole("navigation", {
      name: "Primary navigation",
    });
    await expect(navigation).toBeVisible();
    await navigation
      .getByRole("link", { name: "Leadership", exact: true })
      .click();
    await expect(page).toHaveURL(/\/leadership$/);
    await expect(
      page.getByRole("button", { name: "Open menu" }),
    ).toBeVisible();
  });

  test("leadership platforms use a compact single-layer desktop layout", async ({
    page,
  }) => {
    await page.goto("/");
    const layout = await page.evaluate(() => {
      const articles = Array.from(
        document.querySelectorAll<HTMLElement>(".platform-grid article"),
      );
      const logo = document.querySelector<HTMLElement>(".platform-logo");
      return {
        articleCount: articles.length,
        maxHeight: Math.max(...articles.map((article) => article.offsetHeight)),
        articleRadius: articles[0]
          ? getComputedStyle(articles[0]).borderRadius
          : null,
        logoBorder: logo ? getComputedStyle(logo).borderTopWidth : null,
      };
    });
    expect(layout.articleCount).toBe(3);
    expect(layout.maxHeight).toBeLessThanOrEqual(180);
    expect(layout.articleRadius).toBe("0px");
    expect(layout.logoBorder).toBe("0px");
  });

  test("form validates and reports an honest delivery failure", async ({
    page,
  }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Review my message" }).click();
    await expect(page.getByRole("alert")).toContainText(
      "Please fill in the required fields",
    );
    await page.getByLabel("Your name *").fill("Test Partner");
    await page.getByLabel("Email *").fill("partner@example.com");
    await page.getByRole("button", { name: /What is this about/ }).click();
    await page
      .getByRole("option", { name: "A business or investment partnership" })
      .click();
    await page
      .getByLabel("What are you looking at? *")
      .fill(
        "We would like to discuss a clearly scoped enterprise partnership in Cameroon.",
      );
    await waitForTurnstile(page);
    await page.getByRole("button", { name: "Review my message" }).click();
    // Whatever the outcome, the form must never claim it sent anything.
    const alert = page.getByRole("alert");
    await expect(alert).toContainText(/nothing (has been|was) sent/i);
    await expect(alert).not.toContainText(
      /message sent|successfully sent|thank you|we.ll be in touch/i,
    );
  });

  test("Eagles Family link remains external and keyboard focus is visible", async ({
    page,
  }) => {
    await page.goto("/ministry");
    const externalLink = page
      .locator(".ministry-page-hero")
      .getByRole("link", {
        name: "Explore Eagles’ Family Assembly",
        exact: true,
      });
    await expect(externalLink).toHaveAttribute("href", "https://eaglesfamily.org");
    await expect(externalLink).toHaveAttribute("target", "_blank");
    await page.keyboard.press("Tab");
    const focusStyle = await page.evaluate(() => {
      const active = document.activeElement;
      if (!(active instanceof HTMLElement)) return null;
      const style = getComputedStyle(active);
      return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
    });
    expect(focusStyle).not.toBeNull();
    expect(focusStyle?.outlineStyle).not.toBe("none");
  });
});

test.describe("mobile experience", () => {
  test.skip(({ isMobile }) => !isMobile, "Mobile-only behavior");

  test("first visit presents an accessible splash and does not replay", async ({
    page,
  }) => {
    await page.goto("/");
    const intro = page.getByRole("dialog", { name: "Papa Tony introduction" });
    const skip = page.getByRole("button", { name: "Skip", exact: true });
    await expect(intro).toBeVisible();
    await expect(skip).toBeFocused();
    await skip.click();
    await expect(intro).toBeHidden();
    await page.reload();
    await expect(intro).toHaveCount(0);
  });

  test("value proposition and primary action lead the first viewport", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Skip", exact: true }).click();
    const heading = page.getByRole("heading", {
      name: /Know the ground before you commit in Cameroon/,
      level: 1,
    });
    await expect(heading).toBeVisible();
    await expect(
      page.locator(".hero-actions").getByRole("link", {
        name: /Start a conversation/,
      }),
    ).toBeVisible();
    // Layered composition: the portrait leads, the copy panel overlaps its
    // lower half, and the proposition plus primary action still land inside
    // the first screen without scrolling.
    const layout = await page.evaluate(() => {
      const box = (selector: string) =>
        document.querySelector(selector)?.getBoundingClientRect() ?? null;
      const portrait = box(".hero-portrait");
      const copy = box(".hero-copy");
      const heading = box("h1");
      const cta = box(".hero-actions .button");
      return {
        portraitTop: portrait?.top ?? 0,
        portraitBottom: portrait?.bottom ?? 0,
        copyTop: copy?.top ?? 0,
        headingTop: heading?.top ?? 0,
        ctaBottom: cta?.bottom ?? Number.POSITIVE_INFINITY,
        viewport: window.innerHeight,
        navTop:
          document.querySelector(".bottom-nav")?.getBoundingClientRect().top ??
          window.innerHeight,
      };
    });

    expect(layout.portraitTop).toBeLessThan(layout.copyTop);
    // The panel starts inside the portrait, not below it.
    expect(layout.copyTop).toBeLessThan(layout.portraitBottom);
    expect(layout.headingTop).toBeGreaterThan(layout.portraitTop);
    // Proposition and action are reachable without scrolling or hiding
    // behind the bottom navigation.
    expect(layout.headingTop).toBeLessThan(layout.viewport);
    expect(layout.ctaBottom).toBeLessThan(layout.navTop);
  });

  test("bottom navigation is fixed, active, and clears page content", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Skip", exact: true }).click();
    const nav = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(nav).toBeVisible();
    await expect(
      nav.getByRole("link", { name: "Home", exact: true }),
    ).toHaveAttribute("aria-current", "page");
    await nav.getByRole("link", { name: "Enterprise", exact: true }).click();
    await expect(page).toHaveURL(/\/enterprise$/);
    await expect(
      nav.getByRole("link", { name: "Enterprise", exact: true }),
    ).toHaveAttribute("aria-current", "page");
    const clearance = await page.evaluate(() => {
      const navigation = document
        .querySelector(".bottom-nav")
        ?.getBoundingClientRect();
      return {
        bodyPaddingBottom: Number.parseFloat(
          getComputedStyle(document.body).paddingBottom,
        ),
        navigationHeight: navigation?.height ?? 0,
      };
    });
    expect(clearance.bodyPaddingBottom).toBeGreaterThanOrEqual(
      clearance.navigationHeight,
    );
  });

  test("the primary action opens a focused inquiry sheet without faking delivery", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Skip", exact: true }).click();
    await page
      .locator(".hero-actions")
      .getByRole("link", { name: /Start a conversation/ })
      .click();

    const sheet = page.getByRole("dialog", { name: "Opportunity brief" });
    await expect(sheet).toBeVisible();
    await expect(page).toHaveURL(/localhost:4173\/$/);

    // Once the slide-up settles the overlay must be anchored to the viewport,
    // not stretched to the document by a transformed ancestor.
    await expect(async () => {
      const overlay = await page.evaluate(() => {
        const scrim = document
          .querySelector(".inquiry-sheet-scrim")
          ?.getBoundingClientRect();
        const panel = document
          .querySelector(".inquiry-sheet")
          ?.getBoundingClientRect();
        if (!scrim || !panel) return null;
        return {
          scrimTop: Math.round(scrim.top),
          scrimHeight: Math.round(scrim.height),
          panelBottom: Math.round(panel.bottom),
          panelTop: Math.round(panel.top),
          viewport: window.innerHeight,
        };
      });
      expect(overlay?.scrimTop).toBe(0);
      expect(overlay?.scrimHeight).toBe(overlay?.viewport);
      expect(overlay?.panelTop).toBeGreaterThanOrEqual(0);
      expect(overlay?.panelBottom).toBe(overlay?.viewport);
    }).toPass({ timeout: 5_000 });
    await expect(
      page.getByRole("button", { name: "Close", exact: true }),
    ).toBeFocused();

    await sheet.getByLabel("Your name *").fill("Test Partner");
    await sheet.getByLabel("Email *").fill("partner@example.com");
    await sheet.getByRole("button", { name: /What is this about/ }).click();
    await sheet.getByRole("option", { name: "Property or land" }).click();
    await sheet
      .getByLabel("What are you looking at? *")
      .fill("A clearly scoped property question we would like to discuss.");
    await waitForTurnstile(sheet);
    await sheet.getByRole("button", { name: "Review my message" }).click();

    const alert = page.getByRole("alert");
    await expect(alert).toContainText(/nothing (has been|was) sent/i);

    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();
  });

  test("what he can help with reads as a compact two-up card grid", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Skip", exact: true }).click();

    const grid = await page.evaluate(() => {
      const track = document.querySelector<HTMLElement>(".pager-track");
      if (!track) return null;
      const cards = Array.from(track.querySelectorAll<HTMLElement>("article"));
      const style = getComputedStyle(track);
      const tops = new Set(cards.map((c) => Math.round(c.offsetTop)));
      return {
        cards: cards.length,
        columns: style.gridTemplateColumns.split(" ").length,
        rows: tops.size,
        scrolls: track.scrollWidth > track.clientWidth + 8,
        dotsVisible:
          getComputedStyle(document.querySelector(".pager-dots")!).display !==
          "none",
      };
    });

    expect(grid?.cards).toBe(4);
    expect(grid?.columns).toBe(2);
    expect(grid?.rows).toBe(2);
    // No longer a horizontal swipe deck.
    expect(grid?.scrolls).toBe(false);
    expect(grid?.dotsVisible).toBe(false);
  });

  test("page heroes keep a visible image on phones", async ({ page }) => {
    for (const route of ["/enterprise", "/leadership", "/about", "/ministry"]) {
      await page.goto(route);
      await page.waitForTimeout(200);
      const frame = await page.evaluate(() => {
        const el = document.querySelector(".page-hero-media");
        const img = el?.querySelector("img");
        if (!el || !img) return null;
        const r = el.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height), loaded: img.naturalWidth > 0 };
      });
      expect(frame, route).not.toBeNull();
      expect(frame!.w, route).toBeGreaterThan(200);
      expect(frame!.h, route).toBeGreaterThan(150);
      expect(frame!.loaded, route).toBe(true);
    }
  });

  test("bottom navigation uses drawn icons and never covers content", async ({
    page,
  }) => {
    await page.goto("/contact");
    const nav = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(nav.locator("svg")).toHaveCount(5);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(200);
    const clear = await page.evaluate(() => {
      const navBox = document
        .querySelector(".bottom-nav")
        ?.getBoundingClientRect();
      const last = document.querySelector(".site-footer > small");
      const lastBox = last?.getBoundingClientRect();
      if (!navBox || !lastBox) return null;
      return lastBox.bottom <= navBox.top;
    });
    expect(clear).toBe(true);
  });

  test("reduced motion keeps the splash static and preserves dismissal", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    const reducedPage = await context.newPage();
    await reducedPage.goto("http://localhost:4173/");
    const intro = reducedPage.getByRole("dialog", {
      name: "Papa Tony introduction",
    });
    await expect(intro).toBeVisible();
    const motion = await reducedPage.evaluate(() => {
      const probe = document.querySelector(".intro-progress span");
      if (!(probe instanceof HTMLElement)) return null;
      const style = getComputedStyle(probe);
      return {
        animationDuration: style.animationDuration,
        transitionDuration: style.transitionDuration,
      };
    });
    expect(Number.parseFloat(motion?.animationDuration ?? "1")).toBeLessThanOrEqual(
      0.00001,
    );
    expect(
      Number.parseFloat(motion?.transitionDuration ?? "1"),
    ).toBeLessThanOrEqual(0.00001);
    await reducedPage.getByRole("button", { name: "Skip", exact: true }).click();
    await expect(intro).toBeHidden();
    await expect(
      reducedPage.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeVisible();
    await context.close();
  });
});
