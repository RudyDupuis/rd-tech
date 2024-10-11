import slugify from 'slugify'
import ProjectExperienceModel from '~/server/api/models/experiences/projectExperience/ProjectExperienceModel'

export default async function generateUniqueSlug(title: string): Promise<string> {
  const slug = slugify(title, { lower: true, strict: true })
  let uniqueSlug = slug
  let counter = 1

  while (await ProjectExperienceModel.findOne({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${slug}-${counter}`
    counter++
  }

  return uniqueSlug
}
