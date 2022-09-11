import User from '../Model/userModel.js';
import random from 'randomstring';
import trackingIDEmail from './mail.js';


 const shippingDetails = (req, res) => {
  try {
    
    const { name, email, country, city, zipCode, shippingAddress, content, phoneNumber, amountPaid } =  req.body

    const trackingId = random.generate({ length: 12, charset: 'alphanumeric', capitalization: 'uppercase' })

    const newUser = new User({
      name, 
      email, 
      country, 
      city, 
      zipCode, 
      shippingAddress, 
      content, 
      phoneNumber, 
      amountPaid,
      trackingId,
    })

     newUser.save()

    .then(async () => {
      const send = User.findOne({ trackingId })
      if (!User) {
        res.status(404).json({ message: 'Not found' })
      } else {
        const { email }  = newUser                                          
        trackingIDEmail(trackingId, email)
        .then((email) => (console.log("Email not sent", email )))
        .catch((error) => (console.log(error.message)))
      }
    }).catch((error) => {
      console.log("trackingid not set", error);
    });

    res.status(200).json({
      success: true,
      message: 'Shipping comfirmed you can track your shippment',
      data: User,
    })

    

  } catch (error) {
    res.status(500).json(error)
  }
}
const shippinginfo = async (req, res) => {
  try {
    const { trackingId } = req.params
    const shippinginfos = await User.findOne({ trackingId })
    console.log("your shipping info", shippinginfos)
    if (!User) {
      res.status(404).json({
        message: `Check your email to confirm that ${trackingId} is the ID that was sent to you`,
      })
    }
    if (User) {
      res.status(200).json({
        success: true,
        message: "You can now track your shippment",
        return: shippinginfos,
        data:User
      })
    }
    
  } catch (error) {
    console.log(error)
  }
}

export { shippingDetails,shippinginfo } 