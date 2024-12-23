import { Request, Response } from 'express'
import TrainingExperienceModel from '../../../models/experiences/trainingExperience/TrainingExperienceModel'
import DeleteImageHandler from '../../../utils/DeleteImageHandler'
import ErrorHandler from '../../../utils/ErrorHandler'
import { isNotNull, isNull } from '~/utils/types/TypeGuard'

export default async function removeTrainingExperienceImageController(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params
  const { imagePath } = req.body

  try {
    const trainingExperienceModel = await TrainingExperienceModel.findByPk(id)

    if (isNull(trainingExperienceModel)) {
      res.status(404).send('TrainingExperience inexistant')
      return
    }

    if (
      imagePath === trainingExperienceModel.thumbnailPath &&
      isNotNull(trainingExperienceModel.thumbnailPath)
    ) {
      DeleteImageHandler(trainingExperienceModel.thumbnailPath, res)

      trainingExperienceModel.thumbnailPath = null
      await trainingExperienceModel.save()
      res.status(200).json(trainingExperienceModel)
    } else {
      res.status(404).send("Le chemin de l'image ne correspond pas")
    }
  } catch (error) {
    ErrorHandler(error, res)
  }
}
