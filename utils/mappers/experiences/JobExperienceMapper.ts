import {
  GetJobExperience,
  PostJobExperience,
  PutJobExperience
} from '~/utils/entities/experiences/JobExperience'
import { isDefined } from '~/utils/types/TypeGuard'

export interface JobExperienceJson {
  id: string
  title: string
  startDate: string
  shortDesc: string
  endDate?: string
  thumbnailPath?: string
}

export class JobExperienceMapper {
  jsonToGetJobExperience(jobExperienceJson: JobExperienceJson) {
    return new GetJobExperience(
      jobExperienceJson.id,
      jobExperienceJson.title,
      new Date(jobExperienceJson.startDate),
      jobExperienceJson.shortDesc,
      isDefined(jobExperienceJson.endDate) ? new Date(jobExperienceJson.endDate) : undefined,
      jobExperienceJson.thumbnailPath
    )
  }

  getJobExperienceToPutJobExperience(getJobExperience: GetJobExperience) {
    return new PutJobExperience(
      getJobExperience.id,
      getJobExperience.title,
      getJobExperience.startDate,
      getJobExperience.shortDesc,
      getJobExperience.endDate,
      undefined,
      getJobExperience.thumbnailPath
    )
  }

  emptyPostJobExperience() {
    return new PostJobExperience('', new Date(), '')
  }
}
