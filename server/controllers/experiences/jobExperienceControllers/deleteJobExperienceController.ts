import { Request, Response } from 'express'
import ErrorHandler from '../../../utils/ErrorHandler'
import DeleteImageHandler from '../../../utils/DeleteImageHandler'
import JobExperienceModel from '../../../models/experiences/jobExperience/JobExperienceModel'
import { isNotNull, isNull } from '~/utils/type/TypeGuard'
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
