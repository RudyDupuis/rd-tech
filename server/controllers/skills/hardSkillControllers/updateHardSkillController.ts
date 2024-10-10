import { Request, Response } from 'express'
import HardSkillDto from '../../../models/skills/hardSkill/HardSkillDto'
import HardSkill from '../../../models/skills/hardSkill/HardSkill'
import HardSkillModel from '../../../models/skills/hardSkill/HardSkillModel'
import { isDefined, isNull } from '../../../shared/utils/TypeGuard'
import DeleteImageHandler from '../../../shared/utils/controllers/DeleteImageHandler'
import ErrorHandler from '../../../shared/utils/controllers/ErrorHandler'

export default async function updateHardSkillController(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params
  const newSvgPath = req.file?.path

  const newHardSkillDto: HardSkillDto = {
    name: req.body.name,
    svgPath: newSvgPath || '',
    mastery: req.body.mastery
  }

  const newHardSkill = HardSkill.toDto(newHardSkillDto)

  try {
    const hardSkillModel = await HardSkillModel.findByPk(id)

    if (isNull(hardSkillModel)) {
      res.status(404).send('HardSkill inexistant')
      return
    }

    if (isDefined(newSvgPath)) {
      DeleteImageHandler(hardSkillModel.svgPath, res)
    }

    hardSkillModel.name = newHardSkill.name
    hardSkillModel.mastery = newHardSkill.mastery
    hardSkillModel.svgPath = newSvgPath || hardSkillModel.svgPath

    await hardSkillModel.save()
    res.status(200).json(hardSkillModel)
  } catch (error) {
    ErrorHandler(error, res)
  }
}
