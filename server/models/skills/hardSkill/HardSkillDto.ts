export default interface HardSkillDto {
  name: string
  svgPath: string
  mastery: 'advanced' | 'intermediate' | 'beginner'
  id?: number
}
