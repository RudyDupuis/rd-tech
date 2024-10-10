import { GetHardSkill, PostHardSkill, PutHardSkill } from '~/utils/entities/skills/HardSkill'

export interface HardSkillJson {
  id: string
  name: string
  svgPath: string
  mastery: 'advanced' | 'intermediate' | 'beginner'
}

export class HardSkillMapper {
  jsonToGetHardSkill(hardSkillJson: HardSkillJson) {
    return new GetHardSkill(
      hardSkillJson.id,
      hardSkillJson.name,
      hardSkillJson.svgPath,
      hardSkillJson.mastery
    )
  }

  getHardSkillToPutHardSkill(getHardSkill: GetHardSkill) {
    return new PutHardSkill(
      getHardSkill.id,
      getHardSkill.name,
      getHardSkill.svgPath,
      getHardSkill.mastery,
      undefined
    )
  }

  emptyPostHardSkill() {
    return new PostHardSkill('', 'beginner')
  }
}
