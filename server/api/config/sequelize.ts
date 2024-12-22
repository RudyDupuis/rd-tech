import { Sequelize } from 'sequelize'
import { isUndefined } from '~/utils/types/TypeGuard'

if (
  isUndefined(process.env.DB_NAME) ||
  isUndefined(process.env.DB_USER) ||
  isUndefined(process.env.DB_PASS)
) {
  throw new Error('Missing environment variables')
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
})

export default sequelize
