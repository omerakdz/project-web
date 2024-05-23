import express from 'express';
import { loginPage, login, logout, registerPage, register } from './authControl';
import { dashboardPage } from './dashboardControl';
import { ensureAuthenticated, forwardAuthenticated, ensureAdmin } from './middleWare';

const router = express.Router();

router.get('/login', forwardAuthenticated, loginPage);
router.post('/login', login);
router.get('/register', forwardAuthenticated, registerPage);
router.post('/register', register);
router.post('/logout', logout);

router.get('/dashboard', ensureAuthenticated, dashboardPage);

export default router;