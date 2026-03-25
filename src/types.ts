export type QuestionType = 'multiple-choice' | 'scale' | 'text-short' | 'text-long' | 'multiple-with-text';

export interface Option {
  id: string;
  label: string;
  value: string;
  isEliminating?: boolean; // true if selecting this option eliminates the candidate
}

export interface Question {
  id: number;
  question: string;
  type: QuestionType;
  options?: Option[];
  placeholder?: string;
  block: number; // 1, 2, 3, or 4
  conditional?: {
    questionId: number;
    value: string;
    action: 'eliminate';
  };
}

export interface Answer {
  questionId: number;
  value: string | number | null;
  textValue?: string; // for multiple-with-text
}

export interface FormState {
  answers: Map<number, Answer>;
  currentQuestion: number;
  eliminated: boolean;
  eliminatedAt?: number; // question ID where eliminated
}

export interface ApplicationData {
  id?: string;
  q1?: string;
  q2?: string;
  q3?: string;
  q4?: string;
  q5?: number;
  q6?: string;
  q7?: string;
  q8?: string;
  q8_details?: string;
  q9?: string;
  q10?: string;
  q10_justification?: string;
  q11?: string;
  q12?: string;
  q13?: string;
  q14?: string;
  status: 'pending' | 'approved' | 'eliminated';
  eliminated: boolean;
  eliminated_at_question?: number;
  created_at?: string;
}
