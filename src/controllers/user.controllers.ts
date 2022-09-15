import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserServices from '../services/user.services';
import logger from '../config/log';
import jsonwebtoken from 'jsonwebtoken';

const userService = new UserServices();
class UserController {
  // public userService: UserServices;

  // constructor() {
  //   logger.info("CONSTRUCTOR");
  //   this.userService = new UserServices();
  // }

  public async register(req: Request, res: Response): Promise<void> {
    logger.info('CONTROLLER /POST register user');

    try {
      const { firstName, lastName, email, password, role } = req.body;

      if (!(email && password && firstName && lastName && role.length > 0)) {
        logger.error('CONTROLLER /POST register-user All input is required');
        res.status(400).send('All input is required');
        return;
      }

      const oldUser = await userService.findUserByEmail(email);

      if (oldUser) {
        logger.error('CONTROLLER /POST register-user User Already Exist. Please Login');
        res.status(409).send({
          status: 409,
          success: false,
          message: 'User Already Exist. Please Login',
        });
        return;
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser: any = await userService.registerUser({
        firstName,
        lastName,
        email: email.toLowerCase(), // convert email to lowercase
        password: encryptedPassword, // encrypt the password
        role,
      });
      const passData = {
        user: newUser._id,
        email: newUser.email,
        role: newUser.role[0],
      };

      // Create token
      const TOKEN_KEY = process.env.TOKEN_KEY || '';
      const token = jsonwebtoken.sign(
        { data: passData },
        TOKEN_KEY,
        { expiresIn: 86400 }, // expires in 24 hours
      );
      res.status(201).json({ data: newUser, accessToken: token });
    } catch (err) {
      logger.error('CONTROLLER /POST register Error', err);
      res.status(400).send(err);
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    logger.info('CONTROLLER /POST login-User');
    try {
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
        logger.error('CONTROLLER /POST login-User All input is required');
        res.status(400).send('All input is required');
        return;
      }

      const user: any = await userService.findUserByEmail(email);
      if (!user.approved) {
        res.status(400).json('Please get approval from admin');
        return;
      }

      if (user && (await bcrypt.compare(password, user.password))) {
        const passData = {
          user: user._id,
          email: user.email,
          role: user.role[0],
        };

        // Create token
        const TOKEN_KEY = process.env.TOKEN_KEY || '';
        const token = jsonwebtoken.sign(
          { data: passData },
          TOKEN_KEY,
          { expiresIn: 86400 }, // expires in 24 hours
        );
        // user['accessToken'] = token; // save user token
        res.status(200).json({ data: user, accessToken: token }); // user
      } else {
        logger.error('CONTROLLER /POST login-User Invalid Credentials');
        res.status(400).send('Invalid Credentials');
      }
    } catch (err) {
      logger.error('CONTROLLER /POST login Error', err);
      res.status(400).send(err);
    }
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    logger.info('CONTROLLER /POST createUser');
    try {
      // Validate user input
      const { email, password } = req.body;

      const oldUser = await userService.findUserByEmail(email);

      if (oldUser) {
        logger.error('CONTROLLER /POST register-user User Already Exist. Please Login');
        res.status(409).send({
          status: 409,
          success: false,
          message: 'User Already Exist. Please Login',
        });
        return;
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const users = await userService.createUser({
        ...req.body,
        email: email.toLowerCase(), // convert email to lowercase
        password: encryptedPassword, // encrypt the password
      });
      res.status(201).send({
        success: true,
        data: users,
        message: 'created successfully',
      });
    } catch (err) {
      //Error code exception handling
      logger.error('CONTROLLER /POST createUser Error', err);
      res.status(400).send(err);
    }
  }

  public async getUsers(req: Request, res: Response): Promise<void> {
    logger.info('CONTROLLER /GET getUsers', req.body);
    try {
      const users = await userService.getAllUser();
      res
        .status(200)
        .send({
          success: true,
          data: users,
          message: 'list of users',
        })
        .json();
    } catch (err) {
      logger.error('CONTROLLER /GET getUsers Error', err);
      res.status(400).send(err);
    }
  }

  public async getByUsersID(req: Request, res: Response): Promise<void> {
    logger.info('CONTROLLER /GET getByUsersID', req.params.id);
    try {
      const userId = req.params.id;
      const users = await userService.getUserById(userId);
      if (users) {
        res.status(200).send({
          success: true,
          data: users,
          message: 'user detail',
        });
      } else {
        res.status(404).send({
          success: false,
          data: null,
          message: 'user not found',
        });
      }
    } catch (err) {
      logger.error('CONTROLLER /GET getByUserID Error', err);
      res.status(400).send(err);
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    logger.info('CONTROLLER /PUT updateUser', req.params.id, req.body);
    try {
      const body = req.body;
      const userId = '' + req.params.id;
      let users;
      if (body?.password) {
        const encryptedPassword = await bcrypt.hash(body.password, 10);
        users = await userService.updateUser(userId, {
          ...body,
          email: body.email.toLowerCase(),
          password: encryptedPassword,
        });
      } else {
        users = await userService.updateUser(userId, body);
      }
      res.status(200).send({
        success: true,
        data: users,
        message: 'updated successfully',
      });
    } catch (err) {
      logger.error('CONTROLLER /PUT updateUser Error', err);
      res.status(400).send(err);
    }
  }
  public async approveuser(req: Request, res: Response): Promise<void> {
    logger.info('CONTROLLER /PUT updateUser', req.params.id, req.body);
    try {
      const userId = req.params.id;
      const users = await userService.approveUser(userId);
      res.status(200).send({
        success: true,
        data: users,
        message: 'updated successfully',
      });
    } catch (err) {
      logger.error('CONTROLLER /PUT updateUser Error', err);
      res.status(400).send(err);
    }
  }
  public async deleteUser(req: Request, res: Response): Promise<void> {
    logger.info('CONTROLLER /DELETE deleteUser', req.params.id);
    try {
      const userId = req.params.id;
      await userService.deleteUserById(userId);
      res.status(200).send({
        success: true,
        message: 'deleted successfully',
      });
    } catch (err) {
      logger.error('CONTROLLER /DELETE deleteUser Error', err);
      res.status(400).send(err);
    }
  }

  public async deleteAllUser(req: Request, res: Response): Promise<void> {
    logger.info('CONTROLLER /DELETE deleteAllUser');
    try {
      await userService.deleteAllUser();
      res.status(204).send({
        success: true,
        message: 'deleted all document successfully',
      });
    } catch (err) {
      logger.error('CONTROLLER /DELETE deleteAllUser Error', err);
      res.status(400).send(err);
    }
  }
}

export default UserController;
