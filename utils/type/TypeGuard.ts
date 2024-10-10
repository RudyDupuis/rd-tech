export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined
}

export function isUndefined<T>(value: T | undefined): value is undefined {
  return value === undefined
}

export function isNotNull<T>(value: T | null): value is T {
  return value !== null
}

export function isNull<T>(value: T | null): value is null {
  return value === null
}

export function isFileObject(
  files: unknown
): files is { [fieldname: string]: Express.Multer.File[] } {
  return typeof files === 'object' && !Array.isArray(files)
}