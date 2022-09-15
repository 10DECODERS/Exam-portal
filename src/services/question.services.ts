/* eslint-disable @typescript-eslint/no-explicit-any */
import QuestionDao from '../dao/questions.dao';
import UserDao from '../dao/user.dao';
import logger from '../config/log';
import { QuestionInterface, Questions } from '../types/question.types';
import sgMail from '@sendgrid/mail';

class QuestionServices {
  public QuestionDao: QuestionDao;
  public UserDao: UserDao;

  constructor() {
    this.QuestionDao = new QuestionDao();
    this.UserDao = new UserDao();
  }

  public async postQuestion(question: QuestionInterface) {
    logger.info('SERVICE /GET postQuestion');
    try {
      const questionCreate = await this.QuestionDao.save(question);
      this.sendMail('Alert', 'New question has been posted');
      return questionCreate;
    } catch (error) {
      logger.error('SERVICE /GET postQuestion Error', error);
      throw error;
    }
  }

  public async sendMail(subject: string, content: string) {
    const key: any = process.env.SENDGRID_API_KEY;
    const users: any = await this.UserDao.getAll();
    const mails = users.filter((user: any) => user.role[0] === 'admin').map((e: any) => e.email);

    sgMail.setApiKey(key);
    const msg: any = {
      to: mails,
      from: process.env.FROM_MAIL,
      subject: subject,
      text: content,
    };
    sgMail
      .send(msg)
      .then(() => {
        logger.info('Alert sent');
      })
      .catch((error) => {
        logger.info('Error sending alert', error);
      });
  }

  public async getAllQuestions() {
    logger.info('SERVICE /GET postQuestion');
    try {
      const questionAll = await this.QuestionDao.getAll();
      const filteredCopy = JSON.parse(JSON.stringify(questionAll));
      if (Array.isArray(filteredCopy)) {
        filteredCopy.map((subData: QuestionInterface) => {
          subData.questions.map((childData: Questions) => {
            delete childData['answer'];
          });
        });
        return filteredCopy;
      }
      return questionAll;
    } catch (error) {
      logger.error('SERVICE /GET postQuestion Error', error);
      throw error;
    }
  }

  public async getByQuestionsID(userId: string, id: string, role: string) {
    logger.info('SERVICE /GET getQuestionsById');
    try {
      const user: any = await this.UserDao.getById(userId);
      if (role === 'student') {
        if (user?.examAttempt.includes(id)) {
          return { data: 'Already Attend' };
        }
        const questionAll = await this.QuestionDao.getById(id);
        const filteredCopy = JSON.parse(JSON.stringify(questionAll));
        if (filteredCopy?.questions) {
          filteredCopy.questions.map((data: Questions) => {
            delete data['answer'];
          });
          return filteredCopy;
        }
      } else {
        const questionAll = await this.QuestionDao.getById(id);
        return questionAll;
      }
    } catch (error) {
      logger.error('SERVICE /GET postQuestion Error', error);
      throw error;
    }
  }

  public async updateQuestionsbyId(id: string, question: [Questions], email: string) {
    logger.info('SERVICE /GET postQuestion');
    try {
      const questionCreate = await this.QuestionDao.update(id, { questions: question, updatedBy: email });
      this.sendMail('Alert', 'Question has been updated');
      return questionCreate;
    } catch (error) {
      logger.error('SERVICE /GET postQuestion Error', error);
      throw error;
    }
  }

  public async deleteQuestionById(questionId: string) {
    logger.info('SERVICE /DELETE deleteByID Question');
    try {
      const questionCreate = await this.QuestionDao.delete(questionId);
      this.sendMail('Alert', 'A question has been deleted');
      return questionCreate;
    } catch (error) {
      logger.error('SERVICE /GET postQuestion Error', error);
      throw error;
    }
  }

  public async deleteAllQuestions() {
    logger.info('SERVICE /DELETE deleteAll Question');
    try {
      const questionCreate = await this.QuestionDao.deleteAll();
      this.sendMail('Alert', 'All Questions have been deleted');
      return questionCreate;
    } catch (error) {
      logger.error('SERVICE /GET postQuestion Error', error);
      throw error;
    }
  }
}

export default QuestionServices;
