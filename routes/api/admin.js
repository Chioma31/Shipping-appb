import express, { Router } from 'express';
import { register, login} from '../../controllers/adminController.js'
const router = express.Router();

router.get('/tests', (req, res) => {
  res.json({ msg: 'user works'})
})

router.post('/', register)

router.get('/', login)


export default router