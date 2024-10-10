import { Request, Response } from 'express'
import HardSkillDto from '../../../models/skills/hardSkill/HardSkillDto'
import HardSkillModel from '../../../models/skills/hardSkill/HardSkillModel'
import HardSkill from '../../../models/skills/hardSkill/HardSkill'
import ErrorHandler from '../../../utils/ErrorHandler'
import { isUndefined } from '~/utils/type/TypeGuard'

export default async function createHardSkillController(
  req: Request,
  res: Response
): Promise<void> {
  if (isUndefined(req.file?.path)) {
    res.status(400).json({ error: 'Image manquante' })
    return
  }

  const hardSkillDto: HardSkillDto = {
    name: req.body.name,
    svgPath: req.file.path,
    mastery: req.body.mastery
  }

  try {
    const hardSkillModel = await HardSkillModel.create(HardSkill.toDto(hardSkillDto))
    res.status(201).json(hardSkillModel)
  } catch (error) {
    ErrorHandler(error, res)
  }
}
