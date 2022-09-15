import express from 'express';
import AnswerController from '../controllers/answer.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { isStudent } from '../middlewares/authorization.middleware';

class Answser {
  private answerController = new AnswerController();

  public answer(app: express.Application): void {
    app.route('/submitanswer').post(verifyToken, isStudent, this.answerController.submitAnswer);
    app.route('/marks/:id/:examId').get(verifyToken, this.answerController.getmarksById);
  }
}

export default Answser;
