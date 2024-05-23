import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { findUserByUsername, addUser } from './userModel';

export const loginPage = (req: Request, res: Response) => {
  res.render('login');
};

export const registerPage = (req: Request, res: Response) => {
  res.render('register');
};

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = findUserByUsername(username);
  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = user;
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
};

export const register = (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (addUser(username, password)) {
    res.redirect('/login');
  } else {
    res.send('Username already exists');
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/dashboard');
    }
    res.redirect('/login');
  });
};