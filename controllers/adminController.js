import Admin from '../Model/adminModel.js';
import bcrypt from 'bcryptjs'
import jwt  from 'jsonwebtoken'
import validateLoginInput  from '../validation/login.js'
import User from '../Model/userModel.js';

const secret = process.env.SECRET_KEY


const register = (req, res) => {

  const { names, email, password } = req.body

  Admin.findOne({ email: req.body.email })
    .then((admin) => {

      if (admin) {
        return res.status(400).json({ email: 'Email already exists' })
      } else {
        const newAdmin = new Admin({
          names,
          email,
          password,
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err
            newAdmin.password = hash

            newAdmin.save()
              .then((admin) => {
                console.log("admin is created", admin );
                res.status(201).json({
                  success: true,
                  message:
                    'Account has created successfuly',
                  data: admin,
                })
              })
              .catch((err) => console.log(err))
          })
        })
      }
    })
}

const login = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

  // find user by email
  Admin.findOne({ email }).then((admin) => {
    // check for admin
    if (!admin) {
      errors.email = 'admin not found'
      return res.status(404).json(errors)
    }
    // check password
    bcrypt.compare(password, admin.password)
    .then((isMatch) => {
      if (isMatch) {
        // admin matched

        const payload = {
          id: admin.id,
          names: admin.names
        } // Payload

        // Sign token
        jwt.sign(payload, secret, { expiresIn: 7200 }, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer '+ token,
            data: Admin,
          })
        })
      } else {
        errors.password = 'Password incorrect'
        return res.status(400).json(errors)
      }
    })
  })
}

const deleteUser = async (req, res) => {

  const user = await User.deleteOne(req.params.id)
    
  if (user) {


      res.json({message: 'user removed'})

   
    }else {
    res.status (404)
    throw new error ('user not found')
  }
}

const getUsers = async (req, res) => {

  const users = await User.find({})
  if (users) {
    res.json(users)
    
  }else {
    res.status (404)
    throw new error ('users not found')
  }
}

const progress = async (req, res) => {
  const id = req.params.trackingId;
  const updates = {} // empty object to allow for specifying of fields to be updated in the object, instead of updating the whole object everytime

  // for(const ops of req.body) {
  //   updates[ops.propName] = ops.value;
  // }
  if(req.body.progress) updates.progress = req.body.progress;
  //Mongoose update method that updates the data by using it's id and uses the data from 'updates' to $set to replace the value in the field
  User.updateOne({trackingId: id}, {$set: updates},  { new: true })
  .exec()
  .then(result => {
    res.status(200).json({
      message: "Updated successfully",
      data: result
    })
  })
  .catch(error => {
    console.error(error)
    res.status(500).json({
      error
    })
  })
}
      
    
export { register, login, deleteUser, getUsers, progress} 