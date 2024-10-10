import { Request, Response } from 'express'
import ProjectExperienceDto from '../../../models/experiences/projectExperience/ProjectExperienceDto'
import { isDefined, isNull } from '../../../shared/utils/TypeGuard'
import ProjectExperienceModel from '../../../models/experiences/projectExperience/ProjectExperienceModel'
import DeleteImageHandler from '../../../shared/utils/controllers/DeleteImageHandler'
import ErrorHandler from '../../../shared/utils/controllers/ErrorHandler'
import ProjectExperience from '../../../models/experiences/projectExperience/ProjectExperience'
import { isNotNull } from '~/utils/TypeGuard'
import generateUniqueSlug from '~/server/shared/utils/controllers/GenerateUniqueSlug'

export default async function updateProjectExperienceController(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params
  const newThumbnailPath = req.files?.['thumbnail']?.[0]?.path
  const newImagesPath = req.files?.['images']?.map((file) => file.path) ?? []

  const newProjectExperienceDto: ProjectExperienceDto = {
    title: req.body.title,
    startDate: req.body.startDate,
    shortDesc: req.body.shortDesc,
    slug: await generateUniqueSlug(req.body.title),
    endDate: req.body.endDate,
    thumbnailPath: newThumbnailPath,
    longDesc: req.body.longDesc,
    imagesPath: newImagesPath,
    projectLink: req.body.projectLink,
    codeLink: req.body.codeLink,
    isFavorite: req.body.isFavorite
  }

  const newProjectExperience = ProjectExperience.fromDto(newProjectExperienceDto)

  const hardSkillsIdsDto: string | undefined = req.body.hardSkillIds

  const hardSkillsIds = isDefined(hardSkillsIdsDto)
    ? hardSkillsIdsDto.split(',').map((id: string) => parseInt(id.trim(), 10))
    : []

  try {
    const projectExperienceModel = await ProjectExperienceModel.findByPk(id)

    if (isNull(projectExperienceModel)) {
      res.status(404).send('ProjectExperience inexistant')
      return
    }

    if (isDefined(newThumbnailPath) && isNotNull(projectExperienceModel.thumbnailPath)) {
      DeleteImageHandler(projectExperienceModel.thumbnailPath, res)
    }

    projectExperienceModel.title = newProjectExperience.title
    projectExperienceModel.startDate = newProjectExperience.startDate
    projectExperienceModel.endDate = isDefined(newProjectExperience.endDate)
      ? newProjectExperience.endDate
      : null
    projectExperienceModel.shortDesc = newProjectExperience.shortDesc
    projectExperienceModel.thumbnailPath = newThumbnailPath || projectExperienceModel.thumbnailPath
    projectExperienceModel.longDesc = newProjectExperience.longDesc
    projectExperienceModel.imagesPath = isNotNull(projectExperienceModel.imagesPath)
      ? projectExperienceModel.imagesPath.concat(newImagesPath)
      : null
    projectExperienceModel.projectLink = isDefined(newProjectExperience.projectLink)
      ? newProjectExperience.projectLink
      : null
    projectExperienceModel.codeLink = isDefined(newProjectExperience.codeLink)
      ? newProjectExperience.codeLink
      : null
    projectExperienceModel.isFavorite = newProjectExperience.isFavorite

    await projectExperienceModel.save()
    await projectExperienceModel.setHardSkills(hardSkillsIds)
    res.status(200).json(projectExperienceModel)
  } catch (error) {
    ErrorHandler(error, res)
  }
}
