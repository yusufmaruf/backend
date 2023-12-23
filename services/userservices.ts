/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// user.service.ts
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserRepository } from '../repositories/user'
import { type Users } from '../models/users'
import { TOKEN_SECRET } from '../utils/auth'

export class UserService {
  UserRepository: UserRepository

  constructor () {
    this.UserRepository = new UserRepository()
  }

  async loginUser (email: string, password: string): Promise<string | undefined> {
    const user = await this.UserRepository.findByEmail(email)

    if (!user) {
      return undefined // User not found
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return undefined // Wrong credentials
    }

    const token = jwt.sign({ email: user.email, id: user.id, role: user.role }, TOKEN_SECRET, {
      expiresIn: '1h'
    })

    return token
  }

  async registerUser (userData: Users): Promise<Users | undefined> {
    const existingUser = await this.UserRepository.findByEmail(userData.email)

    if (existingUser) {
      return undefined // Email already registered
    }

    return await this.UserRepository.createUser(userData)
  }
}
