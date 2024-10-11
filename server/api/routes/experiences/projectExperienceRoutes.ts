import express from 'express'
import { experienceUpload } from '../../middleswares/uploadMiddleware'
import { authenticateToken } from '../../middleswares/authMiddleware'
import createProjectExperienceController from '../../controllers/experiences/projectExperienceControllers/createProjectExperienceController'
import getAllProjectExperiencesController from '../../controllers/experiences/projectExperienceControllers/getAllProjectExperiencesController'
import deleteProjectExperienceController from '../../controllers/experiences/projectExperienceControllers/deleteProjectExperienceController'
import updateProjectExperienceController from '../../controllers/experiences/projectExperienceControllers/updateProjectExperienceController'
import removeProjectExperienceImageController from '../../controllers/experiences/projectExperienceControllers/removeProjectExperienceImageController'
import getProjectExperienceBySlugController from '../../controllers/experiences/projectExperienceControllers/getProjectExperienceBySlugController'
import getAllFavoriteProjectExperiencesController from '../../controllers/experiences/projectExperienceControllers/getAllFavoriteProjectExperiencesController'

const router = express.Router()

router.post(
  '/',
  experienceUpload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]),
  authenticateToken,
  createProjectExperienceController
)
router.get('/', getAllProjectExperiencesController)
router.delete('/:id', authenticateToken, deleteProjectExperienceController)
router.put(
  '/:id',
  experienceUpload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]),
  authenticateToken,
  updateProjectExperienceController
)
router.post(
  '/remove-image/:id',
  experienceUpload.none(),
  authenticateToken,
  removeProjectExperienceImageController
)
router.get('/favorites', getAllFavoriteProjectExperiencesController)
router.get('/:slug', getProjectExperienceBySlugController)

export default router
