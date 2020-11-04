import { User } from '..'

/**
 * returnAllUsersDB
 *
 * Return all users from database
 */
export async function returnAllUsersDB(): Promise<any> {
  try {
    const users = await User.find({}).lean()

    if (users.length === 0) {
      throw new Error('Return all Users DB')
    }
    return users
  } catch (err) {
    throw new Error(err)
  }
}
