import { Request, Response } from 'express';
import QuestionServices from '../services/question.services';
import logger from '../config/log';

const questionService = new QuestionServices();
class QuestionController {
  public async postQuestion(req: Request, res: Response): Promise<void> {
    logger.info('CONTROLLER /POST post question');

    try {
      const { questions } = req.body;
      const { email } = req.decoded;
      if (!(questions.length > 0)) {
        logger.error('CONTROLLER /POST register-user All input is required');
        res.status(400).send('All input is required');
        return;
      }

      const postExam = await questionService.postQuestion({
        questions,
        preparedBy: email,
        updatedBy: email,
      });

      res.status(201).json(postExam);
    } catch (err) {
      logger.error('CONTROLLER /POST post Error', err);
      res.status(400).send(err);
    }
  }

  public async getAllQuestions(req: Request, res: Response): Promise<void> {
    logger.info('CONTROLLER /GET getAll question');

    try {
      const questons = await questionService.getAllQuestions();
      res
        .status(200)
        .send({
          success: true,
          data: questons,
          message: 'list of questons',
        })
        .json();
    } catch (err) {
      logger.error('CONTROLLER /GET getAll Error', err);
      res.status(400).send(err);
    }
  }

  public async getByQuestionsID(req: Request, res: Response): Promise<void> {
    logger.info('CONTROLLER /GET getByID question');

    try {
      const { id } = req.params;
      const { user, role } = req.decoded;
      const questons: any = await questionService.getByQuestionsID(user, id, role);
      if (!questons) {
        res
          .status(404)
          .send({
            success: false,
            data: null,
            message: 'Exam not found',
          })
          .json();
      } else if (questons?.data === 'Already Attend') {
        res
          .status(404)
          .send({
            success: false,
            data: null,
            message: 'Exam already attend',
          })
          .json();
      } else {
        res
          .status(200)
          .send({
            success: true,
            data: questons,
            message: 'question',
          })
          .json();
      }
    } catch (err) {
      logger.error('CONTROLLER /GET getById Error', err);
      res.status(400).send(err);
    }
  }

  public async updateQuestionsbyId(req: Request, res: Response): Promise<void> {
    logger.info('CONTROLLER /PUT updateById question');

    try {
      const { questions } = req.body;
      const { id } = req.params;
      const { email } = req.decoded;
      const questons = await questionService.updateQuestionsbyId(id, questions, email);
      res
        .status(200)
        .send({
          success: true,
          data: questons,
          message: 'question updated successfully',
        })
        .json();
    } catch (err) {
      logger.error('CONTROLLER /POST post Error', err);
      res.status(400).send(err);
    }
  }

  public async deleteQuestionById(req: Request, res: Response): Promise<void> {
    logger.info('CONTROLLER /DELETE deleteById question');

    try {
      const { id } = req.params;
      const question = await questionService.deleteQuestionById(id);
      res
        .status(200)
        .send({
          success: true,
          data: question,
          message: 'deleted successfully',
        })
        .json();
    } catch (err) {
      logger.error('CONTROLLER /DELETE delete Error', err);
      res.status(400).send(err);
    }
  }

  public async deleteAllQuestions(req: Request, res: Response): Promise<void> {
    logger.info('CONTROLLER /DELETE deleteAll question');

    try {
      const question = await questionService.deleteAllQuestions();
      res
        .status(200)
        .send({
          success: true,
          data: question,
          message: 'Truncated All Data',
        })
        .json();
    } catch (err) {
      logger.error('CONTROLLER /DELETE deleteAll Error', err);
      res.status(400).send(err);
    }
  }
}

export default QuestionController;
