export type TemplateName = "bloom" | "confetti" | "golden-hour";

export interface InviteData {
  id: string;
  template: TemplateName;
  partnerA: string;
  partnerB: string;
  date: string;
  time: string;
  venue: string;
  photo: string | null;
}

const STORE_KEY = "wedlink_invites";

function getStore(): Record<string, InviteData> {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveInvite(invite: InviteData): void {
  const store = getStore();
  store[invite.id] = invite;
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

export function getInvite(id: string): InviteData | null {
  return getStore()[id] || null;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 8);
}
