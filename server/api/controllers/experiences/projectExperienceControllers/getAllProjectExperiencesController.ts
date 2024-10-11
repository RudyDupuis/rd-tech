import { Request, Response } from 'express'
import ErrorHandler from '../../../utils/ErrorHandler'
import ProjectExperienceModel from '../../../models/experiences/projectExperience/ProjectExperienceModel'
import HardSkillModel from '../../../models/skills/hardSkill/HardSkillModel'
import ProjectExperience from '~/server/api/models/experiences/projectExperience/ProjectExperience'

export default async function getAllProjectExperiencesController(
  _: Request,
  res: Response
): Promise<void> {
  try {
    const projectExperienceModels = await ProjectExperienceModel.findAll({
      include: {
        model: HardSkillModel,
        as: 'hardSkills'
      }
    })

    const projectExperienceDtos = await Promise.all(
      projectExperienceModels.map(async (projectExperienceModel) => {
        const projectExperience = ProjectExperience.fromModel(projectExperienceModel)
        const hardSkills = await projectExperienceModel.getHardSkills()

        return ProjectExperience.toDto({ ...projectExperience, hardSkills })
      })
    )

    res.status(200).json(projectExperienceDtos)
  } catch (error) {
    ErrorHandler(error, res)
  }
}
