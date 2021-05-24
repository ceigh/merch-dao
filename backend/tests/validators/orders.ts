import { suite } from 'uvu'
import { equal, ok } from 'uvu/assert'
import { itemIdLen, orderIdLen } from '../../../helpers/const'
import {
  getOrderWithoutIdErr, getIdErr, getCreateErr, getUpdateErr, getGetErr
} from '../../src/helpers/validators/orders'
import * as _ from '..'
import type { Order } from '../../../types'

// @ts-expect-error
const order: Omit<Order, 'id' | 'status'> = {
  item: 'a'.repeat(itemIdLen),
  quantity: 1
  // TODO: add recipient and address
}
const id = 'a'.repeat(orderIdLen)

const orderWithoutIdErr = suite('getOrderWithoutIdErr')

orderWithoutIdErr('is empty if order ok', () => {
  equal(getOrderWithoutIdErr('', order), '')
})

orderWithoutIdErr('is not empty if item wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getOrderWithoutIdErr('', { ...order, item: v }))
  })
  ok(getOrderWithoutIdErr('', { ...order, item: 'a'.repeat(itemIdLen - 1) }))
  ok(getOrderWithoutIdErr('', { ...order, item: 'a'.repeat(itemIdLen + 1) }))
})

orderWithoutIdErr('is not empty if status wrong', () => {
  _.wrongValuesForNumber.forEach(v => {
    ok(getOrderWithoutIdErr('', { ...order, status: v }, false, true))
  })
  ok(getOrderWithoutIdErr('', { ...order, status: 99 }, false, true))
})

orderWithoutIdErr('is not empty if quantity is wrong', () => {
  _.wrongValuesForNumber.forEach(v => {
    ok(getOrderWithoutIdErr('', { ...order, quantity: v }))
  })
  ok(getOrderWithoutIdErr('', { ...order, quantity: 0.9 }))
  ok(getOrderWithoutIdErr('', { ...order, quantity: -9 }))
  ok(getOrderWithoutIdErr('', { ...order, quantity: -1 }))
})

// TODO add recipient and address tests

orderWithoutIdErr.run()

const idErr = suite('getIdErr')

idErr('is empty if id ok', () => {
  equal(getIdErr(id), '')
})

idErr('is not empty if id is wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getIdErr(v))
  })
  ok(getIdErr('a'.repeat(orderIdLen - 1)))
  ok(getIdErr('a'.repeat(orderIdLen + 1)))
})

idErr.run()

const getErr = suite('getGetErr')

getErr('is empty if id ok', () => {
  equal(getGetErr({ id }), '')
})

getErr('is not empty if id is wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getGetErr({ id: v }))
  })
  ok(getGetErr({ id: 'a'.repeat(orderIdLen - 1) }))
  ok(getGetErr({ id: 'a'.repeat(orderIdLen + 1) }))
})

getErr.run()

const createErr = suite('getCreateErr')

createErr('is empty if order ok', () => {
  equal(getCreateErr(order), '')
})

createErr('is not empty if order item wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getCreateErr({ ...order, item: v }))
  })
  ok(getCreateErr({ ...order, item: 'a'.repeat(itemIdLen - 1) }))
  ok(getCreateErr({ ...order, item: 'a'.repeat(itemIdLen + 1) }))
})

createErr('is not empty if item quantity is wrong', () => {
  _.wrongValuesForNumber.forEach(v => {
    ok(getCreateErr({ ...order, quantity: v }))
  })
  ok(getCreateErr({ ...order, quantity: 0.9 }))
  ok(getCreateErr({ ...order, quantity: -9 }))
  ok(getCreateErr({ ...order, quantity: -1 }))
})

createErr.run()

const updateErr = suite('getUpdateErr')

updateErr('is empty if payload ok', () => {
  equal(getUpdateErr({ order, id }), '')
  equal(getUpdateErr({ order: {}, id }), '')
})

updateErr('is not empty if id is wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getUpdateErr({ order, id: v }))
  })
  ok(getUpdateErr({ order, id: 'a'.repeat(orderIdLen - 1) }))
  ok(getUpdateErr({ order, id: 'a'.repeat(orderIdLen + 1) }))
})

updateErr('is not empty if order wrong', () => {
  _.wrongValuesForObject.forEach(v => {
    ok(getUpdateErr({ id, order: v }))
  })
})

updateErr('is not empty if order item wrong', () => {
  _.optional(_.wrongValuesForNonBlankString).forEach(v => {
    ok(getUpdateErr({ id, order: { ...order, item: v } }))
  })
  ok(getUpdateErr({ id, order: { ...order, item: 'a'.repeat(itemIdLen - 1) } }))
  ok(getUpdateErr({ id, order: { ...order, item: 'a'.repeat(itemIdLen + 1) } }))
})

updateErr('is not empty if order quantity is wrong', () => {
  _.optional(_.wrongValuesForNumber).forEach(v => {
    ok(getUpdateErr({ id, order: { ...order, quantity: v } }))
  })
  ok(getUpdateErr({ id, order: { ...order, quantity: 0.9 } }))
  ok(getUpdateErr({ id, order: { ...order, quantity: -9 } }))
  ok(getUpdateErr({ id, order: { ...order, quantity: -1 } }))
})

updateErr('is not empty if order status wrong', () => {
  _.optional(_.wrongValuesForNumber).forEach(v => {
    ok(getUpdateErr({ id, order: { ...order, status: v } }))
  })
  ok(getUpdateErr({ id, order: { ...order, status: 99 } }))
})

updateErr.run()
