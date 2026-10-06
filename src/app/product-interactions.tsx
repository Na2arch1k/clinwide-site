"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  FileText,
  LayoutDashboard,
  Search,
  Users,
  WalletCards,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { productOffer, subscriptionEstimate } from "@/lib/product-site";
import s from "./product.module.css";

const previews = [
  {
    id: "schedule",
    label: "Розклад",
    icon: CalendarDays,
    title: "Весь день перед очима",
    text: "Лікарі, час і статуси прийомів — в одному розкладі. Рецепція бачить, куди записати пацієнта, без зайвих уточнень.",
    points: [
      "Розклад за лікарями й кабінетами",
      "Кольори статусів прийомів",
      "Перехід від запису до картки",
    ],
  },
  {
    id: "patient",
    label: "Картка пацієнта",
    icon: Users,
    title: "Контекст, який не губиться",
    text: "Попередні візити, план лікування, нотатки та файли зібрані в картці. Команда продовжує роботу з потрібного місця.",
    points: [
      "Історія й етапи лікування",
      "Документи та вкладення",
      "Оплати й залишок до сплати",
    ],
  },
  {
    id: "finance",
    label: "Фінанси",
    icon: WalletCards,
    title: "Оплати без здогадок",
    text: "Переглядайте рух коштів і заборгованості, знаходьте потрібну оплату. Фінансова картина доступна співробітникам із відповідними правами.",
    points: [
      "Облік оплат за пацієнтами",
      "Видимі залишки до сплати",
      "Огляд надходжень за період",
    ],
  },
] as const;

