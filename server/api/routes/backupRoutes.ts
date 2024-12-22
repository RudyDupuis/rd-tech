import express from 'express'
import path from 'path'
import { promisify } from 'util'
import { exec } from 'child_process'
import fs from 'fs'
import archiver from 'archiver'

const router = express.Router()

router.get('/', async (_, res) => {
  try {
    const backupDir = 'backups'
    const backupName = `backup_${new Date().toISOString().split('T')[0]}`

    const backupFilePath = path.join(backupDir, `${backupName}.sql`)

    const postgresCommand = `PGPASSWORD=${process.env.DB_PASS} pg_dump -h ${process.env.DB_HOST} -U ${process.env.DB_USER} -d ${process.env.DB_NAME} -f ${backupFilePath}`
    await promisify(exec)(postgresCommand)

    const zipFilePath = path.join(backupDir, `${backupName}.zip`)

    const output = fs.createWriteStream(zipFilePath)
    const archive = archiver('zip', { zlib: { level: 9 } })

    archive.pipe(output)
    archive.directory('uploads', false)
    archive.file(backupFilePath, { name: `${backupName}.sql` })

    await archive.finalize()

    res.json({
      downloadLink: `/api/${backupDir}/${backupName}.zip`
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erreur lors de la sauvegarde' })
  }
})

export default router
