import { UserModel } from '../models/user.model';
import logger from '../config/log';
import { UserInterface } from '../types/user.type';

class UserDao {
  findUserByEmail = async (email: string) => {
    logger.info('Dao /GET findUserByEmail');
    try {
      const userData = await UserModel.findOne({ email: email });
      return userData;
    } catch (error) {
      logger.error('Dao /GET findUserByEmail Error', error);
      throw error;
    }
  };

  registerUser = async (data: UserInterface) => {
    logger.info('Dao /POST registerUser');
    try {
      const userCreate = UserModel.create(data);
      return userCreate;
    } catch (error) {
      logger.error('Dao /POST registerUser Error', error);
      throw error;
    }
  };

  save = async (body: UserInterface) => {
    logger.info('Dao /POST save');
    try {
      const userObject = new UserModel(body);
      const userData = userObject.save();
      return userData;
    } catch (error) {
      logger.error('Dao /POST save Error', error);
      throw error;
    }
  };

  getAll = async () => {
    logger.info('Dao /GET getAll');
    try {
      const usersData = await UserModel.find({});
      return usersData;
    } catch (error) {
      logger.error('Dao /GET getAll Error', error);
      throw error;
    }
  };

  getById = async (userId: string) => {
    logger.info('Dao /GET getById');
    try {
      const userData = await UserModel.findById({ _id: userId });
      return userData;
    } catch (error) {
      logger.error('Dao /GET getById Error', error);
      throw error;
    }
  };

  update = async (userId: string, body: UserInterface) => {
    logger.info('Dao /PUT update');
    try {
      const userData = await UserModel.findByIdAndUpdate(userId, body, {
        new: true,
      });
      return userData;
    } catch (error) {
      logger.error('Dao /PUT update Error', error);
      throw error;
    }
  };

  delete = async (userId: string) => {
    logger.info('Dao /DELETE delete');
    try {
      const userData = await UserModel.findByIdAndRemove({
        _id: userId,
      });
      return userData;
    } catch (error) {
      logger.error('Dao /DELETE delete Error', error);
      throw error;
    }
  };

  deleteAll = async () => {
    logger.info('Dao /DELETE deleteAll');
    try {
      const userData = await UserModel.deleteMany();
      return userData;
    } catch (error) {
      logger.error('Dao /DELETE deleteAll Error', error);
      throw error;
    }
  };
}

export default UserDao;
