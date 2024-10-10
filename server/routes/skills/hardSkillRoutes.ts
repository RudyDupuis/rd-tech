import express from 'express'
import { skillUpload } from '../../middleswares/uploadMiddleware'
import { authenticateToken } from '../../middleswares/authMiddleware'
import createHardSkillController from '../../controllers/skills/hardSkillControllers/createHardSkillController'
import getAllHardSkillsController from '../../controllers/skills/hardSkillControllers/getAllHardSkillsController'
import deleteHardSkillController from '../../controllers/skills/hardSkillControllers/deleteHardSkillController'
import updateHardSkillController from '../../controllers/skills/hardSkillControllers/updateHardSkillController'

const router = express.Router()

router.post('/', skillUpload.single('svg'), authenticateToken, createHardSkillController)
router.get('/', getAllHardSkillsController)
router.delete('/:id', authenticateToken, deleteHardSkillController)
router.put('/:id', skillUpload.single('svg'), authenticateToken, updateHardSkillController)

export default router
