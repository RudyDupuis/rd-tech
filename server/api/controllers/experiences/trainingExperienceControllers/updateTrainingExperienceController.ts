import { Request, Response } from 'express'
import TrainingExperience from '../../../models/experiences/trainingExperience/TrainingExperience'
import TrainingExperienceDto from '../../../models/experiences/trainingExperience/TrainingExperienceDto'
import TrainingExperienceModel from '../../../models/experiences/trainingExperience/TrainingExperienceModel'
import DeleteImageHandler from '../../../utils/DeleteImageHandler'
import ErrorHandler from '../../../utils/ErrorHandler'
import { isDefined, isNotNull, isNull } from '~/utils/type/TypeGuard'

export default async function updateTrainingExperienceController(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params
  const newImgPath = req.file?.path

  const newTrainingExperienceDto: TrainingExperienceDto = {
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    shortDesc: req.body.shortDesc,
    thumbnailPath: newImgPath
  }

  const newTrainingExperience = TrainingExperience.fromDto(newTrainingExperienceDto)

  try {
    const trainingExperienceModel = await TrainingExperienceModel.findByPk(id)

    if (isNull(trainingExperienceModel)) {
      res.status(404).send('TrainingExperience inexistant')
      return
    }

    if (isDefined(newImgPath) && isNotNull(trainingExperienceModel.thumbnailPath)) {
      DeleteImageHandler(trainingExperienceModel.thumbnailPath, res)
    }

    trainingExperienceModel.title = newTrainingExperience.title
    trainingExperienceModel.startDate = newTrainingExperience.startDate
    trainingExperienceModel.endDate = isDefined(newTrainingExperience.endDate)
      ? newTrainingExperience.endDate
      : null
    trainingExperienceModel.shortDesc = newTrainingExperience.shortDesc
    trainingExperienceModel.thumbnailPath = newImgPath || trainingExperienceModel.thumbnailPath

    await trainingExperienceModel.save()
    res.status(200).json(trainingExperienceModel)
  } catch (error) {
    ErrorHandler(error, res)
  }
}
