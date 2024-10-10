import { Request, Response } from 'express'
import HardSkillModel from '../../../models/skills/hardSkill/HardSkillModel'
import ErrorHandler from '../../../utils/ErrorHandler'
import HardSkill from '~/server/models/skills/hardSkill/HardSkill'

export default async function getAllHardSkillsController(_: Request, res: Response): Promise<void> {
  try {
    const hardSkillModels = await HardSkillModel.findAll()

    const hardSkillDtos = hardSkillModels.map((hardSkillModel) => {
      const hardSkill = HardSkill.fromModel(hardSkillModel)
      return HardSkill.toDto(hardSkill)
    })
    res.status(200).json(hardSkillDtos)
  } catch (error) {
    ErrorHandler(error, res)
  }
}
