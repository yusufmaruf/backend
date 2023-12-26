/* v8 ignore start */

/* eslint-disable import/first */
import dotenv from 'dotenv'
dotenv.config()

import App from './server'
const PORT = 3000

new App().app.listen(PORT, '0.0.0.0', () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
/* v8 ignore stop */
