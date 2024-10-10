import { Request, Response } from 'express'
import SoftSkill from '../../../models/skills/softSkill/SoftSkill'
import SoftSkillDto from '../../../models/skills/softSkill/SoftSkillDto'
import SoftSkillModel from '../../../models/skills/softSkill/SoftSkillModel'
import { isDefined, isNull } from '../../../shared/utils/TypeGuard'
import DeleteImageHandler from '../../../shared/utils/controllers/DeleteImageHandler'
import ErrorHandler from '../../../shared/utils/controllers/ErrorHandler'

export default async function updateSoftSkillController(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params
  const newSvgPath = req.file?.path

  const newSoftSkillDto: SoftSkillDto = {
    name: req.body.name,
    svgPath: newSvgPath || ''
  }

  const newHardSkill = SoftSkill.toDto(newSoftSkillDto)

  try {
    const softSkillModel = await SoftSkillModel.findByPk(id)

    if (isNull(softSkillModel)) {
      res.status(404).send('SoftSkill inexistant')
      return
    }

    if (isDefined(newSvgPath)) {
      DeleteImageHandler(softSkillModel.svgPath, res)
    }

    softSkillModel.name = newHardSkill.name
    softSkillModel.svgPath = newSvgPath || softSkillModel.svgPath

    await softSkillModel.save()
    res.status(200).json(softSkillModel)
  } catch (error) {
    ErrorHandler(error, res)
  }
}
