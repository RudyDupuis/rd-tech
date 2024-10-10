import { Request, Response } from 'express'
import HardSkillModel from '../../../models/skills/hardSkill/HardSkillModel'
import { isNull } from '../../../shared/utils/TypeGuard'
import DeleteImageHandler from '../../../shared/utils/controllers/DeleteImageHandler'
import ErrorHandler from '../../../shared/utils/controllers/ErrorHandler'

export default async function deleteHardSkillController(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params

  try {
    const hardSkillModel = await HardSkillModel.findByPk(id)

    if (isNull(hardSkillModel)) {
      res.status(404).send('HardSkill inexistant')
      return
    }

    DeleteImageHandler(hardSkillModel.svgPath, res)
    await hardSkillModel.destroy()
    res.status(204).send()
  } catch (error) {
    ErrorHandler(error, res)
  }
}
