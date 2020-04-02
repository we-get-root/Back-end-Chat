import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const schemaAccountUser = new Schema({
  id: { type: String, required: false },
  fullName: { type: String, required: true },
  city: { type: String, required: false },
  dateBirth: { type: String, required: false },
  avatar: { type: String, required: false },
  status: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isOnline: { type: Boolean, required: false },
  friends: [String],
  dialog: [String],
  dateCreateAccount: Date,
}, {
  minimize: false,
  versionKey: false,
})

const addPost = new Schema({
  text: String,
})

schemaAccountUser.pre('save', function (next) {

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(this.password, salt)

  this.id = String(Math.random()).slice(3, 12)
  this.password = hash;
  this.dateCreateAccount = new Date()

  next()
})

export const modelPost = mongoose.model('User', addPost)
export const userModel = mongoose.model('Users', schemaAccountUser)

