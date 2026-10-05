// Functional QA: drives every interactive feature in a real browser.
//
//   node scripts/functional-qa.mjs [baseUrl]
//
// Exits non-zero if any check fails or the page logs an error.
import { chromium } from "playwright";

const base = (process.argv[2] || "http://localhost:5173").replace(/\/$/, "");
const browser = await chromium.launch();
const errors = [];
let failures = 0;

function check(name, ok, detail = "") {
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
}

async function newPage(width = 1440) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  return page;
}

// ---------- Home: navigation, modal, contact form ----------
{
  const page = await newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  check("home title", (await page.title()) === "Hubbard College Modern Portal");
  check("single h1", (await page.locator("h1").count()) === 1);

  for (const [label, id] of [["About", "about"], ["Services", "services"], ["Courses", "courses"], ["Events", "events"], ["Contact", "contact"]]) {
    await page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: label, exact: true }).click();
    await page.waitForTimeout(900);
    const top = await page.locator(`#${id}`).evaluate((el) => el.getBoundingClientRect().top);
    check(`nav "${label}" scrolls to #${id}`, Math.abs(top) < 5, `top=${Math.round(top)}`);
  }

  const login = page.getByRole("link", { name: /Login/ });
  check("login link opens portal in new tab",
    (await login.getAttribute("href")) === "https://app.hcaonline.org/1596638871/login" && (await login.getAttribute("target")) === "_blank");

  await page.locator("#services").getByRole("button", { name: /Learn More about Workshops/ }).click();
  const dialog = page.getByRole("dialog", { name: "SALES Workshop" });
  await dialog.waitFor();
  check("workshop modal opens", await dialog.isVisible());
  check("modal focuses close button", await page.getByRole("button", { name: "Close" }).evaluate((el) => el === document.activeElement));
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "detached" });
  check("Escape closes modal", (await dialog.count()) === 0);
  await page.locator("#services").getByRole("button", { name: /Learn More about Workshops/ }).click();
  await page.getByRole("button", { name: "Book This Workshop" }).click();
  await dialog.waitFor({ state: "detached" });
  check('"Book This Workshop" closes modal', (await dialog.count()) === 0);

  await page.getByLabel("First Name").fill("Jane");
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "Executive Coaching" }).click();
  check("subject select picks option", (await page.getByRole("combobox").innerText()).includes("Executive Coaching"));
  await page.getByRole("button", { name: /Send Message/ }).click();
  check("contact form acknowledges", await page.getByRole("button", { name: "Message Sent ✓" }).isVisible());
  await page.waitForTimeout(3200);
  check("contact acknowledgement resets after 3s", await page.getByRole("button", { name: /Send Message/ }).isVisible());

  await page.getByRole("link", { name: "View Full Course Catalog" }).click();
  await page.waitForURL("**/courses");
  check('"View Full Course Catalog" goes to /courses', page.url().endsWith("/courses"));
  await page.context().close();
}

// ---------- Mobile menu ----------
{
  const page = await newPage(375);
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const toggle = page.getByRole("button", { name: "Open menu" });
  check("desktop links hidden on mobile", !(await page.getByRole("link", { name: /Login/ }).isVisible()));
  await toggle.click();
  const menu = page.locator("#mobile-menu");
  await menu.waitFor();
  check("mobile menu opens", await menu.isVisible());
  check("toggle reports expanded", (await page.getByRole("button", { name: "Close menu" }).getAttribute("aria-expanded")) === "true");
  await menu.getByRole("button", { name: "Events" }).click();
  await page.waitForTimeout(1500);
  check("mobile menu closes after navigating", (await menu.count()) === 0);
  const top = await page.locator("#events").evaluate((el) => el.getBoundingClientRect().top);
  check("mobile menu link scrolls to section", Math.abs(top) < 5, `top=${Math.round(top)}`);
  await page.context().close();
}

