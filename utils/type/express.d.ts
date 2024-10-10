declare global {
  namespace Express {
    interface Request {
      userId?: string
      files?: {
        [fieldname: string]: Express.Multer.File[]
      }
    }
  }
}
