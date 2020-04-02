import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { checkToken } from './utils/checkToken.js';

import { newAuthController, newFriendsController } from './controller/controller';

import { userModel, modelPost } from './schema/user';
import user from './schema/user';

dotenv.config()
const app = express()
const server = app.listen(process.env.PORT, () => {
  const host = server.address().address
  const port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const controllerAuth = new newAuthController;
const controllerFriends = new newFriendsController;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, UPDATE, HEAD, OPTIONS, GET, POST")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization")
  next()
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(checkToken)


app.post('/authorization', controllerAuth.authorization)
app.post('/registration', controllerAuth.registration)

app.post('/users/friends', controllerFriends.getFriends)
// app.post('/user/addUser/:id', controllerFriends.addUser)
// app.delete('/user/delete/:id', controllerFriends.deleteUser)

app.get('/update', (req, res) => {

  // const post = [{text: 'je'}]

  // const r = userModel.updateMany({}, { $rename: { post: "post_at1" } }).then((err) => console.log())
  
  // userModel.find({}, (err, result) => {
  //   console.log(result)
  // })

  res.json({
    message: 'yes'
  })
})

// "fullName": "Masha",
// "email": "masha@mail.ru",
// "password": "qwerty",
// "avatar": null,
