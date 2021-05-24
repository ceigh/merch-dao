import { nanoid } from 'nanoid'
import { createClient, q } from '..'
import { ordersCollection } from '../jobs/create-db/collections'
import { orderByIdIndex } from '../jobs/create-db/indexes'
import { getRefByIndex } from '../../helpers/db'
import { InternalError } from '../../helpers/server'
import { orderIdLen } from '../../../../helpers/const'
import { itemRefById, get as getItem, update as updateItem } from './items'

import type { values } from 'faunadb/src/types/values'
import type * as orders from '../../../../types/api/orders'
import type { Order, Item } from '../../../../types'
import type { OrderDoc } from '../../../types'

const client = createClient()
const {
  Create, Collection, Update, Map, Paginate, Lambda, Get, Documents, Select
} = q

export const orderRefById = (id: Order['id']):
ReturnType<typeof getRefByIndex> =>
  getRefByIndex(orderByIdIndex, id)

export async function getAll (_input: {}, secret: string):
Promise<orders.GetAll.O> {
  // pagination can be added in the future
  const { data: orders }: values.Page<Order> =
    await client.query(Map(
      Paginate(Documents(Collection(ordersCollection))),
      Lambda(i => Select(['data'], Get(i)))
    ), { secret })
  return { orders }
}

export async function get (input: orders.Get.I): Promise<orders.Get.O> {
  const { data }: OrderDoc = await client.query(Get(orderRefById(input.id)))
  return data
}

export async function create (input: orders.Create.I):
Promise<orders.Create.O> {
  const { item: itemId, quantity } = input

  // check for item id
  await client.query(Get(itemRefById(itemId)))

  // check that quantity <= real quantity
  let itemQuantity: Item['quantity']
  try {
    const item = await getItem({ id: itemId })
    itemQuantity = item.quantity
  } catch (e) { throw new InternalError(e) }
  if (itemQuantity !== -1) {
    if (itemQuantity === 0) { throw new Error('no more pieces left') }
    if (itemQuantity < quantity) {
      throw new Error(`quantity must be less or equal ${
      itemQuantity}, not ${quantity}`)
    }
  }

  // update item quantity
  try {
    await updateItem({
      id: itemId, item: { quantity: itemQuantity - quantity }
    })
  } catch (e) { throw new InternalError(e) }

  const id = nanoid(orderIdLen)
  const newOrder: Order = {
    ...input,
    id,
    status: '0'
  }

  try {
    await client.query(Create(Collection(ordersCollection), { data: newOrder }))
  } catch (e) {
    // revert item quantity if creation failed
    try {
      await updateItem({
        id: itemId, item: { quantity: itemQuantity }
      })
    } catch (e) { throw new InternalError(e) }
    throw new InternalError(e)
  }

  return { id }
}

export async function update (input: orders.Update.I, secret: string):
Promise<void> {
  await client.query(Update(orderRefById(input.id), { data: input.order }),
    { secret })
}

/*
export async function deleteItem (input: items.Delete.I, secret: string):
Promise<void> {
  await client.query(Delete(itemRefById(input.id)), { secret })
}
*/
