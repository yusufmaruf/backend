/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { afterAll, describe, expect, it, vi } from 'vitest'
import App from '../server'
import jsonCar from './__MOCK__/car.json'
import path from 'node:path'
import supertest from 'supertest'
import { login, loginInvalid, loginSuperAdmin } from '../utils/test-utils'
import { fakerID_ID as faker } from '@faker-js/faker'
import { CarsModel } from '../models/cars'
import * as utilsupload from '../utils/upload'

vi.spyOn(utilsupload, 'uploadCloudinary').mockImplementation(
  async () => 'uri-image.com'
)

describe('test car module', () => {
  const app = new App().app
  let id: number
  let token: string = ''

  afterAll(async () => {
    await CarsModel.query().deleteById(id)
    vi.clearAllMocks()
  })

  it('should be able to get cars', async () => {
    const response = await supertest(app).get('/cars')
    expect(response.status).toBe(200)
  })

  it('should be able to get one car but not found', async () => {
    const response = await supertest(app).get('/cars/50')
    expect(response.status).toBe(404)
  })

  it('should be able to login', async () => {
    const response = await login(supertest, app)
    expect(response).toBeTruthy()
    token = response
  })

  it('should respond with 401 for invalid login', async () => {
    const response = await loginInvalid(supertest, app)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid credentials')
  })

  it('should be able to add car', async () => {
    const st = supertest(app)
      .post('/cars')
      .attach('image', path.resolve(__dirname, '__MOCK__', 'picture.png'))
      .set({
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      })
    // @ts-expect-error delete req column
    delete jsonCar.id
    // @ts-expect-error delete req column
    delete jsonCar.image
    jsonCar.plate = faker.person.firstName().padStart(10, '0')
    for (const key in jsonCar) {
      // @ts-expect-error any
      const value = jsonCar[key]
      if (key !== 'image') {
        st.field(key, value)
      }
    }

    const response = await st

    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({
      message: 'Car created successfully',
      id: expect.any(Number)
    })
    id = response.body.id
  })

  it('should be able to get one car', async () => {
    const response = await supertest(app).get(`/cars/${id}`)
    expect(response.status).toBe(200)
  })

  it('should be able to update car', async () => {
    const response = await supertest(app)
      .patch(`/cars/${id}`)
      .set({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      })
      .send({
        image: 'https://res.cloudinary.com/dyrxqtvlr/image/upload/v1701997256/b1ziqervhrkmzq6pyc70.jpg'
      })
    expect(response.status).toBe(200)
  })

  it('should be able to delete car', async () => {
    const response = await supertest(app)
      .delete(`/cars/${id}`)
      .set({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      })
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      message: 'Car soft deleted successfully'
    })
  })

  it('should be able to filter cars', async () => {
    const response = await supertest(app)
      .get('/filtered-cars')
      .query({
        date: '2023-12-03',
        capacity: 2
      })
      .set({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      })
    expect(response.status).toBe(200)
  })

  it('should be able to login', async () => {
    const response = await loginSuperAdmin(supertest, app)
    expect(response).toBeTruthy()
    token = response
  })

  it('should be able to create admin', async () => {
    const loginResponse = await loginSuperAdmin(supertest, app)
    const { token } = loginResponse.body
    console.log('Token:', token)
    const st = supertest(app)
      .post('/createadmin')
      .set({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      })
      .send({
        name: faker.person.firstName().padStart(10, '0'),
        email: faker.internet.email(),
        password: faker.internet.password()
      })
    const response = await st
    console.log('Create Admin Response:', response.body)
    expect(response.status).toBe(201)
  })

  it('should be able to register', async () => {
    const st = supertest(app)
      .post('/register')
      .set({
        Accept: 'application/json'
      })
      .send({
        name: faker.person.firstName().padStart(10, '0'),
        email: faker.internet.email(),
        password: faker.internet.password()
      })
    const response = await st
    console.log('Create Admin Response:', response.body)
    expect(response.status).toBe(201)
  })
})
