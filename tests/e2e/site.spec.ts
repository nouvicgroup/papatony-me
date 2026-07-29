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

  test("tablet navigation remains reachable through the menu", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 900, height: 1000 });
    await page.goto("/");
    const menu = page.getByRole("button", { name: "Open menu" });
    await expect(menu).toBeVisible();
    await menu.click();
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

test.describe("mobile experience", () => {
  test.skip(({ isMobile }) => !isMobile, "Mobile-only behavior");

  test("value proposition and primary action lead the first viewport", async ({
    page,
  }) => {
    await page.goto("/");
    const heading = page.getByRole("heading", {
      name: /Navigate opportunity in Cameroon/,
      level: 1,
    });
    await expect(heading).toBeVisible();
    await expect(
      page.getByRole("link", {
        name: /Start an opportunity brief/,
        exact: true,
      }),
    ).toBeVisible();
    const positions = await page.evaluate(() => {
      const headingBox = document.querySelector("h1")?.getBoundingClientRect();
      const portraitBox = document
        .querySelector(".hero-portrait")
        ?.getBoundingClientRect();
      return {
        headingTop: headingBox?.top ?? Number.POSITIVE_INFINITY,
        portraitTop: portraitBox?.top ?? 0,
      };
    });
    expect(positions.headingTop).toBeLessThan(positions.portraitTop);
  });

  test("mobile menu is accessible, active, and reaches every primary area", async ({
    page,
  }) => {
    await page.goto("/");
    const menu = page.getByRole("button", { name: "Open menu" });
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await menu.click();
    await expect(
      page.getByRole("button", { name: "Close menu" }),
    ).toHaveAttribute("aria-expanded", "true");
    const nav = page.getByRole("navigation", { name: "Primary navigation" });
    await expect(nav).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(nav).toBeHidden();
    await menu.click();
    await nav.getByRole("link", { name: "Enterprise", exact: true }).click();
    await expect(page).toHaveURL(/\/enterprise$/);
    await menu.click();
    await expect(
      nav.getByRole("link", { name: "Enterprise", exact: true }),
    ).toHaveAttribute("aria-current", "page");
  });

  test("reduced motion suppresses menu transitions", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    const reducedPage = await context.newPage();
    await reducedPage.goto("http://localhost:4173/");
    const motion = await reducedPage.evaluate(() => {
      const probe = document.querySelector(".menu-toggle span");
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
