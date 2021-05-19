import { nanoid } from 'nanoid'
import { createClient, q } from '..'
import { itemsCollection } from '../jobs/create-db/collections'
import { itemByIdIndex } from '../jobs/create-db/indexes'
import { itemIdLen } from '../../../../helpers/const'

import type Expr from 'faunadb/src/types/Expr'
import type * as items from '../../../../types/api/items'
import type { Item } from '../../../../types'

const client = createClient()
const { Create, Collection, Update, Delete, Match, Index } = q

const matchItemById = (id: Item['id']): Expr =>
  Match(Index(itemByIdIndex), id)

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
  await client.query(Update(matchItemById(input.id),
    { data: input.item }),
  { secret })
}

export async function deleteItem (input: items.Delete.I, secret: string):
Promise<void> {
  await client.query(Delete(matchItemById(input.id)), { secret })
}
