import { Request, Response } from 'express'
import ProjectExperienceModel from '../../../models/experiences/projectExperience/ProjectExperienceModel'
import { isNotNull, isNull } from '../../../shared/utils/TypeGuard'
import DeleteImageHandler from '../../../shared/utils/controllers/DeleteImageHandler'
import ErrorHandler from '../../../shared/utils/controllers/ErrorHandler'

export default async function deleteProjectExperienceController(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params

  try {
    const projectExperienceModel = await ProjectExperienceModel.findByPk(id)

    if (isNull(projectExperienceModel)) {
      res.status(404).send('ProjectExperience inexistant')
      return
    }

    if (isNotNull(projectExperienceModel.thumbnailPath)) {
      DeleteImageHandler(projectExperienceModel.thumbnailPath, res)
    }

    if (isNotNull(projectExperienceModel.imagesPath)) {
      projectExperienceModel.imagesPath.forEach((imagePath: string) => {
        DeleteImageHandler(imagePath, res)
      })
    }

    await projectExperienceModel.setHardSkills([])
    await projectExperienceModel.destroy()
    res.status(204).send()
  } catch (error) {
    ErrorHandler(error, res)
  }
}
