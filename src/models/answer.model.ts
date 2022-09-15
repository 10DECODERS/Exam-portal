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

const answerSchema = new Schema(
  {
    answer: [question],
    attemptBy: {
      type: String,
      required: true,
    },
    exam: {
      type: Schema.Types.ObjectId,
      ref: 'Exam',
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const AnswerModal = model('Answer', answerSchema);
