import { GetExperience, PostExperience, PutExperience } from './Experience'
import type { GetSkill } from '../skills/Skill'

export class PostProjectExperience extends PostExperience {
  constructor(
    title: string,
    startDate: Date,
    shortDesc: string,
    public longDesc: string,
    public hardSkillIds: Array<string>,
    public isFavorite: boolean,
    endDate?: Date,
    thumbnail?: File,
    public images?: Array<File>,
    public projectLink?: string,
    public codeLink?: string
  ) {
    super(title, startDate, shortDesc, endDate, thumbnail)
  }
}

export class PutProjectExperience extends PutExperience {
  constructor(
    id: string,
    title: string,
    startDate: Date,
    shortDesc: string,
    public longDesc: string,
    public hardSkills: Array<GetSkill>,
    public hardSkillIds: Array<string>,
    public isFavorite: boolean,
    endDate?: Date,
    thumbnail?: File,
    thumbnailPath?: string,
    public images?: Array<File>,
    public imagesPath?: Array<string>,
    public projectLink?: string,
    public codeLink?: string
  ) {
    super(id, title, startDate, shortDesc, endDate, thumbnail, thumbnailPath)
  }
}

export class GetProjectExperience extends GetExperience {
  constructor(
    id: string,
    title: string,
    startDate: Date,
    shortDesc: string,
    public slug: string,
    public longDesc: string,
    public hardSkills: Array<GetSkill>,
    public isFavorite: boolean,
    endDate?: Date,
    thumbnailPath?: string,
    public imagesPath?: Array<string>,
    public projectLink?: string,
    public codeLink?: string
  ) {
    super(id, title, startDate, shortDesc, endDate, thumbnailPath)
  }
}
