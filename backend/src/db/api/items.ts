import { nanoid } from 'nanoid'
import { createClient, q } from '..'
import { itemsCollection } from '../jobs/create-db/collections'
import { itemByIdIndex } from '../jobs/create-db/indexes'
import { getRefByIndex } from '../../helpers/db'
import { itemIdLen } from '../../../../helpers/const'

import type { values } from 'faunadb/src/types/values'
import type * as items from '../../../../types/api/items'
import type { Item } from '../../../../types'
import type { ItemDoc } from '../../../types'

const client = createClient()
const {
  Create, Collection, Update, Delete, Map, Paginate, Lambda, Get, Documents,
  Select
} = q

export const itemRefById = (id: Item['id']): ReturnType<typeof getRefByIndex> =>
  getRefByIndex(itemByIdIndex, id)

export async function getAll (_input: {}, secret: string):
Promise<items.GetAll.O> {
  // pagination can be added in the future
  const { data: items }: values.Page<Item> =
    await client.query(Map(
      Paginate(Documents(Collection(itemsCollection))),
      Lambda(i => Select(['data'], Get(i)))
    ), { secret })
  return { items }
}

export async function get (input: items.Get.I): Promise<items.Get.O> {
  const { data }: ItemDoc = await client.query(Get(itemRefById(input.id)))
  return data
}

export async function create (input: items.Create.I, secret: string): Promise<void> {
  const newItem: Item = {
    ...input,
    id: nanoid(itemIdLen)
  }
  await client.query(Create(Collection(itemsCollection), { data: newItem }),
    { secret })
}

export async function update (input: items.Update.I, secret?: string):
Promise<void> {
  await client.query(Update(itemRefById(input.id), { data: input.item }),
    { secret })
}

export async function deleteItem (input: items.Delete.I, secret: string):
Promise<void> {
  await client.query(Delete(itemRefById(input.id)), { secret })
}
