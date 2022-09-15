import express, { Response, Request } from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/authorization.middleware';
import UserController from '../controllers/user.controllers';

class User {
  private userController = new UserController();

  public users(app: express.Application): void {
    app.route('/health-check').get((req: Request, res: Response) => res.status(200).json('School Management Application')); // Register
    app.route('/register').post(this.userController.register); // Register
    app.route('/login').post(this.userController.login); // Login
    app.route('/user').post(verifyToken, isAdmin, this.userController.createUser);
    app.route('/users').get(verifyToken, isAdmin, this.userController.getUsers);
    app.route('/users/:id').get(verifyToken, this.userController.getByUsersID);
    app.route('/users/:id').put(verifyToken, isAdmin, this.userController.updateUser);
    app.route('/users/:id').delete(verifyToken, isAdmin, this.userController.deleteUser);
    app.route('/users').delete(verifyToken, isAdmin, this.userController.deleteAllUser);
    app.route('/approve/:id').put(verifyToken, isAdmin, this.userController.approveuser);
  }
}

export default User;
