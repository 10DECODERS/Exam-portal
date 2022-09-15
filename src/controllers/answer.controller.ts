import { Request, Response } from 'express';
import AnswerServices from '../services/answer.services';
import logger from '../config/log';

const answerService = new AnswerServices();
class AnswerController {
  public async submitAnswer(req: Request, res: Response): Promise<void> {
    logger.info('CONTROLLER /POST SubmitAnswer', req.params.id, req.body);
    try {
      const body = req.body;
      const { user, email } = req.decoded;
      const answers = await answerService.SubmitAnswer(user, email, body);
      res.status(200).send({
        success: true,
        data: answers,
        message: 'updated successfully',
      });
    } catch (err) {
      logger.error('CONTROLLER /POST SubmitAnswer Error', err);
      res.status(400).send(err);
    }
  }

  public async getmarksById(req: Request, res: Response): Promise<void> {
    logger.info('CONTROLLER /GET getmarks', req.body);
    try {
      const email = req.params.id;
      const marks: any = await answerService.getMarks(email, req.params.examId);
      if (marks?.Marks) {
        res
          .status(200)
          .send({
            success: true,
            data: marks,
            message: 'marks',
          })
          .json();
      } else {
        res.status(404).send({
          success: false,
          data: null,
          message: 'please attend exam',
        });
      }
    } catch (err) {
      logger.error('CONTROLLER /GET getmarks Error', err);
      res.status(400).send(err);
    }
  }
}

export default AnswerController;
