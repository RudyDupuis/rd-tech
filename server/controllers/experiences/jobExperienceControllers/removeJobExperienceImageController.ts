import { Request, Response } from 'express'
import { isNotNull, isNull } from '../../../shared/utils/TypeGuard'
import ErrorHandler from '../../../shared/utils/controllers/ErrorHandler'
import DeleteImageHandler from '../../../shared/utils/controllers/DeleteImageHandler'
import JobExperienceModel from '../../../models/experiences/jobExperience/JobExperienceModel'

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
