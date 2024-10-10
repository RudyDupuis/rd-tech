import { Request, Response } from 'express'
import { isNotNull, isNull } from '../../../shared/utils/TypeGuard'
import ErrorHandler from '../../../shared/utils/controllers/ErrorHandler'
import DeleteImageHandler from '../../../shared/utils/controllers/DeleteImageHandler'
import JobExperienceModel from '../../../models/experiences/jobExperience/JobExperienceModel'
export default async function deleteJobExperienceController(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params

  try {
    const jobExperienceModel = await JobExperienceModel.findByPk(id)

    if (isNull(jobExperienceModel)) {
      res.status(404).send('JobExperience inexistant')
      return
    }

    if (isNotNull(jobExperienceModel.thumbnailPath)) {
      DeleteImageHandler(jobExperienceModel.thumbnailPath, res)
    }

    await jobExperienceModel.destroy()
    res.status(204).send()
  } catch (error) {
    ErrorHandler(error, res)
  }
}