// ---------- Catalog + cart ----------
{
  const page = await newPage();
  await page.goto(base + "/courses", { waitUntil: "networkidle" });
  await page.locator("article").first().waitFor();
  check("catalog title", (await page.title()) === "Course Catalog | Hubbard College Modern Portal");
  check("catalog shows 16 courses", (await page.locator("article").count()) === 16);
  check("category filters rendered", (await page.getByRole("group", { name: "Filter by category" }).getByRole("button").count()) === 10);

  await page.getByRole("button", { name: "Leadership", exact: true }).click();
  await page.waitForTimeout(300);
  check("category filter narrows list", (await page.locator("article").count()) === 2);
  await page.getByLabel("Search courses").fill("executive");
  await page.waitForTimeout(200);
  check("search combines with filter", (await page.locator("article").count()) === 1);
  await page.getByLabel("Search courses").fill("zzz");
  check("empty state", await page.getByText("No courses found.").isVisible());
  await page.getByLabel("Search courses").fill("marketing");
  await page.getByRole("button", { name: "All", exact: true }).click();
  await page.waitForTimeout(200);
  check("search matches category", (await page.locator("article").count()) === 2);
  await page.getByLabel("Search courses").fill("");

  const add = page.getByRole("button", { name: "Add Financial Planning Course to cart" });
  await add.click();
  check('button shows "Added"', (await add.innerText()).includes("Added"));
  check('"In Cart" overlay appears', await page.locator("article").first().getByText("In Cart").isVisible());
  await add.click();
  await page.getByRole("button", { name: "Add Effective Leadership Course to cart" }).click();
  const cartLink = page.getByRole("link", { name: /^Cart,/ });
  check("cart badge counts quantity", (await cartLink.innerText()).trim() === "3");
  await page.waitForTimeout(2200);
  check('"Added" reverts after 2s', (await add.innerText()).includes("Add to Cart"));

  await page.reload({ waitUntil: "networkidle" });
  check("cart persists across reload", (await page.getByRole("link", { name: /^Cart,/ }).innerText()).trim() === "3");

  await page.getByRole("link", { name: /^Cart,/ }).click();
  await page.waitForURL("**/cart");
  await page.getByRole("heading", { name: "Your Cart" }).waitFor();
  check("cart title", (await page.title()) === "Cart Page | Hubbard College Modern Portal");
  check("cart lists 2 courses", (await page.getByRole("list", { name: "Courses in your cart" }).locator("> li").count()) === 2);
  check("item count text", await page.getByText("3 items selected").isVisible());
  check("summary line", await page.getByText("Financial Planning Course × 2").isVisible());

  await page.getByRole("button", { name: "Increase quantity" }).first().click();
  check("increase quantity", await page.getByText("4 items selected").isVisible());
  await page.getByRole("button", { name: "Decrease quantity" }).first().click();
  check("decrease quantity", await page.getByText("3 items selected").isVisible());
  await page.getByRole("button", { name: "Remove Effective Leadership Course", exact: true }).click();
  check("qty 1 → minus removes item", await page.getByText("2 items selected").isVisible());

  const placeOrder = page.getByRole("button", { name: "Place Order" });
  check("place order disabled without details", await placeOrder.isDisabled());
  await page.getByLabel(/Email Address/).fill("jane@example.com");
  check("place order disabled without phone", await placeOrder.isDisabled());
  await page.getByLabel(/Phone Number/).fill("+27 82 000 0000");
  await page.getByLabel(/Additional notes/).fill("Team of 5");
  check("place order enabled", await placeOrder.isEnabled());
  await placeOrder.click();
  check('shows "Placing Order..."', await page.getByRole("button", { name: "Placing Order..." }).isVisible());
  await page.getByRole("heading", { name: "Order Placed!" }).waitFor();
  check("order confirmation", true);
  const orders = await page.evaluate(() => JSON.parse(localStorage.getItem("hca_orders") || "[]"));
  const last = orders.at(-1) || {};
  check("order stored with items & contact", last.customer_email === "jane@example.com" &&
    JSON.parse(last.items || "[]")[0]?.qty === 2 && last.notes === "Phone: +27 82 000 0000\nTeam of 5");
  check("cart cleared after order", (await page.evaluate(() => localStorage.getItem("hca_cart"))) === "[]");
  await page.getByRole("button", { name: "Browse More Courses" }).click();
  await page.waitForURL("**/courses");
  check('"Browse More Courses" returns to catalog', page.url().endsWith("/courses"));

  await page.goto(base + "/cart", { waitUntil: "networkidle" });
  check("empty cart state", await page.getByText("No courses in your cart yet.").isVisible());
  await page.getByRole("link", { name: "Back to Courses" }).click();
  await page.waitForURL("**/courses");
  check('"Back to Courses" link', page.url().endsWith("/courses"));
  await page.getByRole("link", { name: "Hubbard College home" }).click();
  await page.waitForURL(base + "/");
  check("header logo links home", page.url() === base + "/");
  await page.context().close();
}

// ---------- 404 ----------
{
  const page = await newPage();
  await page.goto(base + "/home", { waitUntil: "networkidle" });
  check('"/home" shows 404 like the original', await page.getByText('The page "home" could not be found').isVisible());
  await page.getByRole("button", { name: "Go Home" }).click();
  await page.waitForURL(base + "/");
  check('"Go Home" returns to homepage', page.url() === base + "/");
  await page.context().close();
}

await browser.close();
check("no console errors", errors.length === 0, errors.slice(0, 3).join(" | "));
console.log(failures ? `\n${failures} check(s) failed` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
