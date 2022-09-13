import express, { Router } from 'express';
import { register, login} from '../../controllers/adminController.js'
const router = express.Router();

router.get('/tests', (req, res) => {
  res.json({ msg: 'user works'})
})

router.post('/', register)

router.post('/login', login)


export default router