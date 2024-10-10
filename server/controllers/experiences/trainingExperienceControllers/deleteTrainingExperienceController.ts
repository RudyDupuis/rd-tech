import { Request, Response } from 'express'
import TrainingExperienceModel from '../../../models/experiences/trainingExperience/TrainingExperienceModel'
import { isNotNull, isNull } from '../../../shared/utils/TypeGuard'
import DeleteImageHandler from '../../../shared/utils/controllers/DeleteImageHandler'
import ErrorHandler from '../../../shared/utils/controllers/ErrorHandler'

export default async function deleteTrainingExperienceController(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params

  try {
    const trainingExperienceModel = await TrainingExperienceModel.findByPk(id)

    if (isNull(trainingExperienceModel)) {
      res.status(404).send('TrainingExperience inexistant')
      return
    }

    if (isNotNull(trainingExperienceModel.thumbnailPath)) {
      DeleteImageHandler(trainingExperienceModel.thumbnailPath, res)
    }

    await trainingExperienceModel.destroy()
    res.status(204).send()
  } catch (error) {
    ErrorHandler(error, res)
  }
}
