import { model, Schema } from 'mongoose';

const question = new Schema({
  question: {
    type: String,
    required: true,
  },
  option: {
    type: [String],
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const examSchema = new Schema(
  {
    questions: [question],
    preparedBy: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const ExamModel = model('Exam', examSchema);
