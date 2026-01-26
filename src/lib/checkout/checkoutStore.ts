export type DeliveryMethod = "pickup" | "delivery";

export type CheckoutDraft = {
  name: string;
  notes: string;
  method: DeliveryMethod;
  updatedAt: number;
};

const KEY = "delegance_checkout_draft_v1";

export function loadCheckoutDraft(): CheckoutDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CheckoutDraft;
    if (!parsed || typeof parsed.updatedAt !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveCheckoutDraft(draft: Omit<CheckoutDraft, "updatedAt">) {
  if (typeof window === "undefined") return;
  try {
    const payload: CheckoutDraft = { ...draft, updatedAt: Date.now() };
    window.localStorage.setItem(KEY, JSON.stringify(payload));
  } catch {
    // ignore
  }
}

export function clearCheckoutDraft() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
