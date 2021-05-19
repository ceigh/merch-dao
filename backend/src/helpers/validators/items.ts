import * as v from '.'
import { itemIdLen } from '../../../../helpers/const'
import type { Data } from '../server'

export function getItemWithoutIdErr (key: string, value: Data,
  partial = false): string {
  const objectErr = v.getObjectErr(key, value)
  if (objectErr !== '') return objectErr

  const { name, description, images, quantity, isVisible } = value

  if (!partial || (partial && name !== undefined)) {
    const nonBlankStringErr = v.getNonBlankStringErr(name, `${key}.name`)
    if (nonBlankStringErr !== '') return nonBlankStringErr
  }

  if (!partial || (partial && description !== undefined)) {
    const nonBlankStringErr =
      v.getNonBlankStringErr(description, `${key}.description`)
    if (nonBlankStringErr !== '') return nonBlankStringErr
  }

  if (!partial || (partial && images !== undefined)) {
    const imagesKey = `${key}.images`

    const arrayErr = v.getArrayErr(imagesKey, images)
    if (arrayErr !== '') return arrayErr

    for (const [i, image] of images.entries()) {
      const nonBlankStringErr =
        v.getNonBlankStringErr(image, `${imagesKey}[${i as number}]`)
      if (nonBlankStringErr !== '') return nonBlankStringErr
    }
  }

  if (!partial || (partial && quantity !== undefined)) {
    const quantityKey = `${key}.quantity`

    const integerErr = v.getIntegerErr(quantityKey, quantity)
    if (integerErr !== '') return integerErr

    if (quantity < 0 && quantity !== -1) {
      return `${quantityKey} должно быть в диапазоне [-1, Infinity]`
    }
  }

  if (!partial || (partial && isVisible !== undefined)) {
    const booleanErr = v.getBooleanErr(`${key}.isVisible`, isVisible)
    if (booleanErr !== '') return booleanErr
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

export function getAddErr (data: Data): string {
  const { items } = data

  const itemsKey = 'items'
  const arrayErr = v.getArrayErr(itemsKey, items)
  if (arrayErr !== '') return arrayErr

  if (items.length === 0) return `${itemsKey} не может быть пустым`

  for (const [i, item] of items.entries()) {
    const itemWithoutIdErr = getItemWithoutIdErr(`items[${i as number}]`, item)
    if (itemWithoutIdErr !== '') return itemWithoutIdErr
  }

  return ''
}

export function getEditErr (data: Data): string {
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
