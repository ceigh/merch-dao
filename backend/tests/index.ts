export const wrongValues = ['', 'a', null, false, true, 0, 1, {}, []]

export const wrongValuesWithUndefined = [...wrongValues, undefined]

const _wrongValuesForObject = wrongValuesWithUndefined
  .filter(w => typeof w !== 'object')
export const wrongValuesForObject = [
  ..._wrongValuesForObject, null, []
]

export const wrongValuesForArray = wrongValuesWithUndefined
  .filter(w => !Array.isArray(w))

export const wrongValuesForString = wrongValuesWithUndefined
  .filter(w => typeof w !== 'string')

export const wrongValuesForBoolean = wrongValuesWithUndefined
  .filter(v => typeof v !== 'boolean')

export const wrongValuesForNumber = wrongValuesWithUndefined
  .filter(v => typeof v !== 'number')
