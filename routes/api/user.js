import express, { Router } from 'express';
import { shippingDetails, shippinginfo } from '../../controllers/userController.js'
const router = express.Router();


router.get('/test', (req, res) => {
  res.json({ msg: 'user works'})
})


router.post('/', shippingDetails)

router.get('/:trackingId', shippinginfo)

export default router