import type { GetProjectExperience } from '~/utils/entities/experiences/ProjectExperience'
import { ApiMethods } from './ApiMethods'
import {
  ProjectExperienceMapper,
  type ProjectExperienceJson
} from '../mappers/experiences/ProjectExperienceMapper'
import type { GetJobExperience } from '~/utils/entities/experiences/JobExperience'
import {
  JobExperienceMapper,
  type JobExperienceJson
} from '../mappers/experiences/JobExperienceMapper'
import {
  TrainingExperienceMapper,
  type TrainingExperienceJson
} from '../mappers/experiences/TrainingExperienceMapper'
import type { GetTrainingExperience } from '~/utils/entities/experiences/TrainingExperience'

export class ExperienceApi {
  private api = new ApiMethods()
  private projectMapper = new ProjectExperienceMapper()
  private jobMapper = new JobExperienceMapper()
  private trainingMapper = new TrainingExperienceMapper()

  async getAllProjectExperiences(): Promise<Array<GetProjectExperience>> {
    try {
      const rawProjectExperiences = await this.api.getData('project-experiences')
      const projectExperiences = rawProjectExperiences.map((value: ProjectExperienceJson) =>
        this.projectMapper.jsonToGetProjectExperience(value)
      )

      return projectExperiences.sort(
        (a: GetProjectExperience, b: GetProjectExperience) =>
          a.startDate.getTime() - b.startDate.getTime()
      )
    } catch (error) {
      throw new Error(`Error fetching project experiences: ${error}`)
    }
  }

  async getAllFavoriteProjectExperiences(): Promise<Array<GetProjectExperience>> {
    try {
      const rawProjectExperiences = await this.api.getData('project-experiences/favorites')
      const projectExperiences = rawProjectExperiences.map((value: ProjectExperienceJson) =>
        this.projectMapper.jsonToGetProjectExperience(value)
      )

      return projectExperiences.sort(
        (a: GetProjectExperience, b: GetProjectExperience) =>
          a.startDate.getTime() - b.startDate.getTime()
      )
    } catch (error) {
      throw new Error(`Error fetching project experiences: ${error}`)
    }
  }

  async getProjectExperienceBySlug(slug: string): Promise<GetProjectExperience> {
    try {
      const rawProjectExperience = await this.api.getData('project-experiences/' + slug)
      const projectExperience = this.projectMapper.jsonToGetProjectExperience(rawProjectExperience)

      return projectExperience
    } catch (error) {
      throw new Error(`Error fetching project experience with slug ${slug}: ${error}`)
    }
  }

  async getAllJobExperiences(): Promise<Array<GetJobExperience>> {
    try {
      const rawJobExperiences = await this.api.getData('job-experiences')
      const jobExperiences = rawJobExperiences.map((value: JobExperienceJson) =>
        this.jobMapper.jsonToGetJobExperience(value)
      )

      return jobExperiences.sort(
        (a: GetJobExperience, b: GetJobExperience) => a.startDate.getTime() - b.startDate.getTime()
      )
    } catch (error) {
      throw new Error(`Error fetching job experiences: ${error}`)
    }
  }

  async getAllTrainingExperiences(): Promise<Array<GetTrainingExperience>> {
    try {
      const rawTrainingExperiences = await this.api.getData('training-experiences')
      const trainingExperiences = rawTrainingExperiences.map((value: TrainingExperienceJson) =>
        this.trainingMapper.jsonToGetTrainingExperience(value)
      )

      return trainingExperiences.sort(
        (a: GetTrainingExperience, b: GetTrainingExperience) =>
          a.startDate.getTime() - b.startDate.getTime()
      )
    } catch (error) {
      throw new Error(`Error fetching training experiences: ${error}`)
    }
  }
}
