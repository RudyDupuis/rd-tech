import { Response } from 'express'
import fs from 'fs'
import { isNotNull } from '../TypeGuard'

export default function DeleteImageHandler(imagePath: string, res: Response) {
  fs.unlink(imagePath, (err) => {
    if (isNotNull(err)) {
      return res.status(500).send("Erreur lors de la suppression de l'image")
    }
  })
}
