import { Request, Response } from 'express'
import ProjectExperienceModel from '../../../models/experiences/projectExperience/ProjectExperienceModel'
import DeleteImageHandler from '../../../utils/DeleteImageHandler'
import ErrorHandler from '../../../utils/ErrorHandler'
import { isNotNull, isNull } from '~/utils/type/TypeGuard'

export default async function removeProjectExperienceImageController(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params
  const { imagePath } = req.body

  try {
    const projectExperienceModel = await ProjectExperienceModel.findByPk(id)

    if (isNull(projectExperienceModel)) {
      res.status(404).send('ProjectExperience inexistant')
      return
    }

    if (
      imagePath === projectExperienceModel.thumbnailPath &&
      isNotNull(projectExperienceModel.thumbnailPath)
    ) {
      DeleteImageHandler(projectExperienceModel.thumbnailPath, res)
      projectExperienceModel.thumbnailPath = null
    } else if (
      isNotNull(projectExperienceModel.imagesPath) &&
      projectExperienceModel.imagesPath.includes(imagePath)
    ) {
      DeleteImageHandler(imagePath, res)
      projectExperienceModel.imagesPath = projectExperienceModel.imagesPath.filter(
        (path) => path !== imagePath
      )
    } else {
      res.status(404).send("Le chemin de l'image ne correspond pas")
      return
    }

    await projectExperienceModel.save()
    res.status(200).json(projectExperienceModel)
  } catch (error) {
    ErrorHandler(error, res)
  }
}
