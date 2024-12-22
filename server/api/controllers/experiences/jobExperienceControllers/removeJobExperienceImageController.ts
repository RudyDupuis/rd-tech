import { Request, Response } from 'express'
import ErrorHandler from '../../../utils/ErrorHandler'
import DeleteImageHandler from '../../../utils/DeleteImageHandler'
import JobExperienceModel from '../../../models/experiences/jobExperience/JobExperienceModel'
import { isNotNull, isNull } from '~/utils/types/TypeGuard'

export default async function removeJobExperienceImageController(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params
  const { imagePath } = req.body

  try {
    const jobExperienceModel = await JobExperienceModel.findByPk(id)

    if (isNull(jobExperienceModel)) {
      res.status(404).send('JobExperience inexistant')
      return
    }

    if (
      imagePath === jobExperienceModel.thumbnailPath &&
      isNotNull(jobExperienceModel.thumbnailPath)
    ) {
      DeleteImageHandler(jobExperienceModel.thumbnailPath, res)

      jobExperienceModel.thumbnailPath = null
      await jobExperienceModel.save()
      res.status(200).json(jobExperienceModel)
    } else {
      res.status(404).send("Le chemin de l'image ne correspond pas")
    }
  } catch (error) {
    ErrorHandler(error, res)
  }
}
