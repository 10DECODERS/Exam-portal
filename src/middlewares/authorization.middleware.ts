import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.decoded.role === 'admin') {
    next();
  } else {
    return res.status(401).json({ status: 401, success: false, message: 'UnAuthorization to access' });
  }
};

export const isStaff = (req: Request, res: Response, next: NextFunction) => {
  if (req.decoded.role === 'staff') {
    next();
  } else {
    return res.status(401).json({ status: 401, success: false, message: 'UnAuthorization to access' });
  }
};

export const isStudent = (req: Request, res: Response, next: NextFunction) => {
  if (req.decoded.role === 'student') {
    next();
  } else {
    return res.status(401).json({ status: 401, success: false, message: 'UnAuthorization to access' });
  }
};

export const isOffical = (req: Request, res: Response, next: NextFunction) => {
  if (req.decoded.role === 'staff' || req.decoded.role === 'admin') {
    next();
  } else {
    return res.status(401).json({ status: 401, success: false, message: 'UnAuthorization to access' });
  }
};
