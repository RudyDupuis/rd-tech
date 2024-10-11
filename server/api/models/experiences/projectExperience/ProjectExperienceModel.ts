import { DataTypes, Model } from 'sequelize'
import sequelize from '../../../config/sequelize'
import HardSkillModel from '../../skills/hardSkill/HardSkillModel'
import ProjectExperience from './ProjectExperience'

class ProjectExperienceModel extends Model<ProjectExperience> {
  declare title: string
  declare startDate: Date
  declare shortDesc: string
  declare longDesc: string
  declare isFavorite: boolean
  declare slug: string | null
  declare endDate: Date | null
  declare thumbnailPath: string | null
  declare imagesPath: Array<string> | null
  declare projectLink: string | null
  declare codeLink: string | null
  declare readonly id: number
  declare readonly createdAt: Date
  declare readonly updatedAt: Date

  declare addHardSkills: (hardSkillIds: number[]) => Promise<void>
  declare setHardSkills: (hardSkillIds: number[]) => Promise<void>
  declare getHardSkills: () => Promise<HardSkillModel[]>
}

ProjectExperienceModel.init(
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
    longDesc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isFavorite: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    thumbnailPath: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imagesPath: {
      type: DataTypes.JSON,
      allowNull: true
    },
    projectLink: {
      type: DataTypes.STRING,
      allowNull: true
    },
    codeLink: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'project_experiences'
  }
)

ProjectExperienceModel.belongsToMany(HardSkillModel, {
  through: 'ProjectExperienceHardSkills',
  as: 'hardSkills'
})

export default ProjectExperienceModel
