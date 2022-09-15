import { ExamModel } from '../models/exam.model';
import logger from '../config/log';
import { QuestionInterface } from '../types/question.types';

class questionDao {
  save = async (body: QuestionInterface) => {
    logger.info('Dao /POST save');
    try {
      const questionObject = new ExamModel(body);
      return questionObject.save();
    } catch (error) {
      logger.error('Dao /POST save Error', error);
      throw error;
    }
  };

  getAll = async () => {
    logger.info('Dao /GET getAll');
    try {
      return await ExamModel.find({});
    } catch (error) {
      logger.error('Dao /GET getAll Error', error);
      throw error;
    }
  };

  getById = async (questionId: string) => {
    logger.info('Dao /GET getById');
    try {
      return await ExamModel.findById({ _id: questionId });
    } catch (error) {
      logger.error('Dao /GET getById Error', error);
      throw error;
    }
  };

  update = async (questionId: string, body: QuestionInterface) => {
    logger.info('Dao /PUT update');
    try {
      return await ExamModel.findByIdAndUpdate(questionId, body, {
        new: true,
      });
    } catch (error) {
      logger.error('Dao /PUT update Error', error);
      throw error;
    }
  };

  delete = async (questionId: string) => {
    logger.info('Dao /DELETE delete');
    try {
      return await ExamModel.findByIdAndRemove({
        _id: questionId,
      });
    } catch (error) {
      logger.error('Dao /DELETE delete Error', error);
      throw error;
    }
  };

  deleteAll = async () => {
    logger.info('Dao /DELETE deleteAll');
    try {
      return await ExamModel.deleteMany();
    } catch (error) {
      logger.error('Dao /DELETE deleteAll Error', error);
      throw error;
    }
  };
}

export default questionDao;
