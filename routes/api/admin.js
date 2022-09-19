import express, { Router } from 'express';
import { register, login, progress, getUsers, deleteUser} from '../../controllers/adminController.js'
import User from '../../Model/userModel.js';
const router = express.Router();

router.get('/tests', (req, res) => {
  res.json({ msg: 'user works'})
})

router.post('/', register)

router.post('/login', login)

router.put('/progress/:trackingId', progress)

router.get('/getUsers', getUsers)

router.delete('/delete/:trackingId', deleteUser)


export default router