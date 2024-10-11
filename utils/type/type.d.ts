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

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void
  }
}
