import { expect, test } from "@playwright/test";

test("presentation renders, images load, and each preview fits the viewport", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Clinwide/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Злагоджена клініка",
  );
  expect(
    await page.getByRole("heading", { level: 1 }).evaluate(
      (heading) => heading.scrollWidth <= heading.clientWidth,
    ),
  ).toBe(true);
  const heroImage = page.locator("figure img");
  await expect(heroImage).toBeVisible();
  await expect
    .poll(() =>
      heroImage.evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
    )
    .toBe(true);
  await page.screenshot({ path: info.outputPath("hero.png") });
  for (const label of ["Розклад", "Картка пацієнта", "Фінанси"]) {
    const button = page.getByRole("button", { name: label, exact: true });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(
      page.getByLabel(
        "Ілюстрація інтерфейсу, на вузькому екрані можна прокрутити",
      ),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
      ),
    ).toBe(false);
  }
  await page.getByRole("button", { name: "Розклад", exact: true }).click();
  await page
    .locator("#preview")
    .screenshot({ path: info.outputPath("preview.png") });
  await page
    .locator("#pricing")
    .screenshot({ path: info.outputPath("pricing.png") });
  expect(errors).toEqual([]);
});

test("costs respect minimum licenses, chairs, years, and one-time Clinwide payment", async ({
  page,
}) => {
  await page.goto("/");
  const calculator = page.getByTestId("cost-explorer");
  await expect(page.getByTestId("cliniccards-total")).toHaveText(/3\s?240/);
  await expect(page.getByTestId("iclinic-total")).toHaveText(/64\s?800/);
  await expect(page.getByTestId("clinwide-total")).toContainText("$450");
  await expect(page.getByTestId("clinwide-total")).toContainText("$300");
  await calculator.getByLabel("Користувачі", { exact: true }).selectOption("1");
  await calculator
    .getByLabel("Крісла / кабінети", { exact: true })
    .selectOption("1");
  await calculator.getByLabel("Період", { exact: true }).selectOption("1");
  await expect(page.getByTestId("cliniccards-total")).toHaveText("$360");
  await expect(page.getByTestId("iclinic-total")).toHaveText(/12\s?960/);
  await calculator.getByLabel("Період", { exact: true }).selectOption("5");
  await expect(page.getByTestId("cliniccards-total")).toHaveText(/1\s?800/);
  await expect(page.getByTestId("clinwide-total")).toContainText("$300");
});

test("request builder preserves an accurate manually copyable message when clipboard is blocked", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("denied")) },
    }),
  );
  await page.goto("/#contact");
  const request = page.getByTestId("request-builder");
  await request
    .getByLabel("Крісла / кабінети", { exact: true })
    .selectOption("3");
  await request.getByLabel("Команда", { exact: true }).selectOption("7–10");
  await expect(request.getByLabel("Ваш готовий запит")).toHaveValue(
    /Крісла \/ кабінети: 3\.[\s\S]*Команда: 7–10/,
  );
  await request.getByRole("button", { name: "Скопіювати запит" }).click();
  await expect(request.getByRole("status")).toContainText(
    "Браузер не дозволив копіювання",
  );
  await expect(request.getByLabel("Ваш готовий запит")).toBeVisible();
  await expect(
    request.getByRole("button", { name: "Скопіювати запит" }),
  ).toBeEnabled();
});

test("FAQ, source links, customization and narrow screen remain usable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  await page
    .getByRole("link", { name: "Обговорити проєкт", exact: true })
    .click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(
    page.getByRole("heading", { name: "Подивімося, як це працюватиме у вас." }),
  ).toBeVisible();
  const faqButton = page.getByRole("button", {
    name: "Скільки коштує впровадження?",
  });
  await faqButton.click();
  await expect(faqButton).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.locator('[class*="faqItem"]').filter({ hasText: "$450" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Офіційні умови" }),
  ).toHaveAttribute("href", "https://cliniccards.com/ua/help/versiya-free");
  await expect(
    page.getByRole("link", { name: "Офіційні тарифи" }),
  ).toHaveAttribute("href", "https://iclinic.ua/");
  await expect(
    page.getByRole("heading", { name: "Clinwide налаштовується індивідуально під вас." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Написати щодо демо" })).toHaveAttribute("href", "https://t.me/nazar_m0p");
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    ),
  ).toBe(false);
});
