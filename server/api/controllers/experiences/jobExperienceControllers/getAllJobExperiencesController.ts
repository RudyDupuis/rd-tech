import { Request, Response } from 'express'
import ErrorHandler from '../../../utils/ErrorHandler'
import JobExperienceModel from '../../../models/experiences/jobExperience/JobExperienceModel'
import JobExperience from '~/server/api/models/experiences/jobExperience/JobExperience'

export default async function getAllJobExperiencesController(
  _: Request,
  res: Response
): Promise<void> {
  try {
    const jobExperienceModels = await JobExperienceModel.findAll()

    const jobExperienceDtos = jobExperienceModels.map((jobExperienceModel) => {
      const jobExperience = JobExperience.fromModel(jobExperienceModel)
      return JobExperience.toDto(jobExperience)
    })

    res.status(200).json(jobExperienceDtos)
  } catch (error) {
    ErrorHandler(error, res)
  }
}
