// TODO: translate

export function getStrictLenErr (len: number, key: string,
  value: string): string {
  const valLen = value.length
  if (valLen === len) return ''
  return `${key} must be ${len} chars length, not ${valLen}`
}

export function getMinLenErr (len: number, key: string,
  value: string): string {
  const valLen = value.length
  if (valLen >= len) return ''
  return `${key} must be at least ${len} chars length, not ${valLen}`
}

export function getMaxLenErr (len: number, key: string,
  value: string): string {
  const valLen = value.length
  if (valLen <= len) return ''
  return `${key} must be less than or equal to \
${len} chars length, not ${valLen}`
}

const mustBe = (expectedType: string, key: string,
  realType = ''): string =>
  `${key} must be "${expectedType}"${
    realType !== '' ? `, not "${realType}"` : ''}`

const blank = (key: string): string => `${key} cannot be blank`

export function getTypeErr (type: string, key: string,
  value: unknown): string {
  const typeOfValue = typeof value
  if (typeOfValue === type) return ''
  return mustBe(type, key, typeOfValue)
}

export function getStringErr (key: string, value: unknown): string {
  return getTypeErr('string', key, value)
}

export function getBooleanErr (key: string, value: unknown): string {
  return getTypeErr('boolean', key, value)
}

export function getNumberErr (key: string, value: unknown): string {
  return getTypeErr('number', key, value)
}

export function getIntegerErr (key: string, value: unknown): string {
  if (Number.isInteger(value)) return ''
  return mustBe('integer', key)
}

// checks for plain object ({})
export function getObjectErr (key: string, value: unknown): string {
  const typeErr = getTypeErr('object', key, value)
  if (typeErr !== '') return typeErr
  const msg = (type: string): string => mustBe('object', key, type)
  if (value === null) return msg('null')
  if (value instanceof Array) return msg('array')
  return ''
}

export function getArrayErr (key: string, value: unknown): string {
  if (Array.isArray(value)) return ''
  return mustBe('array', key, typeof value)
}

export function getNonBlankStringErr (value: unknown,
  key: string): string {
  const stringErr = getStringErr(key, value)
  if (stringErr !== '') return stringErr
  if (value === '') return blank(key)
  return ''
}

export function getAuthHeaderErr (authHeader: string): string {
  const name = 'authorization header'
  if (authHeader === '') return `${name} is required`

  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return mustBe('Bearer <secret>', name, authHeader)
  }

  const secret = parts[1]
  if (secret === '') return blank(`secret in ${name}`)
  const secretLenErr = getMinLenErr(32, `secret in ${name}`, secret)
  if (secretLenErr !== '') return secretLenErr
  return ''
}
