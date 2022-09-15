import dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import logger from '../config/log';

const secretKey = process.env.TOKEN_KEY || '';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers['authorization']; // get the auth header

  // check for basic auth header
  if (!header) {
    logger.error('Missing Authorization Header');
    return res.status(401).json({ status: 401, success: false, message: 'Missing Authorization Header' });
  }

  const token = header.split(' ')[1];

  if (!token) {
    logger.error('A token is required for authentication');
    return res.status(403).send('A token is required for authentication');
  }

  try {
    const decoded: any = jsonwebtoken.verify(token, secretKey);
    const { data } = decoded;
    req.decoded = data; // attach user to request object
  } catch (err) {
    logger.error('Error -->', err);
    return res.status(401).send('Invalid Token');
  }

  return next();
};
