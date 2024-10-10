import { Request, Response } from 'express'
import SoftSkillModel from '../../../models/skills/softSkill/SoftSkillModel'
import { isNull } from '../../../shared/utils/TypeGuard'
import DeleteImageHandler from '../../../shared/utils/controllers/DeleteImageHandler'
import ErrorHandler from '../../../shared/utils/controllers/ErrorHandler'

export default async function deleteSoftSkillController(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params

  try {
    const softSkillModel = await SoftSkillModel.findByPk(id)

    if (isNull(softSkillModel)) {
      res.status(404).send('SoftSkill inexistant')
      return
    }

    DeleteImageHandler(softSkillModel.svgPath, res)
    await softSkillModel.destroy()
    res.status(204).send()
  } catch (error) {
    ErrorHandler(error, res)
  }
}
