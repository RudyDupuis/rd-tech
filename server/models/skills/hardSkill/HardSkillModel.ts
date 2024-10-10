import { DataTypes, Model } from 'sequelize'
import sequelize from '../../../config/sequelize'
import HardSkill from './HardSkill'

class HardSkillModel extends Model<HardSkill> {
  declare name: string
  declare svgPath: string
  declare mastery: 'advanced' | 'intermediate' | 'beginner'
  declare readonly id: number
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

HardSkillModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    svgPath: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mastery: {
      type: DataTypes.ENUM('advanced', 'intermediate', 'beginner'),
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'hard_skills'
  }
)

export default HardSkillModel
