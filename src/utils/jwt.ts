/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { readFileSync } from 'fs'
import jwt, { SignOptions } from 'jsonwebtoken'

const PUB_KEY = readFileSync(process.cwd() + '/keys/public.pem', 'utf8')
const PRIV_KEY = readFileSync(process.cwd() + '/keys/key.pem', 'utf8')

/**
 * Module to create and sign a jwt token
 * @param data data to be inserted in jwt body
 * @param options SignOptions
 */
export async function jwtSign(data: any, options: SignOptions = {}): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.sign(data, PRIV_KEY, { ...options, algorithm: 'RS256' }, (err, isValid) => {
      if (err) {
        reject(err)
      } else {
        resolve(isValid)
      }
    })
  })
}

/**
 * Module to verify if the jwt token is valid
 * @param token Jwt Token to be verified
 */
export async function jwtVerify(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, PUB_KEY, (err, isValid) => {
      if (err) {
        reject(err)
      } else {
        resolve(isValid)
      }
    })
  })
}
