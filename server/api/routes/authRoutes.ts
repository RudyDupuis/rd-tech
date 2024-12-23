import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import { isUndefined } from '~/utils/types/TypeGuard'
import { authenticateToken } from '../middleswares/authMiddleware'

interface AuthRequestBody {
  username: string | undefined
  password: string | undefined
}

const router = express.Router()

const upload = multer({ dest: 'uploads/' })

router.post(
  '/',
  upload.none(),
  async (req: Request<object, object, AuthRequestBody>, res: Response): Promise<void> => {
    const { username, password } = req.body

    if (isUndefined(username) || isUndefined(password)) {
      res.status(400).json({ message: "Nom d'utilisateur ou mot de passe manquant" })
      return
    }

    if (username !== process.env.USERNAME || password !== process.env.PASSWORD) {
      res.status(401).json({ message: "Nom d'utilisateur ou mot de passe invalide" })
      return
    }

    if (isUndefined(process.env.JWT_SECRET)) {
      res.status(500).json({ message: "Configuration manquante du serveur: 'JWT_SECRET" })
      return
    }

    try {
      const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      })

      res.json({ token })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Erreur interne du serveur' })
    }
  }
)

router.get('/try-token', authenticateToken, async (_: Request, res: Response): Promise<void> => {
  res.json({ message: 'Token valide' })
})

export default router
