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

export function getOrderWithoutIdErr (key: string, value: Data): string {
  const k = key !== '' ? `${key}.` : ''

  const objectErr = v.getObjectErr(k.slice(0, -1), value)
  if (objectErr !== '') return objectErr

  const { item, quantity, recipient, address } = value

  const itemIdErr = getItemIdErr(item, `${k}item`)
  if (itemIdErr !== '') return itemIdErr

  const quantityKey = `${k}quantity`
  const quantityIntegerErr = v.getIntegerErr(quantityKey, quantity)
  if (quantityIntegerErr !== '') return quantityIntegerErr
  if (quantity <= 0) { return `${quantityKey} must be positive` }

  const addressNonBlankStringErr =
    v.getNonBlankStringErr(address, `${key}address`)
  if (addressNonBlankStringErr !== '') return addressNonBlankStringErr

  const recipientKey = `${key}recipient`
  const recipientObjectErr = v.getObjectErr(`${key}recipient`, recipient)
  if (recipientObjectErr !== '') return recipientObjectErr

  const { name, email, phone } = recipient

  if (email !== undefined) {
    const emailNonBlankStringErr =
      v.getNonBlankStringErr(email, `${recipientKey}.email`)
    if (emailNonBlankStringErr !== '') return emailNonBlankStringErr
  }

  const phoneNonBlankStringErr =
    v.getNonBlankStringErr(phone, `${recipientKey}.phone`)
  if (phoneNonBlankStringErr !== '') return phoneNonBlankStringErr

  const nameKey = `${recipientKey}.name`
  const nameObjectErr = v.getObjectErr(nameKey, name)
  if (nameObjectErr !== '') return nameObjectErr

  const { firstName, lastName } = name

  const firstNameNonBlankStringErr =
    v.getNonBlankStringErr(firstName, `${nameKey}.firstName`)
  if (firstNameNonBlankStringErr !== '') return firstNameNonBlankStringErr

  const lastNameNonBlankStringErr =
    v.getNonBlankStringErr(lastName, `${nameKey}.lastName`)
  if (lastNameNonBlankStringErr !== '') return lastNameNonBlankStringErr

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
