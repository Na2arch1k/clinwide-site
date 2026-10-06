import { BRAND } from "@/lib/brand";

export const productSite = {
  name: BRAND.name,
  // Owner-supplied contacts only. The presentation remains usable without one.
  contactUrl: process.env.NEXT_PUBLIC_PRODUCT_CONTACT_URL || "",
  portfolioUrl: process.env.NEXT_PUBLIC_PRODUCT_PORTFOLIO_URL || "",
  demoUrl: process.env.NEXT_PUBLIC_DEMO_URL || "",
  pricingReviewed: "01.10.2026",
  cliniccardsSource: "https://cliniccards.com/ua/help/versiya-free",
  iclinicSource: "https://iclinic.ua/",
} as const;

export const productOffer = {
  priceUsd: 300,
  compareAtUsd: 450,
  chatbotFromUsd: 50,
  chatbotToUsd: 150,
} as const;

export function publicContactUrl(value: string): string | undefined {
  try {
    const url = new URL(value);
    if (["https:", "mailto:", "tel:"].includes(url.protocol)) return url.href;
  } catch {
    // An unset or malformed contact must never create a broken sales link.
  }
  return undefined;
}

export function publicWebsiteUrl(value: string): string | undefined {
  try {
    const url = new URL(value);
    if (
      url.protocol === "https:" ||
      (url.protocol === "http:" &&
        ["localhost", "127.0.0.1"].includes(url.hostname))
    )
      return url.href;
  } catch {
    /* No fabricated destination for an unset URL. */
  }
  return undefined;
}

/** Public listed subscriptions; currencies intentionally stay separate. */
export function subscriptionEstimate(
  users: number,
  chairs: number,
  years: number,
) {
  return {
    cliniccardsUsd: Math.max(2, users) * 180 * years,
    iclinicUah: (1080 + Math.max(0, chairs - 1) * 720) * 12 * years,
  };
}
