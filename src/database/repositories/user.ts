import { User } from '..'

/**
 * returnAllUsersDB
 *
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
