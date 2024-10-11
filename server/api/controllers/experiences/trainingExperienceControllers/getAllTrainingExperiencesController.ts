import { Request, Response } from 'express'
import TrainingExperienceModel from '../../../models/experiences/trainingExperience/TrainingExperienceModel'
import ErrorHandler from '../../../utils/ErrorHandler'
import TrainingExperience from '~/server/api/models/experiences/trainingExperience/TrainingExperience'

export default async function getAllTrainingExperiencesController(
  _: Request,
  res: Response
): Promise<void> {
  try {
    const trainingExperienceModels = await TrainingExperienceModel.findAll()

    const trainingExperienceDtos = trainingExperienceModels.map((trainingExperienceModel) => {
      const trainingExperience = TrainingExperience.fromModel(trainingExperienceModel)
      return TrainingExperience.toDto(trainingExperience)
    })

    res.status(200).json(trainingExperienceDtos)
  } catch (error) {
    ErrorHandler(error, res)
  }
}
