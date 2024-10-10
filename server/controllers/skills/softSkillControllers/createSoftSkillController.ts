import { Request, Response } from 'express'
import SoftSkillDto from '../../../models/skills/softSkill/SoftSkillDto'
import SoftSkillModel from '../../../models/skills/softSkill/SoftSkillModel'
import SoftSkill from '../../../models/skills/softSkill/SoftSkill'
import ErrorHandler from '../../../utils/ErrorHandler'
import { isUndefined } from '~/utils/type/TypeGuard'

export default async function createSoftSkillController(
  req: Request,
  res: Response
): Promise<void> {
  if (isUndefined(req.file?.path)) {
    res.status(400).json({ error: 'Image manquante' })
    return
  }

  const softSkillDto: SoftSkillDto = {
    name: req.body.name,
    svgPath: req.file.path
  }

  try {
    const softSkill = await SoftSkillModel.create(SoftSkill.toDto(softSkillDto))
    res.status(201).json(softSkill)
  } catch (error) {
    ErrorHandler(error, res)
  }
}
