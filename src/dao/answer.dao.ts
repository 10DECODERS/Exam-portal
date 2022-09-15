import { AnswerModal } from '../models/answer.model';
import logger from '../config/log';
import { AnswerInterface } from '../types/answer.type';
class AnswerDao {
  Submit = async (data: AnswerInterface) => {
    logger.info('Answer Dao /POST Answer');
    try {
      const result = AnswerModal.create(data);
      return result;
    } catch (error) {
      logger.error('Dao /POST Answer Error', error);
      throw error;
    }
  };

  getById = async (id: string) => {
    logger.info('Answer Dao /GET getById');
    try {
      const result = await AnswerModal.findById({ _id: id });
      return result;
    } catch (error) {
      logger.error('Answer Dao /GET getById Error', error);
      throw error;
    }
  };

  getByEmail = async (email: string) => {
    logger.info('Answer Dao /GET getById');
    try {
      const result = await AnswerModal.find({ attemptBy: email });
      return result;
    } catch (error) {
      logger.error('Answer Dao /GET getById Error', error);
      throw error;
    }
  };
  // update = async (userId: string, body: AnswerInterface) => {
  //   logger.info('Dao /PUT update');
  //   try {
  //     const result = await AnswerModal.findByIdAndUpdate(userId, body, {
  //       new: true,
  //     });
  //     return result;
  //   } catch (error) {
  //     logger.error('Dao /PUT update Error', error);
  //     throw error;
  //   }
  // };

  // delete = async (userId: string) => {
  //   logger.info('Dao /DELETE delete');
  //   try {
  //     const result = await AnswerModal.findByIdAndRemove({
  //       _id: userId,
  //     });
  //     return result;
  //   } catch (error) {
  //     logger.error('Dao /DELETE delete Error', error);
  //     throw error;
  //   }
  // };

  // deleteAll = async () => {
  //   logger.info('Dao /DELETE deleteAll');
  //   try {
  //     const result = await AnswerModal.deleteMany();
  //     return result;
  //   } catch (error) {
  //     logger.error('Dao /DELETE deleteAll Error', error);
  //     throw error;
  //   }
  // };
}

export default AnswerDao;
