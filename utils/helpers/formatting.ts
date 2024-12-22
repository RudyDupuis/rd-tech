import { isDefined } from '../types/TypeGuard'

export function formatExperienceDate(startDate: Date, endDate: Date | undefined) {
  const formattedStartDate = startDate.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long'
  })
  const formattedEndDate = isDefined(endDate)
    ? endDate.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })
    : "Aujourd'hui"

  if (
    startDate.getMonth() === endDate?.getMonth() &&
    startDate.getFullYear() == endDate?.getFullYear()
  ) {
    return capitalizeFirstLetter(formattedStartDate)
  }

  return capitalizeFirstLetter(formattedStartDate) + ' - ' + capitalizeFirstLetter(formattedEndDate)
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
