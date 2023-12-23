/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const TOKEN_SECRET = 'kucing'
export function authenticateToken (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1] // Leave the Bearer

  if (!token) {
    return res.status(401).json({ message: 'Invalid Token' })
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    req.user = user
    next()
  })
}
export function isfulladmin (req: Request, res: Response, next: NextFunction) {
  const user = req.user as { role: string } | undefined

  if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
    return res
      .status(403)
      .json({
        message:
          'Forbidden - Only admins and Super Admin can perform this action'
      })
  }

  next()
}
export function isAdmin (req: Request, res: Response, next: NextFunction) {
  const user = req.user as { role: string } | undefined

  if (!user || user.role !== 'superadmin') {
    return res
      .status(403)
      .json({ message: 'Forbidden - Only admins can perform this action' })
  }

  next()
}
