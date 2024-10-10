import { Request, Response } from 'express'
import SoftSkillModel from '../../../models/skills/softSkill/SoftSkillModel'
import ErrorHandler from '../../../shared/utils/controllers/ErrorHandler'
import SoftSkill from '~/server/models/skills/softSkill/SoftSkill'

export default async function getAllSoftSkillsController(_: Request, res: Response): Promise<void> {
  try {
    const softSkillModels = await SoftSkillModel.findAll()

    const softSkillDtos = softSkillModels.map((softSkillModel) => {
      const softSkill = SoftSkill.fromModel(softSkillModel)
      return SoftSkill.toDto(softSkill)
    })
    res.status(200).json(softSkillDtos)
  } catch (error) {
    ErrorHandler(error, res)
  }
}
