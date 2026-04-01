import { site } from "@/lib/site";

/**
 * Single canonical origin for admin auth redirects (no apex ↔ www bounce).
 * Matches public site `site.domainUrl`: https://www.kerstencrawford.com
 */
export const ADMIN_CANONICAL_ORIGIN = site.domainUrl.replace(/\/$/, "");

export const ADMIN_CANONICAL_HOST = new URL(ADMIN_CANONICAL_ORIGIN).hostname;
