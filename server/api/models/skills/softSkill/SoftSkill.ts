import SoftSkillDto from './SoftSkillDto'
import SoftSkillModel from './SoftSkillModel'

export default class SoftSkill implements SoftSkillDto {
  constructor(
    public name: string,
    public svgPath: string,
    public id?: number
  ) {}

  public static fromDto(softSkillDto: SoftSkillDto) {
    return new SoftSkill(softSkillDto.name, softSkillDto.svgPath, softSkillDto.id)
  }

  public static toDto(softSkill: SoftSkill): SoftSkillDto {
    return {
      name: softSkill.name,
      svgPath: softSkill.svgPath,
      id: softSkill.id
    }
  }

  public static fromModel(softSkillModel: SoftSkillModel) {
    return new SoftSkill(softSkillModel.name, softSkillModel.svgPath, softSkillModel.id)
  }
}
