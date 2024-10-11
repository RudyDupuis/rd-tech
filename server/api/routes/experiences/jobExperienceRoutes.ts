import express from 'express'
import { experienceUpload } from '../../middleswares/uploadMiddleware'
import { authenticateToken } from '../../middleswares/authMiddleware'
import createJobExperienceController from '../../controllers/experiences/jobExperienceControllers/createJobExperienceController'
import getAllJobExperiencesController from '../../controllers/experiences/jobExperienceControllers/getAllJobExperiencesController'
import deleteJobExperienceController from '../../controllers/experiences/jobExperienceControllers/deleteJobExperienceController'
import updateJobExperienceController from '../../controllers/experiences/jobExperienceControllers/updateJobExperienceController'
import removeJobExperienceImageController from '../../controllers/experiences/jobExperienceControllers/removeJobExperienceImageController'

const router = express.Router()

router.post(
  '/',
  experienceUpload.single('thumbnail'),
  authenticateToken,
  createJobExperienceController
)
router.get('/', getAllJobExperiencesController)
router.delete('/:id', authenticateToken, deleteJobExperienceController)
router.put(
  '/:id',
  experienceUpload.single('thumbnail'),
  authenticateToken,
  updateJobExperienceController
)
router.post(
  '/remove-image/:id',
  experienceUpload.none(),
  authenticateToken,
  removeJobExperienceImageController
)

export default router
