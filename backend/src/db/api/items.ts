import { nanoid } from 'nanoid'
import { createClient, q } from '..'
import { itemsCollection } from '../jobs/create-db/collections'
import { itemByIdIndex } from '../jobs/create-db/indexes'
import { itemIdLen } from '../../../../helpers/const'

import type Expr from 'faunadb/src/types/Expr'
import type { values } from 'faunadb/src/types/values'
import type * as items from '../../../../types/api/items'
import type { Item } from '../../../../types'

const client = createClient()
const {
  Create, Collection, Update, Delete, Match, Index, Map, Paginate, Lambda,
  Get, Documents, Select
} = q

const itemRefById = (id: Item['id']): Expr =>
  Select(['ref'], Get(Match(Index(itemByIdIndex), id)))

export async function get (_input: {}, secret?: string): Promise<items.Get.O> {
  // pagination can be added in the future
  const { data: items }: values.Page<Item> =
    await client.query(Map(
      Paginate(Documents(Collection(itemsCollection))),
      Lambda(i => Select(['data'], Get(i)))
    ), { secret })
  return { items }
}

export async function getVisible (): Promise<items.Get.O> {
  const { items } = await get({})
  const visibleItems = items.filter(i => i.isVisible)
  return { items: visibleItems }
}

export async function add (input: items.Add.I, secret: string): Promise<void> {
  const newItems: Item[] = input.items.map(i => ({
    ...i,
    id: nanoid(itemIdLen)
  }))

  // FIXME: bulk insert
  for (const i of newItems) {
    await client.query(Create(Collection(itemsCollection), { data: i }),
      { secret })
  }
}

export async function edit (input: items.Edit.I, secret: string):
Promise<void> {
  await client.query(Update(itemRefById(input.id), { data: input.item }),
    { secret })
}

export async function deleteItem (input: items.Delete.I, secret: string):
Promise<void> {
  await client.query(Delete(itemRefById(input.id)), { secret })
}
