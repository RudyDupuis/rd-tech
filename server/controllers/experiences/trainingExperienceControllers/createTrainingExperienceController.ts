import { Request, Response } from 'express'
import TrainingExperienceDto from '../../../models/experiences/trainingExperience/TrainingExperienceDto'
import TrainingExperienceModel from '../../../models/experiences/trainingExperience/TrainingExperienceModel'
import TrainingExperience from '../../../models/experiences/trainingExperience/TrainingExperience'
import ErrorHandler from '../../../shared/utils/controllers/ErrorHandler'

export default async function createTrainingExperienceController(
  req: Request,
  res: Response
): Promise<void> {
  const trainingExperienceDto: TrainingExperienceDto = {
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    shortDesc: req.body.shortDesc,
    thumbnailPath: req.file?.path
  }

  try {
    const trainingExperienceModel = await TrainingExperienceModel.create(
      TrainingExperience.fromDto(trainingExperienceDto)
    )
    res.status(201).json(trainingExperienceModel)
  } catch (error) {
    ErrorHandler(error, res)
  }
}
