// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import './modules/env-check'

import { startServer } from './server'

startServer()
