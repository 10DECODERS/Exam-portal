import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
import { isOffical } from '../middlewares/authorization.middleware';
import questionController from '../controllers/questions.controllers';

class Question {
  private questionController = new questionController();

  public questions(app: express.Application): void {
    app.route('/questions').post(verifyToken, isOffical, this.questionController.postQuestion); // post questions
    app.route('/questions').get(verifyToken, this.questionController.getAllQuestions);
    app.route('/questions/:id').get(verifyToken, this.questionController.getByQuestionsID); //get questions
    app.route('/questions/:id').put(verifyToken, isOffical, this.questionController.updateQuestionsbyId); //update questions
    app.route('/questions/:id').delete(verifyToken, isOffical, this.questionController.deleteQuestionById); //delete questions
    app.route('/questions').delete(verifyToken, isOffical, this.questionController.deleteAllQuestions);
  }
}

export default Question;
