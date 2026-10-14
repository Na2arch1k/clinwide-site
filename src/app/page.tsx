import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ClipboardList,
  Heart,
  Layers3,
  Monitor,
  MonitorSmartphone,
  Sparkles,
  Stethoscope,
  Users,
  WalletCards,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import {
  productOffer,
  productSite,
  publicContactUrl,
  publicWebsiteUrl,
} from "@/lib/product-site";
import {
  CostExplorer,
  DemoRequest,
  FaqList,
  ProductPreview,
} from "./product-interactions";
import { ScrollEffects } from "./scroll-effects";
import s from "./product.module.css";

const title = `${BRAND.name} — спокійний робочий день вашої стоматології`;
const description =
  "Розклад, картки пацієнтів, плани лікування й фінанси в одному просторі. Подивіться можливості системи та порівняйте витрати на впровадження.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "uk_UA",
    siteName: BRAND.name,
  },
  twitter: { card: "summary_large_image", title, description },
};

function revealDelay(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as unknown as CSSProperties;
}

const capabilities = [
  {
    icon: CalendarDays,
    label: "Рецепція",
    title: "День, у якому все на місці",
    text: "Записуйте пацієнтів, переглядайте зайнятість лікарів і кабінетів. Лист очікування допомагає працювати з вільними вікнами.",
    detail: "Розклад · статуси прийомів · повторні огляди",
  },
  {
    icon: Stethoscope,
    label: "Лікар",
    title: "Історія пацієнта поруч",
    text: "Картка, нотатки, файли та план лікування зібрані разом. Продовжуйте роботу з потрібного етапу без пошуку в різних місцях.",
    detail: "Картка пацієнта · зубна формула · документи",
  },
  {
    icon: WalletCards,
    label: "Власник",
    title: "Зрозуміло, що відбувається",
    text: "Переглядайте оплати, заборгованості, звіти й матеріали. Кожен член команди отримує доступ відповідно до своєї ролі.",
    detail: "Фінанси · аналітика · склад · команда",
  },
];

const customConfiguration = [
  {
    icon: Users,
    title: "Ролі команди",
    text: "Власник, рецепція, лікарі й асистенти бачать саме те, що потрібно їм.",
  },
  {
    icon: CalendarDays,
    title: "Розклад і кабінети",
    text: "Налаштовуємо графіки, тривалість прийомів, крісла та статуси запису.",
  },
  {
    icon: ClipboardList,
    title: "Етапи лікування",
    text: "Поля картки й послідовність роботи відповідають процесу вашої клініки.",
  },
  {
    icon: Layers3,
    title: "Документи й дані",
    text: "Залишаємо потрібні шаблони, файли та структуру історії пацієнта.",
  },
  {
    icon: WalletCards,
    title: "Фінанси та звіти",
    text: "Показники, оплати й зрізи формуємо навколо ваших управлінських задач.",
  },
  {
    icon: Sparkles,
    title: "Додаткові сценарії",
    text: "Інтеграції, нагадування й нові можливості погоджуємо окремо до старту.",
  },
];

