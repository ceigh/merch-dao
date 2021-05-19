import { suite } from 'uvu'
import { equal, ok } from 'uvu/assert'
import { itemIdLen } from '../../../helpers/const'
import {
  getItemWithoutIdErr, getIdErr, getAddErr, getEditErr, getDeleteErr
} from '../../src/helpers/validators/items'
import * as _ from '..'
import type { Item } from '../../../types'

const item: Omit<Item, 'id'> = {
  name: 'a'.repeat(9),
  description: 'a'.repeat(99),
  images: ['a'.repeat(9)],
  quantity: 9,
  isVisible: true
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

itemWithoutIdErr('is not empty if isVisible is wrong', () => {
  _.wrongValuesForBoolean.forEach(v => {
    ok(getItemWithoutIdErr('', { ...item, isVisible: v }))
  })
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

const addErr = suite('getAddErr')

addErr('is empty if items ok', () => {
  equal(getAddErr({ items: [item] }), '')
})

addErr('is not empty if items wrong', () => {
  _.wrongValuesForArray.forEach(v => {
    ok(getAddErr({ items: v }))
  })
  ok(getAddErr({ items: [] }))
})

addErr('is not empty if item name wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getAddErr({ items: [{ ...item, name: v }] }))
  })
})

addErr('is not empty if item description wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getAddErr({ items: [{ ...item, description: v }] }))
  })
})

addErr('is not empty if item images wrong', () => {
  _.wrongValuesForArray.forEach(v => {
    ok(getAddErr({ items: [{ ...item, images: v }] }))
  })

  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getAddErr({ items: [{ ...item, images: [v] }] }))
  })
})

addErr('is not empty if item quantity is wrong', () => {
  _.wrongValuesForNumber.forEach(v => {
    ok(getAddErr({ items: [{ ...item, quantity: v }] }))
  })
  ok(getAddErr({ items: [{ ...item, quantity: 0.9 }] }))
  ok(getAddErr({ items: [{ ...item, quantity: -9 }] }))
})

addErr('is not empty if item isVisible is wrong', () => {
  _.wrongValuesForBoolean.forEach(v => {
    ok(getAddErr({ items: [{ ...item, isVisible: v }] }))
  })
})

addErr.run()

const editErr = suite('getEditErr')

editErr('is empty if payload ok', () => {
  equal(getEditErr({ item, id }), '')
  equal(getEditErr({ item: {}, id }), '')
})

editErr('is not empty if id is wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getEditErr({ item, id: v }))
  })
  ok(getEditErr({ item, id: 'a'.repeat(itemIdLen - 1) }))
  ok(getEditErr({ item, id: 'a'.repeat(itemIdLen + 1) }))
})

editErr('is not empty if item wrong', () => {
  _.wrongValuesForObject.forEach(v => {
    ok(getEditErr({ id, item: v }))
  })
})

editErr('is not empty if item name wrong', () => {
  _.optional(_.wrongValuesForNonBlankString).forEach(v => {
    ok(getEditErr({ id, item: { ...item, name: v } }))
  })
})

editErr('is not empty if item description wrong', () => {
  _.optional(_.wrongValuesForNonBlankString).forEach(v => {
    ok(getEditErr({ id, item: { ...item, description: v } }))
  })
})

editErr('is not empty if item images wrong', () => {
  _.optional(_.wrongValuesForArray).forEach(v => {
    ok(getEditErr({ id, item: { ...item, images: v } }))
  })

  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getEditErr({ id, items: { ...item, images: [v] } }))
  })
})

editErr('is not empty if item quantity is wrong', () => {
  _.optional(_.wrongValuesForNumber).forEach(v => {
    ok(getEditErr({ id, item: { ...item, quantity: v } }))
  })
  ok(getEditErr({ id, item: { ...item, quantity: 0.9 } }))
  ok(getEditErr({ id, item: { ...item, quantity: -9 } }))
})

editErr('is not empty if item isVisible is wrong', () => {
  _.optional(_.wrongValuesForBoolean).forEach(v => {
    ok(getEditErr({ id, item: { ...item, isVisible: v } }))
  })
})

editErr.run()
