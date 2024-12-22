import { Request, Response } from 'express'
import ProjectExperienceModel from '../../../models/experiences/projectExperience/ProjectExperienceModel'
import HardSkillModel from '../../../models/skills/hardSkill/HardSkillModel'
import ErrorHandler from '../../../utils/ErrorHandler'
import ProjectExperience from '~/server/api/models/experiences/projectExperience/ProjectExperience'
import { isNull } from '~/utils/types/TypeGuard'

export default async function getProjectExperienceBySlugController(
  req: Request,
  res: Response
): Promise<void> {
  const { slug } = req.params

  try {
    const projectExperienceModel = await ProjectExperienceModel.findOne({
      where: { slug: slug },
      include: {
        model: HardSkillModel,
        as: 'hardSkills'
      }
    })

    if (isNull(projectExperienceModel)) {
      res.status(404).send('Projet inexistant')
      return
    }

    const projectExperience = ProjectExperience.fromModel(projectExperienceModel)
    const hardSkills = await projectExperienceModel.getHardSkills()
    const projectExperienceDto = ProjectExperience.toDto({ ...projectExperience, hardSkills })

    res.status(200).json(projectExperienceDto)
  } catch (error) {
    ErrorHandler(error, res)
  }
}
