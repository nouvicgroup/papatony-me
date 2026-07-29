import { expect, test } from "@playwright/test";

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

  test("form validates and reports an honest delivery failure", async ({
    page,
  }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Prepare inquiry" }).click();
    await expect(page.getByRole("alert")).toContainText(
      "Please complete the required fields",
    );
    await page.getByLabel("Full name *").fill("Test Partner");
    await page.getByLabel("Email address *").fill("partner@example.com");
    await page
      .getByLabel("Nature of inquiry *")
      .selectOption("Enterprise or investment partnership");
    await page
      .getByLabel("Briefly describe the opportunity *")
      .fill(
        "We would like to discuss a clearly scoped enterprise partnership in Cameroon.",
      );
    await page.getByRole("button", { name: "Prepare inquiry" }).click();
    await expect(page.getByRole("alert")).toContainText(
      "online delivery is not yet connected",
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

test.describe("mobile application shell", () => {
  test.skip(({ isMobile }) => !isMobile, "Mobile-only behavior");

  test("first visit offers Skip and does not replay after dismissal", async ({
    page,
  }) => {
    await page.goto("/");
    const intro = page.getByRole("dialog", { name: "Papa Tony introduction" });
    await expect(intro).toBeVisible();
    await page.getByRole("button", { name: "Skip", exact: true }).click();
    await expect(intro).toBeHidden();
    await page.reload();
    await expect(intro).toHaveCount(0);
  });

  test("bottom navigation is fixed, active, and clears page content", async ({
    page,
  }) => {
    await page.goto("/");
    const intro = page.getByRole("dialog", { name: "Papa Tony introduction" });
    if (await intro.isVisible()) {
      await page.getByRole("button", { name: "Skip", exact: true }).click();
    }
    const nav = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link", { name: "Home", exact: true })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await nav.getByRole("link", { name: "Enterprise", exact: true }).click();
    await expect(page).toHaveURL(/\/enterprise$/);
    await expect(
      nav.getByRole("link", { name: "Enterprise", exact: true }),
    ).toHaveAttribute("aria-current", "page");
    const clearance = await page.evaluate(() => {
      const footer = document.querySelector("footer")?.getBoundingClientRect();
      const bottomNav = document
        .querySelector(".bottom-nav")
        ?.getBoundingClientRect();
      return {
        bodyPaddingBottom: parseFloat(getComputedStyle(document.body).paddingBottom),
        navHeight: bottomNav?.height ?? 0,
        footerExists: Boolean(footer),
      };
    });
    expect(clearance.footerExists).toBe(true);
    expect(clearance.bodyPaddingBottom).toBeGreaterThanOrEqual(
      Math.floor(clearance.navHeight),
    );
  });

  test("reduced motion suppresses the introduction", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    const reducedPage = await context.newPage();
    await reducedPage.goto("http://localhost:4173/");
    await expect(
      reducedPage.getByRole("dialog", { name: "Papa Tony introduction" }),
    ).toHaveCount(0);
    const motion = await reducedPage.evaluate(() => {
      const probe = document.querySelector(".bottom-nav-item");
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
    await context.close();
  });
});
