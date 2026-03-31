/**
 * Central place for Kersten Crawford business details.
 * Update phone, email, or domain here and the site updates everywhere.
 */
export const site = {
  name: "Kersten Crawford",
  tagline: "Your trusted partner for tax solutions",
  phone: "405-367-1429",
  phoneTel: "tel:+14053671429",
  email: "kerstencrawford@outlook.com",
  emailMailto: "mailto:kerstencrawford@outlook.com",
  domain: "www.kerstencrawford.com",
  domainUrl: "https://www.kerstencrawford.com",
} as const;

/** Options shown on the appointment form — keep in sync with services copy if you add services. */
export const serviceOptions = [
  "Personal Tax Preparation",
  "Self-Employed and 1099 Filing",
  "Small Business Tax Help",
  "Prior Year Returns",
  "Tax Consultation",
  "Other / Not sure yet",
] as const;
