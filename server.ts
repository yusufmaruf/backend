/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express } from 'express'
import knex from 'knex'
import { Model } from 'objection'
import { CarsController } from './controllers/cars'
import cors from 'cors'
import { UserController } from './controllers/authcontroller'

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '.env') })

// Connect ORM to Database
const knexInstance = knex({
  client: 'postgresql',
  connection: {
    port: 5432,
    database: 'car',
    user: 'postgres',
    password: 'bismillah'
  }
})

Model.knex(knexInstance)

// the type of req.user must be provided
class App {
  app: Express
  constructor () {
    const app: Express = express()
    app.use(cors())
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json()) // Use express.json() for JSON parsing
    this.app = app
    this.routes()
  }

  routes () {
    new CarsController(this.app).init()
    new UserController(this.app).init()
  }
}

export default App
