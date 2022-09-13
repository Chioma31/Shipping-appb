import Admin from '../Model/adminModel.js';
import bcrypt from 'bcryptjs'
import jwt  from 'jsonwebtoken'
import validateLoginInput  from '../validation/login.js'


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
        jwt.sign(payload, { expiresIn: 7200 }, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ',
            data: admin,
          })
        })
      } else {
        errors.password = 'Password incorrect'
        return res.status(400).json(errors)
      }
    })
  })
}
      
    
export { register, login} 