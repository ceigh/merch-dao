import { suite } from 'uvu'
import { equal, ok } from 'uvu/assert'
import { itemIdLen } from '../../../helpers/const'
import {
  getOptionsWithoutScopeErr, getScopeErr, getUpdateErr, getGetErr
} from '../../src/helpers/validators/options'
import * as _ from '..'
import type { Options } from '../../../types'

const options: Omit<Options, 'scope'> = {
  currentItem: 'a'.repeat(itemIdLen)
}
const scope = 'a'.repeat(9)

const optionsWithoutScopeErr = suite('getOptionsWithoutScopeErr')

optionsWithoutScopeErr('is empty if options ok', () => {
  equal(getOptionsWithoutScopeErr('', options), '')
})

optionsWithoutScopeErr('is not empty if currentItem wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getOptionsWithoutScopeErr('', { ...options, currentItem: v }))
  })
  ok(getOptionsWithoutScopeErr('', {
    ...options, currentItem: 'a'.repeat(itemIdLen - 1)
  }))
  ok(getOptionsWithoutScopeErr('', {
    ...options, currentItem: 'a'.repeat(itemIdLen + 1)
  }))
})

optionsWithoutScopeErr.run()

const scopeErr = suite('getScopeErr')

scopeErr('is empty if scope ok', () => {
  equal(getScopeErr(scope), '')
})

scopeErr('is not empty if scope is wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getScopeErr(v))
  })
})

scopeErr.run()

const getErr = suite('getGetErr')

getErr('is empty if scope ok', () => {
  equal(getGetErr({ scope }), '')
})

getErr('is not empty if scope is wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getGetErr({ scope: v }))
  })
})

getErr.run()

const updateErr = suite('getUpdateErr')

updateErr('is empty if payload ok', () => {
  equal(getUpdateErr({ scope, options }), '')
  equal(getUpdateErr({ scope, options: {} }), '')
})

updateErr('is not empty if scope is wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getUpdateErr({ options, scope: v }))
  })
})

updateErr('is not empty if options wrong', () => {
  _.wrongValuesForObject.forEach(v => {
    ok(getUpdateErr({ scope, options: v }))
  })
})

updateErr('is not empty if options currentItem wrong', () => {
  _.optional(_.wrongValuesForNonBlankString).forEach(v => {
    ok(getUpdateErr({ scope, options: { ...options, currentItem: v } }))
  })
  ok(getUpdateErr({
    scope,
    options: { ...options, currentItem: 'a'.repeat(itemIdLen - 1) }
  }))
  ok(getUpdateErr({
    scope,
    options: { ...options, currentItem: 'a'.repeat(itemIdLen + 1) }
  }))
})

updateErr.run()
