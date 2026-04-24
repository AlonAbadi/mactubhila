// Quiz Narrative Engine — maps answers → personalized copy on result page.
// REPLACE this file entirely per client. The types (NarrativeOutput) must stay.
// See client-brief.md for guidance on building the narrative.

import type { Answer } from "./quiz-config";

// ── Output type — do NOT change (consumed by QuizClient.tsx) ─────

export interface NarrativeOutput {
  headline:   { main: string; highlight: string };
  subline:    string;
  diagnosis:  { problem: string; consequence: string; socialProof: string };
  bridge:     string;
  confidence: { level: number; percentage: number; text: string };
  incoherenceWarning?: string;
}

// ── TODO: implement per client ───────────────────────────────────
// Steps:
// 1. Define profile types that map to your quiz questions
// 2. Map each Answer to a profile dimension
// 3. Write headline / subline / diagnosis / bridge texts
// 4. Wire up buildNarrative() below

export function buildNarrative(answers: Answer[]): NarrativeOutput {
  // Placeholder — replace with real logic
  void answers;
  return {
    headline:   { main: "ההמלצה שלך מוכנה —", highlight: "הנה הצעד הבא." },
    subline:    "על בסיס התשובות שלך, בחרנו את הדרך הכי מתאימה עבורך.",
    diagnosis:  {
      problem:     "TODO: תאר את הבעיה שגילינו",
      consequence: "TODO: תאר את התוצאה של הבעיה",
      socialProof: "TODO: הוסף data point מחזק",
    },
    bridge:     "TODO: כתוב משפט גישור לפרודוקט המומלץ",
    confidence: { level: 3, percentage: 84, text: "התאמה טובה" },
  };
}

export function getProfileSummary(answers: Answer[]): string {
  return answers.join("-");
}
