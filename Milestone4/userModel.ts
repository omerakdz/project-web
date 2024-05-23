import bcrypt from 'bcryptjs';

interface User {
  username: string;
  password: string;
  role: 'ADMIN' | 'USER';
}

const users: User[] = [
  { username: 'admin', password: bcrypt.hashSync('adminPassword', 10), role: 'ADMIN' },
  { username: 'user', password: bcrypt.hashSync('userPassword', 10), role: 'USER' }
];

export const findUserByUsername = (username: string): User | undefined => {
  return users.find(user => user.username === username);
};

export const addUser = (username: string, password: string, role: 'ADMIN' | 'USER' = 'USER'): boolean => {
  if (findUserByUsername(username)) {
    return false;
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ username, password: hashedPassword, role });
  return true;
};