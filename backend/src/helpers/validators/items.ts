import * as v from '.'
import { itemIdLen } from '../../../../helpers/const'
import type { Data } from '../server'

export function getItemWithoutIdErr (key: string, value: Data,
  partial = false): string {
  const k = key !== '' ? `${key}.` : ''

  const objectErr = v.getObjectErr(k.slice(0, -1), value)
  if (objectErr !== '') return objectErr

  const { name, description, images, quantity } = value

  if (!partial || (partial && name !== undefined)) {
    const nonBlankStringErr = v.getNonBlankStringErr(name, `${k}name`)
    if (nonBlankStringErr !== '') return nonBlankStringErr
  }

  if (!partial || (partial && description !== undefined)) {
    const nonBlankStringErr =
      v.getNonBlankStringErr(description, `${k}description`)
    if (nonBlankStringErr !== '') return nonBlankStringErr
  }

  if (!partial || (partial && images !== undefined)) {
    const imagesKey = `${k}images`

    const arrayErr = v.getArrayErr(imagesKey, images)
    if (arrayErr !== '') return arrayErr

    for (const [i, image] of images.entries()) {
      const nonBlankStringErr =
        v.getNonBlankStringErr(image, `${imagesKey}[${i as number}]`)
      if (nonBlankStringErr !== '') return nonBlankStringErr
    }
  }

  if (!partial || (partial && quantity !== undefined)) {
    const quantityKey = `${k}quantity`

    const integerErr = v.getIntegerErr(quantityKey, quantity)
    if (integerErr !== '') return integerErr

    if (quantity < 0 && quantity !== -1) {
      return `${quantityKey} must be in range [-1, Infinity)`
    }
  }

  return ''
}

export function getIdErr (value: unknown, key = 'id'): string {
  const nonBlankStringErr = v.getNonBlankStringErr(value, key)
  if (nonBlankStringErr !== '') return nonBlankStringErr

  const strictLenErr = v.getStrictLenErr(itemIdLen, key, value as string)
  if (strictLenErr !== '') return strictLenErr

  return ''
}

export function getCreateErr (data: Data): string {
  const itemWithoutIdErr = getItemWithoutIdErr('', data)
  if (itemWithoutIdErr !== '') return itemWithoutIdErr

  return ''
}

export function getUpdateErr (data: Data): string {
  const idErr = getIdErr(data.id)
  if (idErr !== '') return idErr

  const itemWithoutIdErr = getItemWithoutIdErr('item', data.item, true)
  if (itemWithoutIdErr !== '') return itemWithoutIdErr

  return ''
}

export function getDeleteErr (data: Data): string {
  const idErr = getIdErr(data.id)
  if (idErr !== '') return idErr

  return ''
}

export const getGetErr = getDeleteErr
