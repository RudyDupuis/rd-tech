import express from 'express'
import { skillUpload } from '../../middleswares/uploadMiddleware'
import { authenticateToken } from '../../middleswares/authMiddleware'
import createSoftSkillController from '../../controllers/skills/softSkillControllers/createSoftSkillController'
import getAllSoftSkillsController from '../../controllers/skills/softSkillControllers/getAllSoftSkillsController'
import deleteSoftSkillController from '../../controllers/skills/softSkillControllers/deleteSoftSkillController'
import updateSoftSkillController from '../../controllers/skills/softSkillControllers/updateSoftSkillController'

const router = express.Router()

router.post('/', skillUpload.single('svg'), authenticateToken, createSoftSkillController)
router.get('/', getAllSoftSkillsController)
router.delete('/:id', authenticateToken, deleteSoftSkillController)
router.put('/:id', skillUpload.single('svg'), authenticateToken, updateSoftSkillController)

export default router