const questions = [
  [
    "Як отримати доступ до демо Clinwide?",
    "Напишіть мені в Telegram — я особисто надішлю посилання на демо Clinwide й поясню, як його переглянути. На цій сторінці показано лише ілюстративний огляд інтерфейсу, а не робочу демоверсію.",
  ],
  [
    "Для яких клінік підходить система?",
    "Для стоматологічного кабінету або команди клініки, які хочуть об’єднати розклад, роботу з пацієнтами та облік. На демонстрації перевіримо ваші щоденні сценарії й визначимо потрібний склад впровадження.",
  ],
  [
    "Чи працює це як застосунок на моєму пристрої?",
    "Clinwide працює на комп’ютері, планшеті та смартфоні через браузер. На сумісних пристроях систему можна додати на головний екран або встановити як вебзастосунок і відкривати через іконку. Для роботи потрібне інтернет-з’єднання; це не окрема програма з App Store чи Google Play.",
  ],
  [
    "Чи можна перенести наявну базу пацієнтів?",
    "Спочатку перевіряємо формат експорту та якість даних із вашої поточної програми. Обсяг, вартість і спосіб перенесення погоджуються окремо. Автоматичне перенесення з будь-якої системи не обіцяємо.",
  ],
  [
    "Чи є повідомлення пацієнтам?",
    "У проєкті передбачені нагадування та канали повідомлень. Їх потрібно окремо налаштувати. SMS і послуги сторонніх провайдерів можуть оплачуватися додатково; обсяг інтеграцій фіксуємо в пропозиції.",
  ],
  [
    "Як організовано доступ до даних?",
    "Співробітники входять у власні акаунти, а доступ до розділів залежить від ролі. Перед запуском погоджуємо права команди, зберігання файлів, резервне копіювання та умови обслуговування.",
  ],
  [
    "Чи є інтеграція з ЕСОЗ або фіскалізація?",
    "Наразі ЕСОЗ, КЕП та РРО/ПРРО не входять до підтверджених можливостей цього продукту. Якщо вони необхідні вашій клініці, обговорюємо це до придбання. Облік оплат у системі не замінює фіскальний чек.",
  ],
  [
    "Скільки коштує впровадження?",
    `Зараз базове рішення Clinwide коштує $${productOffer.priceUsd} за спеціальною ціною (звичайна — $${productOffer.compareAtUsd}) — разовий платіж, без щомісячної підписки автору. Склад впровадження та умови приймання фіксуємо до старту.`,
  ],
  [
    "Чи потрібно щось оплачувати щомісяця?",
    "Початкове налаштування передбачає використання безкоштовних тарифів зовнішніх сервісів у межах їхніх лімітів. Щомісячної оплати автору за базову систему немає. Платні SMS, власний домен, додаткові інтеграції або перехід за межі безкоштовних лімітів обговорюються окремо до підключення.",
  ],
  [
    "Що відбувається, якщо потрібні зміни?",
    "Виправлення багів і невеликі нескладні зміни передбачені без додаткової оплати в погодженому обсязі підтримки. Для складніших можливостей спочатку оцінюємо роботу й узгоджуємо доплату. Підключення чатбота — додатково $50–150 залежно від складності.",
  ],
];

const railSections = [
  ["overview", "01", "Можливості"],
  ["preview", "02", "Інтерфейс"],
  ["workflow", "03", "Сценарій"],
  ["pricing", "04", "Вартість"],
  ["faq", "05", "Питання"],
  ["contact", "06", "Контакт"],
] as const;

