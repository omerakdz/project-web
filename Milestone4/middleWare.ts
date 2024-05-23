import { Request, Response, NextFunction } from 'express';

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/login');
};

export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.user) {
    return res.redirect('/dashboard');
  }
  next();
};

export const ensureAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.user && req.session.user.role === 'ADMIN') {
    return next();
  }
  res.redirect('/dashboard');
};