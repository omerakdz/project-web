import express from 'express';
import session, { SessionData }  from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import router from './routes';
import { addUser, findUserByUsername } from './userModel';
import bcrypt from 'bcryptjs';


declare module 'express-session' {
    interface SessionData {
      user?: { username: string; role: 'ADMIN' | 'USER' };
    }
  }

const app = express();

app.set('view engine', 'ejs');
app.set("port", 3000);
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

addUser('admin', 'adminpassword', 'ADMIN');
addUser('user', 'userpassword');

app.use(router);

app.get('/login', (req, res) => {
  res.render('login');
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = findUserByUsername(username);
  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = user;
    res.redirect('/dashboard'); 
  } else {
    res.redirect('/login');
  }
});


app.get('/dashboard', (req, res) => {
  if (req.session && req.session.user) {
    res.render('dashboard', { user: req.session.user });
  } else {
    res.redirect('/login'); 
  }
});


app.get('/', (req, res) => {
  res.redirect('/login');
});

const PORT = process.env.PORT || 3000;
app.listen(app.get("port"), () =>
    console.log("[server] http://localhost:" + app.get("port"))
  );
  
