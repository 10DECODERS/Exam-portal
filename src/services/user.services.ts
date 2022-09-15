// import { Request } from "express";
import UserDao from '../dao/user.dao';
import logger from '../config/log';
import { UserInterface } from '../types/user.type';
class UserServices {
  public UserDao: UserDao;

  constructor() {
    this.UserDao = new UserDao();
  }

  public async findUserByEmail(data: string) {
    logger.info('SERVICE /GET findUserByEmail');
    try {
      const user = await this.UserDao.findUserByEmail(data);
      return user;
    } catch (error) {
      logger.error('SERVICE /GET findUserByEmail Error', error);
      throw error;
    }
  }

  public async registerUser(user: UserInterface) {
    logger.info('SERVICE /GET registerUser');
    try {
      const userCreate = await this.UserDao.registerUser(user);
      return userCreate;
    } catch (error) {
      logger.error('SERVICE /GET registerUser Error', error);
      throw error;
    }
  }

  public async createUser(body: UserInterface) {
    logger.info('SERVICE /POST createUser');
    try {
      const Users = await this.UserDao.save(body);
      return Users;
    } catch (error) {
      logger.error('SERVICE /POST createUser Error', error);
      throw error;
    }
  }

  public getAllUser = async () => {
    logger.info('SERVICE /GET createUser');
    try {
      const Users = await this.UserDao.getAll();
      return Users;
    } catch (error) {
      logger.error('SERVICE /GET createUser Error', error);
      throw error;
    }
  };

  public async getUserById(id: string) {
    logger.info('SERVICE /GET createUser');
    try {
      const Users = await this.UserDao.getById(id);
      return Users;
    } catch (error) {
      logger.error('SERVICE /GET createUser Error', error);
      throw error;
    }
  }

  public async updateUser(UserId: string, UserData: UserInterface) {
    logger.info('SERVICE /PUT createUser');
    try {
      const Users = await this.UserDao.update(UserId, UserData);
      return Users;
    } catch (error) {
      logger.error('SERVICE /PUT createUser Error', error);
      throw error;
    }
  }

  public async approveUser(UserId: string) {
    logger.info('SERVICE /PUT approveUser');
    try {
      const Users = await this.UserDao.update(UserId, {
        approved: true,
      });
      return Users;
    } catch (error) {
      logger.error('SERVICE /PUT approveUser Error', error);
      throw error;
    }
  }
  public async deleteUserById(id: string) {
    logger.info('SERVICE /DELETE createUser');
    try {
      const Users = await this.UserDao.delete(id);
      return Users;
    } catch (error) {
      logger.error('SERVICE /DELETE createUser Error', error);
      throw error;
    }
  }

  public async deleteAllUser() {
    logger.info('SERVICE /DELETE createUser ');
    try {
      const Users = await this.UserDao.deleteAll();
      return Users;
    } catch (error) {
      logger.error('SERVICE /DELETE createUser Error', error);
      throw error;
    }
  }
}

export default UserServices;
