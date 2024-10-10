import HardSkillDto from './HardSkillDto'
import HardSkillModel from './HardSkillModel'

export default class HardSkill implements HardSkillDto {
  constructor(
    public name: string,
    public svgPath: string,
    public mastery: 'advanced' | 'intermediate' | 'beginner',
    public id?: number
  ) {}

  public static fromDto(hardSkillDto: HardSkillDto) {
    return new HardSkill(
      hardSkillDto.name,
      hardSkillDto.svgPath,
      hardSkillDto.mastery,
      hardSkillDto.id
    )
  }

  public static toDto(hardSkill: HardSkill): HardSkillDto {
    return {
      name: hardSkill.name,
      svgPath: hardSkill.svgPath,
      mastery: hardSkill.mastery,
      id: hardSkill.id
    }
  }

  public static fromModel(hardSkillModel: HardSkillModel) {
    return new HardSkill(
      hardSkillModel.name,
      hardSkillModel.svgPath,
      hardSkillModel.mastery,
      hardSkillModel.id
    )
  }
}
