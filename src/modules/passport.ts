import { readFileSync } from 'fs'
import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt'

import { User } from '../database'
import { logger } from '../utils'

const PUB_KEY = readFileSync(process.cwd() + '/keys/public.pem', 'utf8')

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
}

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await User.findOne({ _id: jwtPayload.id }).lean()

      if (!user) {
        return done(null, false)
      }

      return done(null, user)
    } catch (err) {
      return done(err, false)
    }
  })
)

logger.info('[ MODULE ] Passport Module configured and ready.')
