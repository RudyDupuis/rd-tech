import { Request, Response } from 'express'
import ErrorHandler from '../../../utils/ErrorHandler'
import ProjectExperienceDto from '../../../models/experiences/projectExperience/ProjectExperienceDto'
import ProjectExperienceModel from '../../../models/experiences/projectExperience/ProjectExperienceModel'
import ProjectExperience from '../../../models/experiences/projectExperience/ProjectExperience'
import generateUniqueSlug from '~/server/utils/GenerateUniqueSlug'
import { isDefined, isFileObject } from '~/utils/type/TypeGuard'

export default async function createProjectExperienceController(
  req: Request,
  res: Response
): Promise<void> {
  const projectExperienceDto: ProjectExperienceDto = {
    title: req.body.title,
    startDate: req.body.startDate,
    shortDesc: req.body.shortDesc,
    slug: await generateUniqueSlug(req.body.title),
    endDate: req.body.endDate,
    thumbnailPath: isFileObject(req.files) ? req.files?.['thumbnail']?.[0]?.path : undefined,
    longDesc: req.body.longDesc,
    imagesPath: isFileObject(req.files)
      ? (req.files?.['images']?.map((file) => file.path) ?? [])
      : [],
    projectLink: req.body.projectLink,
    codeLink: req.body.codeLink,
    isFavorite: req.body.isFavorite
  }

  const hardSkillsIdsDto: string | undefined = req.body.hardSkillIds

  const hardSkillsIds = isDefined(hardSkillsIdsDto)
    ? hardSkillsIdsDto.split(',').map((id: string) => parseInt(id.trim(), 10))
    : []

  try {
    const projectExperience = await ProjectExperienceModel.create(
      ProjectExperience.fromDto(projectExperienceDto)
    )
    await projectExperience.addHardSkills(hardSkillsIds)
    res.status(201).json(projectExperience)
  } catch (error) {
    ErrorHandler(error, res)
  }
}
