interface Questions {
  _id?: string;
  questions: string;
  option: [string];
  answer?: string;
}
interface QuestionInterface {
  questions: [Questions];
  preparedBy?: string;
  updatedBy?: string;
  _id?: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
}

export { Questions, QuestionInterface };
