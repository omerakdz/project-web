
import { Request, Response } from 'express';

export const dashboardPage = (req: Request, res: Response) => {
  res.render('dashboard', { user: req.session.user });
};

