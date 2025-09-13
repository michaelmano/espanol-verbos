import type { ConjugationTable, VerbItem, VerbType } from '@/interfaces/Conjugations';

export const ENDINGS = {
  AR: ['o', 'as', 'ás', 'a', 'amos', 'áis', 'an'],
  ER: ['o', 'es', 'és', 'e', 'emos', 'éis', 'en'],
  IR: ['o', 'es', 'ís', 'e', 'imos', 'ís', 'en'],
};

export const SUBJECTS = [
  'YO',
  'TÚ',
  'VOS',
  'ÉL – ELLA – USTED',
  'NOSOTROS (AS)',
  'VOSOTROS (AS)',
  'ELLOS (AS) – USTEDES',
];

export const conjugateVerb = (infinitive: string, type: 'AR' | 'ER' | 'IR'): ConjugationTable => {
  const stem = infinitive.slice(0, -2);
  return SUBJECTS.map((subject, i) => ({
    subject,
    [type]: stem + ENDINGS[type][i],
  }));
};

export const BASE_CONJUGATION_TABLE: ConjugationTable = [
  { subject: 'YO', AR: 'HABLO', ER: 'COMO', IR: 'VIVO' },
  { subject: 'TÚ', AR: 'HABLAS', ER: 'COMES', IR: 'VIVES' },
  { subject: 'VOS', AR: 'HABLÁS', ER: 'COMÉS', IR: 'VIVÍS' },
  { subject: 'ÉL – ELLA – USTED', AR: 'HABLA', ER: 'COME', IR: 'VIVE' },
  { subject: 'NOSOTROS (AS)', AR: 'HABLAMOS', ER: 'COMEMOS', IR: 'VIVIMOS' },
  { subject: 'VOSOTROS (AS)', AR: 'HABLÁIS', ER: 'COMÉIS', IR: 'VIVÍS' },
  { subject: 'ELLOS (AS) – USTEDES', AR: 'HABLAN', ER: 'COMEN', IR: 'VIVEN' },
];

export const BASE_CONJUGATION_ENDINGS: Record<string, Record<'AR' | 'ER' | 'IR', string>> = {
  YO: { AR: 'O', ER: 'O', IR: 'O' },
  TÚ: { AR: 'AS', ER: 'ES', IR: 'ES' },
  VOS: { AR: 'ÁS', ER: 'ÉS', IR: 'ÍS' },
  EL: { AR: 'A', ER: 'E', IR: 'E' },
  NOSOTROS: { AR: 'AMOS', ER: 'EMOS', IR: 'IMOS' },
  VOSOTROS: { AR: 'ÁIS', ER: 'ÉIS', IR: 'ÍS' },
  ELLOS: { AR: 'AN', ER: 'EN', IR: 'EN' },
};

export const onHoverVerb = (verb: VerbItem, conjugationTable: ConjugationTable) => {
  const newConjugation = conjugateVerb(verb.infinitive, verb.type);

  return conjugationTable.map((row, i) => ({
    ...row,
    [verb.type]: newConjugation[i][verb.type],
  }));
};

export const ENDING_MAP: Record<VerbType, string> = {
  AR: 'AR',
  ER: 'ER',
  IR: 'IR',
};
