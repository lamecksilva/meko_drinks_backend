/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { User } from '..'

/**
 * Return all users from database
 */
export async function returnAllUsersDB(): Promise<any> {
  try {
    const users = await User.find({}, { password: 0, __v: 0 }).lean()

    return users
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Save new user in Database
 * @param data data from new user
 */
export async function saveNewUserDB(data: any): Promise<any> {
  try {
    const newUser: any = await User.create(data)

    return newUser
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Search and find one user by the email
 * @param email email from user
 */
export async function getUserByEmailDB(email: string): Promise<any> {
  try {
    const user = await User.findOne({ email, status: true }).lean()

    return user
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Search and find a user by Id
 * @param id id of the user
 */
export async function getUserById(id: string): Promise<any> {
  try {
    const user = await User.findOne({ _id: id }, { password: 0, __v: 0 }).lean()

    return user
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Search and update user by id
 *
 * @param id id of the user
 * @param data data to be updated
 */
export async function updateUserDB(id: string, data: any): Promise<any> {
  try {
    const user = await User.findOneAndUpdate({ _id: id }, { $set: data }, { new: true }).lean()

    return user
  } catch (err) {
    throw new Error(err)
  }
}
/**
 * Search for a user and update the password field
 * @param id id of the user
 * @param password password to be updated
 */
export async function updatePasswordDB(id: string, password: string): Promise<any> {
  try {
    const user = await User.findOneAndUpdate({ _id: id }, { password }, { new: true }).lean()

    return user
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Search and 'remove' the user from db
 * @param id id of the user
 */
export async function removeUserDB(id: string): Promise<any> {
  try {
    const user = await User.findOneAndUpdate({ _id: id }, { status: false }).lean()

    return user
  } catch (err) {
    throw new Error(err)
  }
}
