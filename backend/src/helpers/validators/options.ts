import * as v from '.'
import { getIdErr } from './items'
import type { Data } from '../server'

export function getOptionsWithoutScopeErr (key: string, value: Data,
  partial = false): string {
  const k = key !== '' ? `${key}.` : ''

  const objectErr = v.getObjectErr(k.slice(0, -1), value)
  if (objectErr !== '') return objectErr

  const { currentItem } = value

  if (!partial || (partial && currentItem !== undefined)) {
    const idErr = getIdErr(currentItem, `${k}currentItem`)
    if (idErr !== '') return idErr
  }

  return ''
}

export function getScopeErr (value: unknown, key = 'scope'): string {
  const nonBlankStringErr = v.getNonBlankStringErr(value, key)
  if (nonBlankStringErr !== '') return nonBlankStringErr

  return ''
}

export function getUpdateErr (data: Data): string {
  const scopeErr = getScopeErr(data.scope)
  if (scopeErr !== '') return scopeErr

  const optionsWithoutScopeErr =
    getOptionsWithoutScopeErr('options', data.options, true)
  if (optionsWithoutScopeErr !== '') return optionsWithoutScopeErr

  return ''
}

export function getGetErr (data: Data): string {
  const scopeErr = getScopeErr(data.scope)
  if (scopeErr !== '') return scopeErr

  return ''
}
