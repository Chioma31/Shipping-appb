import express, { Router } from 'express';
import { progressSet, shippingDetails, shippinginfo } from '../../controllers/userController.js'
const router = express.Router();


router.get('/tests', (req, res) => {
  res.json({ msg: 'user works'})
})


router.post('/', shippingDetails)

router.get('/:trackingId', shippinginfo)

router.get('/progress/:trackingId', progressSet)

export default router