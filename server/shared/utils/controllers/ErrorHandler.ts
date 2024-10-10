import { Response } from 'express'

export default function ErrorHandler(error: unknown, res: Response) {
  const message = error instanceof Error ? error.message : 'Erreur inattendue'
  res.status(500).json({
    error: message
  })
}
