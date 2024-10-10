import type { Multer } from 'multer'

declare global {
  namespace Express {
    interface Request {
      userId?: string
      files?: {
        [fieldname: string]: Multer.File[]
      }
    }
  }
}
