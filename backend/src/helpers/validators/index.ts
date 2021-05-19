export function getStrictLenErr (len: number, key: string,
  value: string): string {
  const valLen = value.length
  if (valLen === len) return ''
  return `${key} должно быть длиной ${len} символов (не ${valLen})`
}

export function getMinLenErr (len: number, key: string,
  value: string): string {
  const valLen = value.length
  if (valLen >= len) return ''
  return `${key} должно быть длиной как минимум ${len} символов (не ${valLen})`
}

export function getMaxLenErr (len: number, key: string,
  value: string): string {
  const valLen = value.length
  if (valLen <= len) return ''
  return `${key} должно быть меньше или равно \
${len} символов в длину (не ${valLen})`
}

const mustBe = (expectedType: string, key: string,
  realType = ''): string =>
  `${key} должно быть "${expectedType}"${
    realType !== '' ? ` (не "${realType}")` : ''}`

const blank = (key: string): string => `${key} не может быть пустым`

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
  const name = 'заголовок авторизации'
  if (authHeader === '') return `${name} обязателен`

  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return mustBe('Bearer <secret>', name, authHeader)
  }

  const secret = parts[1]
  if (secret === '') return blank(`secret в ${name}`)
  const secretLenErr = getMinLenErr(32, `secret в ${name}`, secret)
  if (secretLenErr !== '') return secretLenErr
  return ''
}
