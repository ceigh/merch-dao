import { suite } from 'uvu'
import { equal, ok } from 'uvu/assert'
import { itemIdLen, orderIdLen } from '../../../helpers/const'
import {
  getOrderWithoutIdErr, getIdErr, getCreateErr, getUpdateStatusErr, getGetErr
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
const status = '0'

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

const updateStatusErr = suite('getUpdateStatusErr')

updateStatusErr('is empty if payload ok', () => {
  equal(getUpdateStatusErr({ status, id }), '')
})

updateStatusErr('is not empty if id is wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getUpdateStatusErr({ status, id: v }))
  })
  ok(getUpdateStatusErr({ status, id: 'a'.repeat(orderIdLen - 1) }))
  ok(getUpdateStatusErr({ status, id: 'a'.repeat(orderIdLen + 1) }))
})

updateStatusErr('is not empty if status wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getUpdateStatusErr({ id, status: v }))
  })
  ok(getUpdateStatusErr({ id, status: '99' }))
})

updateStatusErr.run()
