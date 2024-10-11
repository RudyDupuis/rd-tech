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

export function isMulterFileObject(
  files: unknown
): files is { [fieldname: string]: Express.Multer.File[] } {
  return (
    typeof files === 'object' &&
    !Array.isArray(files) &&
    isNotNull(files) &&
    Object.values(files).every(
      (fileArray) =>
        Array.isArray(fileArray) &&
        fileArray.every(
          (file) =>
            isNotNull(file) &&
            isDefined(file) &&
            typeof file.originalname === 'string' &&
            typeof file.path === 'string' &&
            typeof file.mimetype === 'string'
        )
    )
  )
}
