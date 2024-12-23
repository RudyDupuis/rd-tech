import multer, { StorageEngine } from 'multer'
import { Request } from 'express'
import { randomUUID } from 'crypto'

const skillStorage: StorageEngine = multer.diskStorage({
  destination: (_: Request, file, cb) => {
    cb(null, 'uploads/skills')
  },
  filename: (_: Request, file, cb) => {
    const ext = file.originalname.split('.').pop()
    cb(null, `${randomUUID()}.${ext}`)
  }
})

const experienceStorage: StorageEngine = multer.diskStorage({
  destination: (_: Request, file, cb) => {
    cb(null, 'uploads/experiences')
  },
  filename: (_: Request, file, cb) => {
    const ext = file.originalname.split('.').pop()
    cb(null, `${randomUUID()}.${ext}`)
  }
})

export const skillUpload = multer({ storage: skillStorage })
export const experienceUpload = multer({ storage: experienceStorage })
