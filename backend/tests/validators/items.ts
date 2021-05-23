import { suite } from 'uvu'
import { equal, ok } from 'uvu/assert'
import { itemIdLen } from '../../../helpers/const'
import {
  getItemWithoutIdErr, getIdErr, getAddErr, getUpdateErr, getDeleteErr,
  getGetErr
} from '../../src/helpers/validators/items'
import * as _ from '..'
import type { Item } from '../../../types'

const item: Omit<Item, 'id'> = {
  name: 'a'.repeat(9),
  description: 'a'.repeat(99),
  images: ['a'.repeat(9)],
  quantity: 9
}
const id = 'a'.repeat(itemIdLen)

const itemWithoutIdErr = suite('getItemWithoutIdErr')

itemWithoutIdErr('is empty if item ok', () => {
  equal(getItemWithoutIdErr('', item), '')
})

itemWithoutIdErr('is not empty if name wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getItemWithoutIdErr('', { ...item, name: v }))
  })
})

itemWithoutIdErr('is not empty if description wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getItemWithoutIdErr('', { ...item, description: v }))
  })
})

itemWithoutIdErr('is not empty if images wrong', () => {
  _.wrongValuesForArray.forEach(v => {
    ok(getItemWithoutIdErr('', { ...item, images: v }))
  })

  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getItemWithoutIdErr('', { ...item, images: [v] }))
  })
})

itemWithoutIdErr('is not empty if quantity is wrong', () => {
  _.wrongValuesForNumber.forEach(v => {
    ok(getItemWithoutIdErr('', { ...item, quantity: v }))
  })
  ok(getItemWithoutIdErr('', { ...item, quantity: 0.9 }))
  ok(getItemWithoutIdErr('', { ...item, quantity: -9 }))
})

itemWithoutIdErr.run()

const idErr = suite('getIdErr')

idErr('is empty if id ok', () => {
  equal(getIdErr(id), '')
})

idErr('is not empty if id is wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getIdErr(v))
  })
  ok(getIdErr('a'.repeat(itemIdLen - 1)))
  ok(getIdErr('a'.repeat(itemIdLen + 1)))
})

idErr.run()

const deleteErr = suite('getDeleteErr')

deleteErr('is empty if id ok', () => {
  equal(getDeleteErr({ id }), '')
})

deleteErr('is not empty if id is wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getDeleteErr({ id: v }))
  })
  ok(getDeleteErr({ id: 'a'.repeat(itemIdLen - 1) }))
  ok(getDeleteErr({ id: 'a'.repeat(itemIdLen + 1) }))
})

deleteErr.run()

const getErr = suite('getGetErr')

getErr('is empty if id ok', () => {
  equal(getGetErr({ id }), '')
})

getErr('is not empty if id is wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getGetErr({ id: v }))
  })
  ok(getGetErr({ id: 'a'.repeat(itemIdLen - 1) }))
  ok(getGetErr({ id: 'a'.repeat(itemIdLen + 1) }))
})

getErr.run()

const addErr = suite('getAddErr')

addErr('is empty if item ok', () => {
  equal(getAddErr(item), '')
})

addErr('is not empty if item name wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getAddErr({ ...item, name: v }))
  })
})

addErr('is not empty if item description wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getAddErr({ ...item, description: v }))
  })
})

addErr('is not empty if item images wrong', () => {
  _.wrongValuesForArray.forEach(v => {
    ok(getAddErr({ ...item, images: v }))
  })

  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getAddErr({ ...item, images: [v] }))
  })
})

addErr('is not empty if item quantity is wrong', () => {
  _.wrongValuesForNumber.forEach(v => {
    ok(getAddErr({ ...item, quantity: v }))
  })
  ok(getAddErr({ ...item, quantity: 0.9 }))
  ok(getAddErr({ ...item, quantity: -9 }))
})

addErr.run()

const updateErr = suite('getUpdateErr')

updateErr('is empty if payload ok', () => {
  equal(getUpdateErr({ item, id }), '')
  equal(getUpdateErr({ item: {}, id }), '')
})

updateErr('is not empty if id is wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getUpdateErr({ item, id: v }))
  })
  ok(getUpdateErr({ item, id: 'a'.repeat(itemIdLen - 1) }))
  ok(getUpdateErr({ item, id: 'a'.repeat(itemIdLen + 1) }))
})

updateErr('is not empty if item wrong', () => {
  _.wrongValuesForObject.forEach(v => {
    ok(getUpdateErr({ id, item: v }))
  })
})

updateErr('is not empty if item name wrong', () => {
  _.optional(_.wrongValuesForNonBlankString).forEach(v => {
    ok(getUpdateErr({ id, item: { ...item, name: v } }))
  })
})

updateErr('is not empty if item description wrong', () => {
  _.optional(_.wrongValuesForNonBlankString).forEach(v => {
    ok(getUpdateErr({ id, item: { ...item, description: v } }))
  })
})

updateErr('is not empty if item images wrong', () => {
  _.optional(_.wrongValuesForArray).forEach(v => {
    ok(getUpdateErr({ id, item: { ...item, images: v } }))
  })

  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getUpdateErr({ id, items: { ...item, images: [v] } }))
  })
})

updateErr('is not empty if item quantity is wrong', () => {
  _.optional(_.wrongValuesForNumber).forEach(v => {
    ok(getUpdateErr({ id, item: { ...item, quantity: v } }))
  })
  ok(getUpdateErr({ id, item: { ...item, quantity: 0.9 } }))
  ok(getUpdateErr({ id, item: { ...item, quantity: -9 } }))
})

updateErr.run()
