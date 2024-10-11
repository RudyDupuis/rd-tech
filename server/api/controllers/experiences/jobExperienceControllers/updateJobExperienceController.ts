import { Request, Response } from 'express'
import ErrorHandler from '../../../utils/ErrorHandler'
import DeleteImageHandler from '../../../utils/DeleteImageHandler'
import JobExperienceModel from '../../../models/experiences/jobExperience/JobExperienceModel'
import { JobExperienceDto } from '../../../models/experiences/jobExperience/JobExperienceDto'
import JobExperience from '~/server/api/models/experiences/jobExperience/JobExperience'
import { isDefined, isNotNull, isNull } from '~/utils/type/TypeGuard'

export default async function updateJobExperienceController(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params
  const newImgPath = req.file?.path

  const newJobExperienceDto: JobExperienceDto = {
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    shortDesc: req.body.shortDesc,
    thumbnailPath: newImgPath
  }

  const newJobExperience = JobExperience.fromDto(newJobExperienceDto)

  try {
    const jobExperience = await JobExperienceModel.findByPk(id)

    if (isNull(jobExperience)) {
      res.status(404).send('JobExperience inexistant')
      return
    }

    if (isDefined(newImgPath) && isNotNull(jobExperience.thumbnailPath)) {
      DeleteImageHandler(jobExperience.thumbnailPath, res)
    }

    jobExperience.title = newJobExperience.title
    jobExperience.startDate = newJobExperience.startDate
    jobExperience.endDate = isDefined(newJobExperience.endDate) ? newJobExperience.endDate : null
    jobExperience.shortDesc = newJobExperience.shortDesc
    jobExperience.thumbnailPath = newImgPath || jobExperience.thumbnailPath

    await jobExperience.save()
    res.status(200).json(jobExperience)
  } catch (error) {
    ErrorHandler(error, res)
  }
}
