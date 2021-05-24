import * as v from '.'
import { getIdErr as getItemIdErr } from './items'
import { orderIdLen, orderStatuses } from '../../../../helpers/const'
import type { Data } from '../server'

const statuses = Object.keys(orderStatuses)

export function getStatusErr (value: Data, key = 'status'): string {
  if (!statuses.includes(value)) {
    return `${key} must be in [${statuses.join(', ')}]`
  }

  return ''
}

export function getOrderWithoutIdErr (key: string, value: Data,
  partial = false): string {
  const k = key !== '' ? `${key}.` : ''

  const objectErr = v.getObjectErr(k.slice(0, -1), value)
  if (objectErr !== '') return objectErr

  const { item, quantity } = value

  if (!partial || (partial && item !== undefined)) {
    const itemIdErr = getItemIdErr(item, `${k}item`)
    if (itemIdErr !== '') return itemIdErr
  }

  if (!partial || (partial && quantity !== undefined)) {
    const quantityKey = `${k}quantity`

    const integerErr = v.getIntegerErr(quantityKey, quantity)
    if (integerErr !== '') return integerErr

    if (quantity <= 0) { return `${quantityKey} must be positive` }
  }

  // TODO: recipient and address checks

  return ''
}

export function getIdErr (value: unknown, key = 'id'): string {
  const nonBlankStringErr = v.getNonBlankStringErr(value, key)
  if (nonBlankStringErr !== '') return nonBlankStringErr

  const strictLenErr = v.getStrictLenErr(orderIdLen, key, value as string)
  if (strictLenErr !== '') return strictLenErr

  return ''
}

export function getCreateErr (data: Data): string {
  const orderWithoutIdErr = getOrderWithoutIdErr('', data)
  if (orderWithoutIdErr !== '') return orderWithoutIdErr

  return ''
}

export function getUpdateStatusErr (data: Data): string {
  const idErr = getIdErr(data.id)
  if (idErr !== '') return idErr

  const statusErr = getStatusErr(data.status)
  if (statusErr !== '') return statusErr

  return ''
}

export function getGetErr (data: Data): string {
  const idErr = getIdErr(data.id)
  if (idErr !== '') return idErr

  return ''
}

// export const getDeleteErr = getGetErr
