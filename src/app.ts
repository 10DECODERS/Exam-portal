import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import Routes from './routes/routes';
import logger from './config/log';
// import helmet from 'helmet';

dotenv.config();
const PORT = process.env.PORT;
const routes: Routes = new Routes();

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.setupDb();
    this.routing();
    this.listen();
  }

  private config(): void {
    this.app.use(express.json()); // support application/json type post data
    this.app.use(express.urlencoded({ extended: false })); //support application/x-www-form-urlencoded post data
    this.app.use(cors({ credentials: true, origin: true }));
    //this.app.use(helmet()); //adds some sensible default security Headers to your app.
  }

  private setupDb(): void {
    const URL = process.env.DATABASE_URL || '';
    mongoose
      .connect(URL)
      .then(() => {
        logger.info('Successfully connected to the database');
      })
      .catch((err) => {
        logger.info('Could not connect to the database. Exiting now...', err);
        process.exit();
      });
  }

  public routing(): void {
    routes.initialRoutes(this.app);
  }

  public listen(): void {
    this.app.listen(PORT, () => {
      logger.info('Express server listening on port ' + PORT);
    });
  }
}

export default new App().app;
