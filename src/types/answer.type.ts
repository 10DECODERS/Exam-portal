interface Questions {
  questions: string;
  option: [string];
  answer?: string;
}
export interface AnswerInterface {
  answer: [Questions];
  attemptBy: string;
  exam: string;
  score: number;
}
