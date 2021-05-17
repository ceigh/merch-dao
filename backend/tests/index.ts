export const username = 'admin'
export const password = 'admin'

export function optional (wrongValues: any[]): any[] {
  return wrongValues.filter(v => v !== undefined)
}

export const wrongValuesForNonBlankString =
  ['', null, false, true, 0, 1, {}, [], undefined]

export const wrongValuesForObject =
  ['', 'a', null, false, true, 0, 1, [], undefined]

export const wrongValuesForArray =
  ['', 'a', null, false, true, 0, 1, {}, undefined]

export const wrongValuesForString =
  [null, false, true, 0, 1, {}, [], undefined]

export const wrongValuesForBoolean =
  ['', 'a', null, 0, 1, {}, [], undefined]

export const wrongValuesForNumber =
  ['', 'a', null, false, true, {}, [], undefined]
