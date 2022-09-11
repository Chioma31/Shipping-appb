import  dotenv  from 'dotenv'
import sendEmail  from '../config/sendMail.js'

dotenv.config()


// .env
const SENDER_EMAIL = process.env.SENDER_EMAIL


 const  trackingIDEmail=  async (trackingId, email) => {
    const html = `<h1>Tracking ID</h1>
                  <p>Good Day</p>
                  <p>The Tracking ID for your shipment is</p>
                  <p><strong>${trackingId}</strong></p>
                  <p>Thank you</p>`

  const result =  await sendEmail(SENDER_EMAIL, email, 'Track Your Shipment', html)
  return result
  }

export default trackingIDEmail