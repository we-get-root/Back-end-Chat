import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { userModel } from '../schema/user';


export class newAuthController {

  authorization(req, res) {

    const email = req.body.email;
    const password = req.body.password;

    userModel.findOne({ email }, (err, app) => {
      if (app === null) {
        res.status(200).json({
          success: false,
          error: 500,
          message: 'The user does not exist, please register!'
        })
      } else if (bcrypt.compareSync(password, app.password)) {
        const token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '24h' })
        res.status(200).json({
          success: true,
          token: token,
          message: 'Authentication successful!'
        })
      } else {
        res.status(200).json({
          success: false,
          error: 600,
          message: 'Incorrect email or password'
        })
      }

    })
  }

  registration(req, res) {
    const readySchema = new userModel({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      avatar: req.body.avatar,
    })

    readySchema.save().then(() => console.log('Successfully')).catch((e) => console.log(e))
    res.send('User create! Status:: 200')
  }
}


export class newFriendsController {
  getFriends(req, res) {
    const idFriends = [...req.body.idFriends]

    userModel.find({ id: idFriends }, (err, user) => {

      const result = []
      for (let obj of user) {
        const filterUser = Object.fromEntries(Object.entries(obj).filter((k) => k[0] !== 'password' && k[0] !== 'dialog'))
        result.push(filterUser)
      }

      res.status(200).json({
        status: 'success',
        friends: result
      })
    }).lean()

  }
}

