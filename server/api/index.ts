import express from 'express'
import sequelize from './config/sequelize'
import hardSkillRoutes from './routes/skills/hardSkillRoutes'
import softSkillRoutes from './routes/skills/softSkillRoutes'
import projectExperienceRoutes from './routes/experiences/projectExperienceRoutes'
import jobExperienceRoutes from './routes/experiences/jobExperienceRoutes'
import trainingExperienceRoutes from './routes/experiences/trainingExperienceRoutes'
import authRoutes from './routes/authRoutes'

const app = express()
app.use(express.json())

app.use('/api/uploads', express.static('uploads'))

app.use('/api/auth', authRoutes)

app.use('/api/hard-skills', hardSkillRoutes)
app.use('/api/soft-skills', softSkillRoutes)

app.use('/api/project-experiences', projectExperienceRoutes)
app.use('/api/job-experiences', jobExperienceRoutes)
app.use('/api/training-experiences', trainingExperienceRoutes)

sequelize.sync().then(() => {
  console.log('Base de donnée initialisée')
})

export default fromNodeMiddleware(app)
