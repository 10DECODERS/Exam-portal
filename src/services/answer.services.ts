import AnswerDao from '../dao/answer.dao';
import QuestionDao from '../dao/questions.dao';
import UserDao from '../dao/user.dao';
import logger from '../config/log';
import { AnswerInterface } from '../types/answer.type';

class AnswerServices {
  public AnswerDao: AnswerDao;
  public QuestionDao: QuestionDao;
  public UserDao: UserDao;

  constructor() {
    this.QuestionDao = new QuestionDao();
    this.AnswerDao = new AnswerDao();
    this.UserDao = new UserDao();
  }

  public async SubmitAnswer(id: string, email: string, body: AnswerInterface) {
    logger.info('SERVICE /POST SubmitAnswer');
    try {
      const user: any = await this.UserDao.getById(id);

      const Question: any = await this.QuestionDao.getById(body.exam);

      let score = 0;

      for (let i = 0; i < Question.questions.length; i++) {
        const answer = body.answer[i].answer;
        const rightAnswer = Question.questions[i].answer;
        if (answer == rightAnswer) {
          score = ++score;
        }
      }

      body.score = score;
      body.attemptBy = email;
      const Answers = await this.AnswerDao.Submit(body);
      user.examAttempt.push(body.exam);
      await this.UserDao.update(id, user);
      return Answers;
    } catch (error) {
      logger.error('SERVICE /POST SubmitAnswer Error', error);
      throw error;
    }
  }
  public async getMarks(email: string, id: string) {
    logger.info('SERVICE /GET getMarks');
    try {
      const user: any = await this.UserDao.getById(email);
      const Answers: any = await this.AnswerDao.getByEmail(user?.email);
      const filterAnswer = Answers.filter((data: any) => JSON.stringify(data.exam) === JSON.stringify(id));
      const Marks = filterAnswer[0]?.score;
      return { Marks: Marks };
    } catch (error) {
      logger.error('SERVICE /GET getMarks Error', error);
      throw error;
    }
  }
}

export default AnswerServices;
