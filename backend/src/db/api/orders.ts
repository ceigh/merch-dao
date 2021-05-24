import { nanoid } from 'nanoid'
import { createClient, q } from '..'
import { ordersCollection } from '../jobs/create-db/collections'
import { orderByIdIndex } from '../jobs/create-db/indexes'
import { getRefByIndex } from '../../helpers/db'
import { orderIdLen } from '../../../../helpers/const'
import { itemRefById } from './items'

import type { values } from 'faunadb/src/types/values'
import type * as orders from '../../../../types/api/orders'
import type { Order } from '../../../../types'
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

export async function create (input: orders.Create.I, secret: string):
Promise<orders.Create.O> {
  const { item } = input
  if (item !== undefined) {
    await client.query(Get(itemRefById(item)))
  }

  const id = nanoid(orderIdLen)
  const newOrder: Order = {
    ...input,
    id,
    status: '0'
  }
  await client.query(Create(Collection(ordersCollection), { data: newOrder }),
    { secret })
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