function BrandMark() {
  return (
    <span className={s.brandMark} aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        <path
          d="M25 8a11 11 0 1 0 0 16"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M19 16h9m-4.5-4.5v9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function ProductPage() {
  const contactUrl = publicContactUrl(productSite.contactUrl);
  const portfolioUrl = publicWebsiteUrl(productSite.portfolioUrl);
  return (
    <div className={s.site}>
      <ScrollEffects />
      <a className={s.skipLink} href="#main">
        Перейти до змісту
      </a>
      <header className={s.header} data-header>
        <div className={s.headerInner}>
          <a
            href="#main"
            className={s.brand}
            aria-label={`${BRAND.name} — початок сторінки`}
          >
            <BrandMark />
            <span>
              {BRAND.wordmark}
              <em>.</em>
            </span>
          </a>
          <nav className={s.navigation} aria-label="Про продукт">
            <a href="#overview">Можливості</a>
            <a href="#preview">Інтерфейс</a>
            <a href="#custom">Під вашу клініку</a>
            <a href="#pricing">Вартість</a>
          </nav>
          <div className={s.headerActions}>
            <a className={s.smallButton} href="#contact">
              Обговорити проєкт <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </header>

      <nav className={s.rail} aria-label="Навігація розділами" data-progress>
        <span className={s.railTrack} aria-hidden="true">
          <span className={s.railFill} />
        </span>
        <ul>
          {railSections.map(([id, num, label]) => (
            <li key={id}>
              <a href={`#${id}`} data-rail={id} className={s.railLink}>
                <span className={s.railNum}>{num}</span>
                <span className={s.railLabel}>{label}</span>
                <span className={s.railDot} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main id="main">
        <section className={s.hero} aria-labelledby="hero-title">
          <div className={s.heroInner}>
            <div className={s.heroCopy}>
              <p className={`${s.eyebrow} ${s.reveal} ${s.up}`}>
                <span /> СТОМАТОЛОГІЯ. БЕЗ ЗАЙВОЇ РУТИНИ.
              </p>
              <h1
                id="hero-title"
                className={`${s.reveal} ${s.up}`}
                style={revealDelay(60)}
              >
                <span className={s.heroLineOne}>Злагоджена клініка.</span>
                <span className={s.heroLineTwo}>
                  Спокійний
                  {" "}
                  <br />
                  робочий день.
                </span>
              </h1>
              <p
                className={`${s.heroDescription} ${s.reveal} ${s.up}`}
                style={revealDelay(140)}
              >
                {BRAND.name} об’єднує розклад, пацієнтів, лікування й фінанси.
                Індивідуально налаштовуємо систему під процеси вашої клініки,
                щоб команда працювала злагоджено.
              </p>
              <div
                className={`${s.heroActions} ${s.reveal} ${s.up}`}
                style={revealDelay(220)}
              >
                <a className={s.primaryButton} href="#preview">
                  Подивитися систему <ArrowRight size={18} />
                </a>
                <a className={s.textButton} href="#pricing">
                  Вартість впровадження <ArrowDown size={16} />
                </a>
              </div>
              <p className={s.heroNote}>
                <MonitorSmartphone size={16} /> На ваших пристроях. Без
                щомісячної підписки автору.
              </p>
            </div>
            <figure
              className={`${s.heroVisual} ${s.reveal} ${s.zoom}`}
              style={revealDelay(150)}
            >
              <span className={s.heroArc} aria-hidden="true" />
              <div className={s.heroFrame}>
                <Image
                  src="/product/clinic-interior.png"
                  alt=""
                  fill
                  preload
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 540px"
                  className={s.heroImage}
                />
                <div className={s.photoLabel}>
                  <Heart size={14} /> Простір для турботи
                </div>
                <div className={s.floatingCard}>
                  <span className={s.floatingIcon}>
                    <Check size={19} />
                  </span>
                  <div>
                    <strong>Команда на одній хвилі</strong>
                    <p>Від першого запису до наступного огляду</p>
                  </div>
                </div>
              </div>
              <figcaption className={s.imageCaption}>
                Концептуальне зображення інтер’єру, створене ШІ.
              </figcaption>
            </figure>
          </div>

          <div className={s.principles}>
            <span>Розроблено для щоденної роботи</span>
            <p>
              <Layers3 size={17} /> Єдиний робочий простір
            </p>
            <p>
              <Users size={17} /> Доступ за ролями
            </p>
            <p>
              <span className={s.uaFlag} /> Український інтерфейс
            </p>
          </div>
        </section>

        <section
          id="overview"
          className={s.section}
          aria-labelledby="overview-title"
          data-rail-section
        >
          <div className={s.sectionShell}>
            <header className={`${s.sectionHead} ${s.reveal} ${s.up}`}>
              <span className={s.sectionNum} aria-hidden="true">
                01
              </span>
              <div>
                <p className={s.eyebrow}>МЕНШЕ ПЕРЕМИКАНЬ. БІЛЬШЕ ЯСНОСТІ.</p>
                <h2 id="overview-title">
                  Кожному в команді —<br />
                  свій зручний простір.
                </h2>
              </div>
              <p className={s.sectionLede}>
                Коли розклад, лікування та оплати пов’язані, щоденні справи
                простіше тримати під контролем.
              </p>
            </header>
            <div className={s.capabilities}>
              {capabilities.map(
                ({ icon: Icon, label, title: heading, text, detail }, i) => (
                  <article
                    key={label}
                    className={`${s.capability} ${s.reveal} ${s.up}`}
                    style={revealDelay(i * 110)}
                    data-featured={i === 0 ? "" : undefined}
                  >
                    <div className={s.capabilityTop}>
                      <span className={s.iconTile}>
                        <Icon size={23} />
                      </span>
                      <span className={s.capabilityIndex}>
                        0{i + 1} / {label}
                      </span>
                    </div>
                    <h3>{heading}</h3>
                    <p>{text}</p>
                    <div className={s.cardDetail}>{detail}</div>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section
          id="preview"
          className={s.previewSection}
          aria-labelledby="preview-title"
          data-rail-section
        >
          <div className={s.previewAtmosphere} aria-hidden="true" />
          <div className={s.sectionShell}>
            <header className={`${s.sectionHead} ${s.dark} ${s.reveal} ${s.up}`}>
              <span className={s.sectionNum} aria-hidden="true">
                02
              </span>
              <div>
                <p className={s.eyebrow}>ПРОДУКТ, ЯКИЙ МОЖНА ПОБАЧИТИ</p>
                <h2 id="preview-title">
                  Відкрийте свій
                  <br />
                  новий робочий день.
                </h2>
              </div>
              <p className={s.sectionLede}>
                Перемикайте приклади та подивіться, як організована робота. Усі
                імена й суми тут демонстраційні.
              </p>
            </header>
            <div className={`${s.reveal} ${s.up}`}>
              <ProductPreview />
            </div>
          </div>
        </section>

        <section
          className={s.section}
          aria-labelledby="workflow-title"
          id="workflow"
          data-rail-section
        >
          <div className={`${s.sectionShell} ${s.workflow}`}>
            <div className={`${s.workflowAside} ${s.reveal} ${s.left}`}>
              <span className={s.sectionNum} aria-hidden="true">
                03
              </span>
              <p className={s.eyebrow}>ОДИН ПАЦІЄНТ. ЦІЛІСНА ІСТОРІЯ.</p>
              <h2 id="workflow-title">
                Від «добрий день»
                <br />
                до наступного візиту.
              </h2>
              <p className={s.sectionText}>
                Звичний сценарій вашої клініки — у зрозумілій послідовності. Без
                розкиданих записів і зайвого пошуку.
              </p>
              <a href="#contact" className={s.textButton}>
                Перевірити свій сценарій <ArrowUpRight size={18} />
              </a>
            </div>
            <ol className={s.steps}>
              {[
                [
                  "01",
                  "Рецепція планує прийом",
                  "Обирає пацієнта, лікаря й час у розкладі. Бачить статус запису та доступність кабінету.",
                ],
                [
                  "02",
                  "Лікар продовжує лікування",
                  "Відкриває історію, переглядає нотатки й файли, оновлює план лікування.",
                ],
                [
                  "03",
                  "Оплата має зрозумілий статус",
                  "Команда фіксує оплату та бачить залишок до сплати у картці пацієнта.",
                ],
                [
                  "04",
                  "Наступний крок не губиться",
                  "Повторний огляд або задача залишаються в системі, а не лише в пам’яті адміністратора.",
                ],
              ].map(([number, heading, text], index) => (
                <li
                  key={number}
                  className={`${s.reveal} ${s.right}`}
                  style={revealDelay(index * 90)}
                >
                  <span>{number}</span>
                  <div>
                    <h3>{heading}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={s.deviceSection} aria-labelledby="devices-title">
          <div className={s.sectionShell}>
            <div className={`${s.deviceIntro} ${s.reveal} ${s.up}`}>
              <p className={s.eyebrow}>ВАШІ ПРИСТРОЇ. ТОЙ САМИЙ ПРОСТІР.</p>
              <h2 id="devices-title">Clinwide завжди під рукою.</h2>
              <p>
                Відкривайте систему через іконку вебзастосунку на сумісному
                пристрої або працюйте у браузері. Одна адреса для всієї команди.
              </p>
            </div>
            <div className={s.deviceCards}>
              <article className={`${s.reveal} ${s.up}`}>
                <MonitorSmartphone size={27} />
                <h3>Смартфон</h3>
                <p>Android та iPhone. Швидкий доступ із головного екрана.</p>
              </article>
              <article className={`${s.reveal} ${s.up}`} style={revealDelay(90)}>
                <Layers3 size={27} />
                <h3>Планшет</h3>
                <p>
                  Зручно переглядати картку й розклад поруч із робочим місцем.
                </p>
              </article>
              <article
                className={`${s.reveal} ${s.up}`}
                style={revealDelay(180)}
              >
                <Monitor size={27} />
                <h3>Комп’ютер</h3>
                <p>Повний робочий простір для рецепції, лікаря та власника.</p>
              </article>
            </div>
            <p className={s.deviceNote}>
              Встановлення залежить від браузера й пристрою. Потрібен інтернет;
              офлайн-робота не передбачена.
            </p>
          </div>
        </section>

        <section
          id="custom"
          className={s.customSection}
          aria-labelledby="custom-title"
        >
          <div className={s.sectionShell}>
            <div className={s.customGrid}>
              <div className={`${s.customIntro} ${s.reveal} ${s.left}`}>
                <p className={s.eyebrow}>НЕ ШАБЛОННЕ ВПРОВАДЖЕННЯ</p>
                <h2 id="custom-title">
                  Clinwide налаштовується
                  <br />
                  індивідуально під вас.
                </h2>
                <p>
                  Базова система вже готова, але кожна клініка отримує власну
                  конфігурацію. Разом визначаємо ролі, робочі етапи, поля,
                  документи та звіти — щоб команда працювала у звичній логіці,
                  а не підлаштовувалася під чужий шаблон.
                </p>
                <div className={s.customPromise}>
                  <Check size={17} />
                  <span>
                    Склад вашої версії фіксуємо до початку налаштування
                  </span>
                </div>
                <a href="#contact" className={s.textButton}>
                  Зібрати свою версію <ArrowUpRight size={18} />
                </a>
              </div>

              <div
                className={`${s.customStage} ${s.reveal} ${s.zoom}`}
                style={revealDelay(100)}
                aria-label="Що можна налаштувати індивідуально"
              >
                <div className={s.customCore}>
                  <span>CLINWIDE / YOUR EDITION</span>
                  <strong>Під вашу клініку</strong>
                  <small>Одна основа · власна конфігурація</small>
                </div>
                {customConfiguration.map(({ icon: Icon, title, text }, index) => (
                  <article
                    key={title}
                    className={s.customNode}
                    data-custom-index={index + 1}
                  >
                    <Icon size={18} />
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className={s.customSteps}>
              {[
                ["01", "Розбираємо процес", "Дивимося, як команда працює зараз."],
                ["02", "Збираємо конфігурацію", "Погоджуємо ролі, поля й сценарії."],
                ["03", "Передаємо команді", "Налаштовуємо доступ і показуємо роботу."],
              ].map(([number, heading, text], index) => (
                <article
                  key={number}
                  className={`${s.reveal} ${s.up}`}
                  style={revealDelay(index * 90)}
                >
                  <span>{number}</span>
                  <div>
                    <h3>{heading}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className={s.section}
          aria-labelledby="pricing-title"
          data-rail-section
        >
          <div className={s.sectionShell}>
            <header className={`${s.sectionHead} ${s.reveal} ${s.up}`}>
              <span className={s.sectionNum} aria-hidden="true">
                04
              </span>
              <div>
                <p className={s.eyebrow}>ПРОЗОРІ УМОВИ ВПРОВАДЖЕННЯ</p>
                <h2 id="pricing-title">
                  Ваша система.
                  <br />
                  Одна оплата.
                </h2>
              </div>
              <p className={s.sectionLede}>
                Базове рішення з узгодженим налаштуванням для вашої команди.
                Склад робіт і умови підтримки фіксуємо до старту.
              </p>
            </header>
            <div className={s.priceCards}>
              <article
                className={`${s.priceCard} ${s.ownPrice} ${s.reveal} ${s.up}`}
              >
                <span className={s.priceLabel}>
                  <span className={s.saleBadge}>СПЕЦІАЛЬНА ЦІНА</span>
                  РАЗОВА ОПЛАТА
                </span>
                <h3>{BRAND.name}</h3>
                <p className={s.priceValue}>
                  <span>${productOffer.priceUsd}</span>
                  <s className={s.priceWas}>${productOffer.compareAtUsd}</s>
                  <small>разово</small>
                </p>
                <p>
                  Готова основа. Індивідуальна конфігурація для вашої клініки.
                </p>
                <ul>
                  <li>
                    <Check size={16} /> Ролі й робочі сценарії вашої команди
                  </li>
                  <li>
                    <Check size={16} /> Виправлення багів у межах підтримки
                  </li>
                  <li>
                    <Check size={16} /> Невеликі зміни — за погодженням
                  </li>
                </ul>
                <a className={s.primaryButton} href="#contact">
                  Отримати пропозицію <ArrowUpRight size={17} />
                </a>
              </article>
              <article
                className={`${s.priceCard} ${s.reveal} ${s.up}`}
                style={revealDelay(100)}
              >
                <span className={s.priceLabel}>РІЧНА ПІДПИСКА</span>
                <h3>Cliniccards PRO</h3>
                <p className={s.priceValue}>
                  $360 <small>/ рік</small>
                </p>
                <p>Мінімальна оплата за команду до двох користувачів.</p>
                <ul>
                  <li>
                    <Users size={16} /> Кожен наступний: $180 / рік
                  </li>
                  <li>
                    <CalendarDays size={16} /> Річна передплата
                  </li>
                  <li>
                    <ClipboardList size={16} /> Обсяг сервісу — за умовами PRO
                  </li>
                </ul>
                <a
                  href={productSite.cliniccardsSource}
                  target="_blank"
                  rel="noreferrer"
                  className={s.sourceLink}
                >
                  Офіційні умови <ArrowUpRight size={15} />
                </a>
              </article>
              <article
                className={`${s.priceCard} ${s.reveal} ${s.up}`}
                style={revealDelay(200)}
              >
                <span className={s.priceLabel}>ЩОМІСЯЧНА ПІДПИСКА</span>
                <h3>iClinic «Клініка»</h3>
                <p className={s.priceValue}>
                  1 080 ₴ <small>/ міс.</small>
                </p>
                <p>За перше крісло або кабінет. Наступне: +720 ₴ / міс.</p>
                <ul>
                  <li>
                    <Users size={16} /> Необмежена кількість співробітників
                  </li>
                  <li>
                    <CalendarDays size={16} /> «Кабінет»: від 420 ₴ / міс.
                  </li>
                  <li>
                    <ClipboardList size={16} /> «Кабінет» — до трьох
                    співробітників
                  </li>
                </ul>
                <a
                  href={productSite.iclinicSource}
                  target="_blank"
                  rel="noreferrer"
                  className={s.sourceLink}
                >
                  Офіційні тарифи <ArrowUpRight size={15} />
                </a>
              </article>
            </div>
            <div className={`${s.addonNote} ${s.reveal} ${s.up}`}>
              <span className={s.iconTile}>
                <Sparkles size={20} />
              </span>
              <div>
                <strong>
                  Чатбот — додатково ${productOffer.chatbotFromUsd}–$
                  {productOffer.chatbotToUsd}
                </strong>
                <p>
                  Вартість залежить від складності. Більші нові можливості
                  оцінюємо окремо; суму погоджуємо до початку робіт.
                </p>
              </div>
            </div>
            <div className={`${s.reveal} ${s.up}`}>
              <CostExplorer />
            </div>
            <p className={s.pricingNote}>
              Публічні ціни конкурентів перевірено {productSite.pricingReviewed}.
              На сторінці iClinic є різні варіанти тарифних блоків; перед оплатою
              уточніть актуальну пропозицію у постачальника. Валюти не
              конвертуємо. Розрахунок зіставляє базове рішення Clinwide та
              підписки конкурентів. Безкоштовні тарифи зовнішніх сервісів мають
              ліміти. SMS, власний домен, платні інтеграції й роботи поза
              погодженим обсягом не включені. У продуктів різний функціонал;
              ЕСОЗ, КЕП і РРО/ПРРО у {BRAND.name} наразі не заявлені.
            </p>
          </div>
        </section>

        <section
          id="faq"
          className={s.section}
          aria-labelledby="faq-title"
          data-rail-section
        >
          <div className={`${s.sectionShell} ${s.faqGrid}`}>
            <div className={`${s.reveal} ${s.left}`}>
              <span className={s.sectionNum} aria-hidden="true">
                05
              </span>
              <p className={s.eyebrow}>ПЕРЕД РІШЕННЯМ</p>
              <h2 id="faq-title">
                Важливі питання.
                <br />
                Прямі відповіді.
              </h2>
              <p className={s.sectionText}>
                Впровадження починається з ясності: можливості, витрати та
                очікування мають збігатися.
              </p>
            </div>
            <div className={`${s.reveal} ${s.up}`}>
              <FaqList items={questions} />
            </div>
          </div>
        </section>

        <section
          id="contact"
          className={s.section}
          aria-labelledby="contact-title"
          data-rail-section
        >
          <div className={`${s.sectionShell} ${s.contactSection}`}>
            <div className={`${s.reveal} ${s.left}`}>
              <span className={s.sectionNum} aria-hidden="true">
                06
              </span>
              <p className={s.eyebrow}>НАСТУПНИЙ КРОК — ПРОСТА РОЗМОВА</p>
              <h2 id="contact-title">
                Подивімося, як
                <br />
                це працюватиме у вас.
              </h2>
              <p>
                Щоб переглянути демо Clinwide, напишіть мені — я надішлю
                посилання. Можете одразу вказати розмір команди й основний
                запит, щоб я підготував демонстрацію під ваші задачі.
              </p>
              <div className={s.contactHint}>
                <Check size={16} /> Без введення даних ваших пацієнтів
              </div>
            </div>
            <div className={`${s.reveal} ${s.right}`} style={revealDelay(120)}>
              <DemoRequest contactUrl={contactUrl} />
            </div>
          </div>
        </section>
      </main>
      <footer className={s.footer}>
        <div className={s.sectionShell}>
          <a href="#main" className={s.brand}>
            <BrandMark />
            <span>
              {BRAND.wordmark}
              <em>.</em>
            </span>
          </a>
          <p>Більше уваги пацієнтам. Менше рутини.</p>
          <div>
            {portfolioUrl && <a href={portfolioUrl} target="_blank" rel="noreferrer">Портфоліо автора <ArrowUpRight size={14} /></a>}
            <a href="#contact">
              Запросити демо{" "}
              <ArrowUpRight size={14} />
            </a>
            <span>© 2026 {BRAND.name}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
