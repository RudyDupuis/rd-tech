import { DataTypes, Model } from 'sequelize'
import sequelize from '../../../config/sequelize'
import SoftSkill from './SoftSkill'
class SoftSkillModel extends Model<SoftSkill> {
  declare name: string
  declare svgPath: string
  declare readonly id: number
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

SoftSkillModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    svgPath: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'soft_skills'
  }
)

export default SoftSkillModel
