import { Response, NextFunction, Request } from 'express'
import jwt from 'jsonwebtoken'
import env from '../config/envConfig'
import { isUndefined } from '~/utils/type/TypeGuard'

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  if (isUndefined(env.JWT_SECRET)) {
    res.status(500).json({ message: "Configuration manquante du serveur: 'JWT_SECRET" })
    return
  }

  const authHeader = req.headers.authorization

  if (isUndefined(authHeader)) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const decodedToken = jwt.verify(token, env.JWT_SECRET) as {
      userId?: string
    }

    if (isUndefined(decodedToken.userId)) {
      res.status(401).json({ message: 'Invalid token' })
      return
    }

    req.userId = decodedToken.userId
    next()
  } catch {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
}
