import { Request, Response } from 'express'
import SoftSkillModel from '../../../models/skills/softSkill/SoftSkillModel'
import DeleteImageHandler from '../../../utils/DeleteImageHandler'
import ErrorHandler from '../../../utils/ErrorHandler'
import { isNull } from '~/utils/types/TypeGuard'

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
