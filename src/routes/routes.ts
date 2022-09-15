import express from 'express';
import Question from './questions.routes';
import User from './user.routes';
import Answser from './answer.routes';
class Routes {
  private userdetails = new User();
  private questiondetails = new Question();
  private answerdeatails = new Answser();

  public initialRoutes(app: express.Application): void {
    this.userdetails.users(app);
    this.questiondetails.questions(app);
    this.answerdeatails.answer(app);
  }
}

export default Routes;
