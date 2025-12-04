export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
}

export interface QuestionStatus {
  questionId: number;
  status: 'unattempted' | 'attempted' | 'marked' | 'answered-marked';
  selectedAnswer: number | null;
}

export interface ExamState {
  currentQuestion: number;
  questionStatuses: QuestionStatus[];
  timeLeft: number;
  warnings: number;
  notes: string;
}

export interface ExamResult {
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  unattempted: number;
  accuracy: number;
  xp: number;
  timeTaken: number;
  questionResults: {
    questionId: number;
    question: string;
    selectedAnswer: number | null;
    correctAnswer: number;
    isCorrect: boolean;
    explanation: string;
  }[];
}
