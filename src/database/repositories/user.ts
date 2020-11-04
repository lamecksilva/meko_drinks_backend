/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { User } from '..'

/**
 * Return all users from database
 */
export async function returnAllUsersDB(): Promise<any> {
  try {
    const users = await User.find({}).lean()

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
    const newUser = await User.create(data)

    return newUser
  } catch (err) {
    throw new Error(err)
  }
}
