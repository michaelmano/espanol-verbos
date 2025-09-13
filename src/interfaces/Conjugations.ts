export interface ConjugationRow {
  subject: string; // e.g., "YO", "TÚ"
  AR?: string; // optional, e.g., "HABLO"
  ER?: string; // optional, e.g., "COMO"
  IR?: string; // optional, e.g., "VIVO"
}

// The table of conjugations
export type ConjugationTable = ConjugationRow[];
export type VerbType = 'AR' | 'ER' | 'IR';

export interface VerbItem {
  infinitive: string;
  translation: string;
  type: VerbType;
}

export interface VerbDictionary {
  AR: VerbItem[];
  ER: VerbItem[];
  IR: VerbItem[];
}
