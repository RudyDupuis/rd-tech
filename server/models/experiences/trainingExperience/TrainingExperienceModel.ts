import { DataTypes, Model } from 'sequelize'
import sequelize from '../../../config/sequelize'
import TrainingExperience from './TrainingExperience'

class TrainingExperienceModel extends Model<TrainingExperience> {
  declare title: string
  declare startDate: Date
  declare shortDesc: string
  declare endDate: Date | null
  declare thumbnailPath: string | null
  declare readonly id: number
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

TrainingExperienceModel.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    shortDesc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    thumbnailPath: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'training_experiences'
  }
)

export default TrainingExperienceModel
