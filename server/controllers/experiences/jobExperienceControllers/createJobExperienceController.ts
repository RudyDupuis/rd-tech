import { Request, Response } from 'express'
import ErrorHandler from '../../../shared/utils/controllers/ErrorHandler'
import { JobExperienceDto } from '../../../models/experiences/jobExperience/JobExperienceDto'
import JobExperienceModel from '../../../models/experiences/jobExperience/JobExperienceModel'
import JobExperience from '~/server/models/experiences/jobExperience/JobExperience'

export default async function createJobExperienceController(
  req: Request,
  res: Response
): Promise<void> {
  const jobExperienceDto: JobExperienceDto = {
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    shortDesc: req.body.shortDesc,
    thumbnailPath: req.file?.path
  }

  try {
    const jobExperience = await JobExperienceModel.create(JobExperience.fromDto(jobExperienceDto))
    res.status(201).json(jobExperience)
  } catch (error) {
    ErrorHandler(error, res)
  }
}
