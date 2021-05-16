import { suite } from 'uvu'
import { equal, ok } from 'uvu/assert'
import {
  getStrictLenErr, getMinLenErr, getMaxLenErr, getTypeErr, getStringErr,
  getObjectErr, getArrayErr, getBooleanErr, getNumberErr
} from '../../src/helpers/validators'
import {
  wrongValuesWithUndefined, wrongValuesForObject,
  wrongValuesForArray, wrongValuesForString, wrongValuesForBoolean,
  wrongValuesForNumber
} from '..'

const strictLenErr = suite('getStrictLenErr')

strictLenErr('is empty if len ok', () => {
  equal(getStrictLenErr(9, '', 'a'.repeat(9)), '')
})

strictLenErr('is not empty if len wrong', () => {
  ok(getStrictLenErr(9, '', ''))
  ok(getStrictLenErr(9, '', 'a'))
  ok(getStrictLenErr(9, '', 'a'.repeat(99)))
})

strictLenErr.run()

const minLenErr = suite('getMinLenErr')

minLenErr('is empty if len ok', () => {
  equal(getMinLenErr(9, '', 'a'.repeat(9)), '')
  equal(getMinLenErr(9, '', 'a'.repeat(99)), '')
})

minLenErr('is not empty if len wrong', () => {
  ok(getMinLenErr(9, '', ''))
  ok(getMinLenErr(9, '', 'a'))
})

minLenErr.run()

const maxLenErr = suite('getMaxLenErr')

maxLenErr('is empty if len ok', () => {
  equal(getMaxLenErr(9, '', ''), '')
  equal(getMaxLenErr(9, '', 'a'.repeat(8)), '') // ?!
  equal(getMaxLenErr(9, '', 'a'.repeat(9)), '')
})

maxLenErr('is not empty if len wrong', () => {
  ok(getMaxLenErr(9, '', 'a'.repeat(99)))
})

maxLenErr.run()

const typeErr = suite('getTypeErr')

typeErr('is empty if type ok', () => {
  const strings = ['', 'a', 'a'.repeat(9)]
  strings.forEach(s => { equal(getTypeErr('string', '', s), '') })
  const booleans = [false, true]
  booleans.forEach(b => { equal(getTypeErr('boolean', '', b), '') })
  const numbers = [0, 9, 9e9, Infinity, NaN]
  numbers.forEach(n => { equal(getTypeErr('number', '', n), '') })
})

typeErr('is not empty if type wrong', () => {
  wrongValuesWithUndefined.forEach(w => {
    const typeOfW = typeof w
    const other = wrongValuesWithUndefined
      // eslint-disable-next-line valid-typeof
      .filter(ww => typeof ww !== typeOfW)
    other.forEach(o => { ok(getTypeErr(typeOfW, '', o)) })
  })
})

typeErr.run()

const stringErr = suite('getStringErr')

stringErr('is empty if value is string', () => {
  equal(getStringErr('', ''), '')
  equal(getStringErr('', 'a'), '')
  equal(getStringErr('', 'a'.repeat(9)), '')
})

stringErr('is not empty if value is not string', () => {
  wrongValuesForString.forEach(w => {
    ok(getStringErr('', w))
  })
})

stringErr.run()

const booleanErr = suite('getBooleanErr')

booleanErr('is empty if value is boolean', () => {
  equal(getBooleanErr('', false), '')
  equal(getBooleanErr('', true), '')
})

booleanErr('is not empty if value is not boolean', () => {
  wrongValuesForBoolean.forEach(w => {
    ok(getBooleanErr('', w))
  })
})

booleanErr.run()

const numberErr = suite('getNumberErr')

numberErr('is empty if value is number', () => {
  equal(getNumberErr('', 0), '')
  equal(getNumberErr('', 9), '')
  equal(getNumberErr('', 9e9), '')
})

numberErr('is not empty if value is not number', () => {
  wrongValuesForNumber.forEach(w => {
    ok(getNumberErr('', w))
  })
})

numberErr.run()

const objectErr = suite('getObjectErr')

objectErr('is empty if value is plain object', () => {
  equal(getObjectErr('', {}), '')
})

objectErr('is not empty if values is not plain object', () => {
  wrongValuesForObject.forEach(w => { ok(getObjectErr('', w)) })
})

objectErr.run()

const arrayErr = suite('getArrayErr')

arrayErr('is empty if value is plain array', () => {
  equal(getArrayErr('', []), '')
})

arrayErr('is not empty if value is not plain array', () => {
  wrongValuesForArray.forEach(w => { ok(getArrayErr('', w)) })
})

arrayErr.run()