function ScheduleIllustration() {
  const events = [
    {
      col: 1,
      row: 1,
      time: "09:00–10:00",
      name: "Марія Демо",
      service: "Консультація",
      color: "mint",
    },
    {
      col: 2,
      row: 1,
      time: "09:00–10:00",
      name: "Андрій Приклад",
      service: "Професійна гігієна",
      color: "blue",
    },
    {
      col: 3,
      row: 2,
      time: "10:00–11:00",
      name: "Олена Демо",
      service: "Повторний огляд",
      color: "peach",
    },
    {
      col: 1,
      row: 3,
      time: "11:00–12:00",
      name: "Петро Приклад",
      service: "Лікування",
      color: "blue",
    },
    {
      col: 2,
      row: 4,
      time: "12:00–13:00",
      name: "Ірина Демо",
      service: "Консультація",
      color: "mint",
    },
  ];
  return (
    <>
      <div className={s.mockPageTitle}>
        <div>
          <h3>Розклад прийомів</h3>
          <p>Четвер, 1 жовтня 2026</p>
        </div>
        <span className={s.mockAdd}>+ Новий запис</span>
      </div>
      <div className={s.mockToolbar}>
        <span>
          <ChevronLeft size={13} /> Сьогодні <ChevronRight size={13} />
        </span>
        <span>
          День <b>Тиждень</b>
        </span>
      </div>
      <div className={s.scheduleGrid}>
        <div className={s.timeGutter}>
          <span />
          <span>09:00</span>
          <span>10:00</span>
          <span>11:00</span>
          <span>12:00</span>
          <span>13:00</span>
        </div>
        <div className={s.scheduleDoctors}>
          {[
            "Олена К. · терапевт",
            "Максим П. · гігієніст",
            "Анна С. · ортодонт",
          ].map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
        <div className={s.scheduleCells}>
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} />
          ))}
          {events.map((event) => (
            <div
              key={event.name}
              className={`${s.mockEvent} ${s[event.color]}`}
              style={{
                gridColumn: `${event.col} / ${event.col + 1}`,
                gridRow: `${event.row} / ${event.row + 1}`,
              }}
            >
              <small>{event.time}</small>
              <strong>{event.name}</strong>
              <span>{event.service}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={s.mockLegend}>
        <span>
          <i className={s.mintDot} /> Записано
        </span>
        <span>
          <i className={s.blueDot} /> Підтверджено
        </span>
        <span>
          <i className={s.peachDot} /> Очікує
        </span>
      </div>
    </>
  );
}

function PatientIllustration() {
  return (
    <>
      <div className={s.mockPageTitle}>
        <div>
          <h3>Картка пацієнта</h3>
          <p>Пацієнти / Марія Демо</p>
        </div>
        <span className={s.mockAdd}>Редагувати</span>
      </div>
      <div className={s.patientBanner}>
        <span className={s.patientAvatar}>МД</span>
        <div>
          <h4>Марія Демо</h4>
          <p>Демонстраційна картка · дорослий пацієнт</p>
        </div>
        <span className={s.mockBadge}>Активна</span>
      </div>
      <div className={s.patientTabs}>
        <b>Лікування</b>
        <span>Зубна формула</span>
        <span>Нотатки</span>
        <span>Документи</span>
        <span>Фінанси</span>
      </div>
      <div className={s.patientContent}>
        <div className={s.mockPanel}>
          <h4>
            План лікування <span>2 етапи</span>
          </h4>
          <div className={s.planRow}>
            <span className={s.planCheck}>
              <Check size={13} />
            </span>
            <div>
              <strong>Консультація та огляд</strong>
              <small>Завершено · 25 вересня</small>
            </div>
            <b>600 ₴</b>
          </div>
          <div className={s.planRow}>
            <span className={s.planPending}>2</span>
            <div>
              <strong>Професійна гігієна</strong>
              <small>Заплановано · 8 жовтня</small>
            </div>
            <b>1 800 ₴</b>
          </div>
          <div className={s.planTotal}>
            <span>Вартість плану</span>
            <b>2 400 ₴</b>
          </div>
        </div>
        <div className={s.patientAside}>
          <div className={s.mockPanel}>
            <h4>Наступний прийом</h4>
            <strong>8 жовтня · 11:00</strong>
            <p>Максим П. · кабінет 2</p>
          </div>
          <div className={s.mockPanel}>
            <h4>Остання нотатка</h4>
            <p>Погоджено наступний етап плану. Заплановано повторний візит.</p>
          </div>
        </div>
      </div>
    </>
  );
}

function FinanceIllustration() {
  return (
    <>
      <div className={s.mockPageTitle}>
        <div>
          <h3>Фінанси клініки</h3>
          <p>Демонстраційний період · жовтень 2026</p>
        </div>
        <span className={s.mockBadge}>Цей місяць</span>
      </div>
      <div className={s.financeStats}>
        <div>
          <span>Надходження</span>
          <strong>48 600 ₴</strong>
          <small>Сплачені рахунки</small>
        </div>
        <div>
          <span>До сплати</span>
          <strong>7 200 ₴</strong>
          <small>Залишки за пацієнтами</small>
        </div>
        <div>
          <span>Оплати</span>
          <strong>24</strong>
          <small>За вибраний період</small>
        </div>
      </div>
      <div className={s.chartPanel}>
        <h4>
          Надходження за тижнями <span>₴</span>
        </h4>
        <div className={s.barChart}>
          {[
            { value: "10 800", height: 55 },
            { value: "14 400", height: 85 },
            { value: "9 600", height: 45 },
            { value: "13 800", height: 78 },
          ].map((bar, i) => (
            <div key={bar.value}>
              <small>{bar.value}</small>
              <i style={{ height: `${bar.height}px` }} />
              <span>Тиждень {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={s.mockTransactions}>
        <h4>Останні оплати</h4>
        {[
          ["Марія Демо", "Консультація", "600 ₴"],
          ["Андрій Приклад", "Професійна гігієна", "1 800 ₴"],
        ].map(([name, service, value]) => (
          <div key={name}>
            <span>
              <strong>{name}</strong>
              <small>{service}</small>
            </span>
            <span className={s.mockBadge}>Сплачено</span>
            <b>{value}</b>
          </div>
        ))}
      </div>
    </>
  );
}

export function ProductPreview() {
  const [selected, setSelected] = useState(0);
  const preview = previews[selected];
  return (
    <div>
      <div
        className={s.previewButtons}
        role="group"
        aria-label="Оберіть приклад інтерфейсу"
      >
        {previews.map((item, index) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            <item.icon size={17} />
            {item.label}
          </button>
        ))}
      </div>
      <div className={s.previewLayout}>
        <div className={s.browserFrame}>
          <div className={s.browserBar}>
            <span className={s.browserDots}>
              <i />
              <i />
              <i />
            </span>
            <span>{BRAND.wordmark} / робочий простір</span>
            <span>Приклад інтерфейсу</span>
          </div>
          <div
            className={s.previewScroll}
            tabIndex={0}
            aria-label="Ілюстрація інтерфейсу, на вузькому екрані можна прокрутити"
          >
            <div className={s.mockApp}>
              <aside className={s.mockSidebar} aria-hidden="true">
                <strong>
                  {BRAND.wordmark}
                  <em>.</em>
                </strong>
                <span>
                  <LayoutDashboard size={14} /> Сьогодні
                </span>
                <span className={preview.id === "schedule" ? s.mockActive : ""}>
                  <CalendarDays size={14} /> Розклад
                </span>
                <span className={preview.id === "patient" ? s.mockActive : ""}>
                  <Users size={14} /> Пацієнти
                </span>
                <span className={preview.id === "finance" ? s.mockActive : ""}>
                  <WalletCards size={14} /> Фінанси
                </span>
                <span>
                  <BarChart3 size={14} /> Аналітика
                </span>
                <span>
                  <FileText size={14} /> Документи
                </span>
                <div>
                  ДЕМО-КЛІНІКА
                  <br />
                  <b>Простір команди</b>
                </div>
              </aside>
              <div className={s.mockMain}>
                <div className={s.mockTopbar}>
                  <span>
                    <Search size={13} /> Пошук пацієнта…
                  </span>
                  <span>ОК</span>
                </div>
                <div className={s.mockBody} key={preview.id}>
                  <div className={s.previewFade}>
                    {preview.id === "schedule" ? (
                      <ScheduleIllustration />
                    ) : preview.id === "patient" ? (
                      <PatientIllustration />
                    ) : (
                      <FinanceIllustration />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${s.previewExplanation} ${s.previewFade}`}
          aria-live="polite"
          key={preview.id}
        >
          <span className={s.iconTile}>
            <preview.icon size={23} />
          </span>
          <h3>{preview.title}</h3>
          <p>{preview.text}</p>
          <ul>
            {preview.points.map((point) => (
              <li key={point}>
                <Check size={15} />
                {point}
              </li>
            ))}
          </ul>
          <a href="#contact" className={s.textButton}>
            Обговорити цей сценарій <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <p className={s.previewCaption}>
        Ілюстрації можливостей системи. Це не робочі картки клієнтів; дані
        вигадані. На телефоні приклад можна прокрутити горизонтально.
      </p>
    </div>
  );
}

const numbers = (max: number) => Array.from({ length: max }, (_, i) => i + 1);
const format = (value: number) =>
  new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 0 }).format(value);

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(target: number, duration = 420) {
  const [displayed, setDisplayed] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    const from = fromRef.current;
    if (from === target) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const effectiveDuration = reduceMotion ? 0 : duration;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress =
        effectiveDuration === 0
          ? 1
          : Math.min(1, (now - start) / effectiveDuration);
      const value = from + (target - from) * easeOutCubic(progress);
      setDisplayed(Math.round(value));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return displayed;
}

export function CostExplorer() {
  const [users, setUsers] = useState(6);
  const [chairs, setChairs] = useState(2);
  const [years, setYears] = useState(3);
  const estimate = subscriptionEstimate(users, chairs, years);
  const cliniccardsDisplay = useCountUp(estimate.cliniccardsUsd);
  const iclinicDisplay = useCountUp(estimate.iclinicUah);
  return (
    <div className={s.calculator} data-testid="cost-explorer">
      <div className={s.calculatorIntro}>
        <span className={s.eyebrow}>ВАША КОМАНДА — ВАШ РОЗРАХУНОК</span>
        <h3>Порівняйте базовий бюджет за період</h3>
        <p>
          Clinwide — разова оплата без щомісячної підписки автору. Базовий
          запуск використовує безкоштовні тарифи зовнішніх сервісів у межах
          їхніх лімітів.
        </p>
      </div>
      <div className={s.calculatorControls}>
        <label>
          Користувачі
          <select
            aria-label="Користувачі"
            value={users}
            onChange={(e) => setUsers(Number(e.target.value))}
          >
            {numbers(50).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label>
          Крісла / кабінети
          <select
            aria-label="Крісла / кабінети"
            value={chairs}
            onChange={(e) => setChairs(Number(e.target.value))}
          >
            {numbers(20).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label>
          Період
          <select
            aria-label="Період"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          >
            {numbers(5).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "рік" : n < 5 ? "роки" : "років"}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={s.calculatorResults} aria-live="polite">
        <div>
          <span>Cliniccards PRO</span>
          <strong data-testid="cliniccards-total">
            ${format(cliniccardsDisplay)}
          </strong>
          <small>
            За{" "}
            {years === 1 ? "1 рік" : `${years} ${years < 5 ? "роки" : "років"}`}{" "}
            · мінімум 2 ліцензії
          </small>
        </div>
        <div>
          <span>iClinic «Клініка»</span>
          <strong data-testid="iclinic-total">
            {format(iclinicDisplay)} ₴
          </strong>
          <small>За той самий період · тариф за кріслами</small>
        </div>
        <a href="#contact">
          <span>{BRAND.name} · базове рішення</span>
          <strong data-testid="clinwide-total">
            <s className={s.priceWas}>${productOffer.compareAtUsd}</s> $
            {productOffer.priceUsd} <ArrowRight size={21} />
          </strong>
          <small>Акційна ціна базового рішення · разовий платіж</small>
        </a>
      </div>
      <p className={s.calculatorFootnote}>
        iClinic: тут рахуємо тариф «Клініка». Для одного кабінету й команди до 3
        людей також є «Кабінет» — від 420 ₴ / місяць за одного співробітника,
        +120 ₴ за кожного з двох наступних. Джерела й застереження — нижче.
      </p>
    </div>
  );
}

export function DemoRequest({ contactUrl }: { contactUrl?: string }) {
  const [chairs, setChairs] = useState("2");
  const [team, setTeam] = useState("4–6");
  const [priority, setPriority] = useState(
    "Об’єднати розклад і картки пацієнтів",
  );
  const [feedback, setFeedback] = useState("");
  const brief = `Вітаю! Цікавить ${BRAND.name} для стоматології.\nКрісла / кабінети: ${chairs}.\nКоманда: ${team} людей.\nОсновний запит: ${priority}.\nХочу побачити демонстрацію та отримати пропозицію з вартістю впровадження, підтримки й регулярних витрат.`;

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief);
      setFeedback("Запит скопійовано. Надішліть його автору презентації.");
    } catch {
      setFeedback(
        "Браузер не дозволив копіювання. Виділіть і скопіюйте текст запиту нижче.",
      );
    }
  }

  return (
    <div className={s.requestCard} data-testid="request-builder">
      <div className={s.requestFields}>
        <label>
          Крісла / кабінети
          <select
            aria-label="Крісла / кабінети"
            value={chairs}
            onChange={(e) => {
              setChairs(e.target.value);
              setFeedback("");
            }}
          >
            {["1", "2", "3", "4", "5+"].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Команда
          <select
            aria-label="Команда"
            value={team}
            onChange={(e) => {
              setTeam(e.target.value);
              setFeedback("");
            }}
          >
            {["1–3", "4–6", "7–10", "11+"].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Що хочете покращити насамперед?
        <select
          aria-label="Що хочете покращити насамперед?"
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
            setFeedback("");
          }}
        >
          {[
            "Об’єднати розклад і картки пацієнтів",
            "Впорядкувати лікування та документи",
            "Бачити оплати й заборгованості",
            "Оцінити всю систему для клініки",
          ].map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <label className={s.briefLabel}>
        Ваш готовий запит
        <textarea
          readOnly
          value={brief}
          rows={5}
          onFocus={(e) => e.target.select()}
        />
      </label>
      <button type="button" className={s.primaryButton} onClick={copyBrief}>
        <Copy size={17} /> Скопіювати запит
      </button>
      {contactUrl ? (
        <a
          href={contactUrl}
          className={s.textButton}
          target="_blank"
          rel="noreferrer"
        >
          Зв’язатися з автором <ArrowUpRight size={16} />
        </a>
      ) : (
        <p className={s.requestHint}>
          Надішліть запит автору, від якого отримали цю презентацію. Копіювання
          не надсилає повідомлення автоматично.
        </p>
      )}
      <p className={s.requestFeedback} role="status">
        {feedback}
      </p>
    </div>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (!innerRef.current) return;
    setHeight(open ? innerRef.current.scrollHeight : 0);
  }, [open]);

  return (
    <div className={s.faqItem}>
      <button
        type="button"
        className={`${s.faqButton} ${open ? s.faqOpen : ""}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {question}
        <span aria-hidden="true">+</span>
      </button>
      <div className={s.faqAnswerWrap} style={{ height }}>
        <div ref={innerRef}>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqList({ items }: { items: string[][] }) {
  return (
    <div className={s.faqList}>
      {items.map(([question, answer]) => (
        <FaqItem key={question} question={question} answer={answer} />
      ))}
    </div>
  );
}
