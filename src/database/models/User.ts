import { model, Schema } from 'mongoose'

const UserSchema = new Schema(
  {
    status: {
      type: Boolean,
      requred: true,
      default: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  {
    collection: 'users',
  }
)

export const User = model('User', UserSchema)
