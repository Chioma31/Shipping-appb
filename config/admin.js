import bcrypt from 'bcryptjs'


const admin = {
  name: 'admin user',
  email: 'janegonfedric@gmail.com',
  password: bcrypt.hashSync('1234567', 10)
}

export default admin

