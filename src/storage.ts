export type PersistState = {
  checked: Record<string, boolean>;
  notes: string;
};

const KEY = "amazon-de1-prep-v2";

export function loadState(): PersistState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { checked: {}, notes: "" };
    const parsed = JSON.parse(raw) as Partial<PersistState>;
    return {
      checked: parsed.checked ?? {},
      notes: parsed.notes ?? "",
    };
  } catch {
    return { checked: {}, notes: "" };
  }
}

export function saveState(state: PersistState): void {
  localStorage.setItem(KEY, JSON.stringify(state));
}
