import type supertest from 'supertest'
import type { Application } from 'express'

export async function login (
  st: typeof supertest,
  app: Application
): Promise<string> {
  const response = await st(app).post('/login').send({
    email: 'admin@admin',
    password: 'admin'
  })
  return response.body.token
}
export async function createAdmin (supertest: any, app: any, adminData: any): Promise<any> {
  const response = await supertest(app)
    .post('/createadmin') // Replace with the actual endpoint for creating an admin
    .send(adminData)
  return response
}

export async function loginInvalid (supertest: any, app: any): Promise<any> {
  const response = await supertest(app)
    .post('/login')
    .send({ email: 'invalid@example.com', password: 'invalidpassword' })
  return response
}

export async function loginSuperAdmin (supertest: any, app: any): Promise<any> {
  const response = await supertest(app)
    .post('/login')
    .send({ email: 'superadmin@admin', password: 'superadmin' })
  return response
}

export async function register (
  supertest: any,
  app: any,
  userData: any
): Promise<any> {
  return supertest(app)
    .post('/register')
    .send(userData)
}

// export async function googleLogin (
//   st: typeof supertest,
//   app: Application,
//   code: string
// ): Promise<supertest.Response> {
//   const response = await st(app)
//     .post('/auth/google') // Replace with your actual endpoint for Google login
//     .send({ code })
//   return response
// }
