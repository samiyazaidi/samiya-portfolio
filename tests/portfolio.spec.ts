import { test, expect } from "@playwright/test";
import { safeDestination } from "../src/lib/placeholders";

test("rejects unsafe external destinations", () => {
  for (const input of [null, "", "[PROFILE_URL]", "javascript:alert(1)", "data:text/html,test", "//example.com", "http://example.com"]) {
    expect(safeDestination(input)).toBeNull();
  }
  expect(safeDestination("/Samiya_Zaidi-FullStack_Developer.pdf", true)).toBe("/Samiya_Zaidi-FullStack_Developer.pdf");
  expect(safeDestination("/Samiya_Zaidi-FullStack_Developer.pdf")).toBeNull();
  expect(safeDestination("https://github.com")).toBe("https://github.com");
});

test("keeps the requested section order and header controls", async ({ page }) => {
  await page.goto("/");
  const main = page.locator("main");
  const sectionIds = await main.locator("section").evaluateAll((sections) =>
    sections.map((section) => section.id).filter((id) => ["home", "capabilities", "projects", "skills", "experience", "education", "contact"].includes(id)),
  );
  expect(sectionIds).toEqual(["home", "capabilities", "projects", "skills", "experience", "education", "contact"]);
  await expect(page.getByRole("button", { name: "Quick Links" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Download CV" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Quick Links" })).toBeVisible();
});

test("shows project cards, skill badges, timelines, and contact form", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("robot")).toHaveCount(1);
  await expect(page.getByTestId("project-carousel").locator("article")).toHaveCount(5);
  await expect(page.getByRole("heading", { name: /Technologies I work with/ })).toBeVisible();
  await expect(page.locator("#experience")).toBeVisible();
  await expect(page.locator("#education")).toBeVisible();
  await expect(page.getByLabel("Your name")).toBeVisible();
  await expect(page.getByLabel("Your email")).toBeVisible();
  await expect(page.getByLabel("Subject")).toBeVisible();
  await expect(page.getByLabel("Message")).toBeVisible();
});

test("contact form exposes the required fields without prefilled placeholder data", async ({ page }) => {
  await page.goto("/");
  const form = page.locator("#contact form");
  for (const field of ["Your name", "Your email", "Subject", "Message"]) {
    await expect(form.getByLabel(field)).toBeVisible();
  }
  await expect(form.getByLabel("Your name")).toHaveValue("");
  await expect(form.getByLabel("Subject")).toHaveValue("");
  await expect(form.getByLabel("Message")).toHaveValue("");
});

test("responsive layout does not create page-level horizontal overflow", async ({ page }) => {
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 1024, height: 900 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
    { width: 320, height: 740 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(overflow, `Page overflow at ${viewport.width}px`).toBe(false);
  }
});
