import express from 'express'
import { experienceUpload } from '../../middleswares/uploadMiddleware'
import { authenticateToken } from '../../middleswares/authMiddleware'
import createTrainingExperienceController from '../../controllers/experiences/trainingExperienceControllers/createTrainingExperienceController'
import getAllTrainingExperiencesController from '../../controllers/experiences/trainingExperienceControllers/getAllTrainingExperiencesController'
import deleteTrainingExperienceController from '../../controllers/experiences/trainingExperienceControllers/deleteTrainingExperienceController'
import updateTrainingExperienceController from '../../controllers/experiences/trainingExperienceControllers/updateTrainingExperienceController'
import removeTrainingExperienceImageController from '../../controllers/experiences/trainingExperienceControllers/removeTrainingExperienceController'

const router = express.Router()

router.post(
  '/',
  experienceUpload.single('thumbnail'),
  authenticateToken,
  createTrainingExperienceController
)
router.get('/', getAllTrainingExperiencesController)
router.delete('/:id', authenticateToken, deleteTrainingExperienceController)
router.put(
  '/:id',
  experienceUpload.single('thumbnail'),
  authenticateToken,
  updateTrainingExperienceController
)
router.post(
  '/remove-image/:id',
  experienceUpload.none(),
  authenticateToken,
  removeTrainingExperienceImageController
)

export default router
