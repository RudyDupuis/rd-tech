import HardSkillDto from '../../skills/hardSkill/HardSkillDto'

export default interface ProjectExperienceDto {
  title: string
  startDate: string
  shortDesc: string
  longDesc: string
  isFavorite: boolean
  id?: number
  slug?: string
  endDate?: string
  thumbnailPath?: string
  imagesPath?: Array<string>
  projectLink?: string
  codeLink?: string
  hardSkills?: Array<HardSkillDto>
}
