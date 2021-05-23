import { createClient, q } from '../..'
import type { Collections } from './collections'
import type { Client } from 'faunadb'

const { CreateIndex } = q

export const optionsByScopeIndex = 'option_by_scope'
export const userByUsernameIndex = 'user_by_username'
export const itemByIdIndex = 'item_by_id'
export const orderByIdIndex = 'order_by_id'

let client: Client
let collectionsGlobal: Collections

async function create (name: string): Promise<void> {
  const parts = name.split('_') // [collection, 'by', prop]
  await client.query(CreateIndex({
    name,
    source: collectionsGlobal[`${parts[0]}s`],
    terms: [{ field: ['data', parts[2]] }],
    unique: true
  }))
}

export default async function (key: string,
  collections: Collections): Promise<void> {
  client = createClient(key)
  collectionsGlobal = collections

  await create(optionsByScopeIndex)
  await create(userByUsernameIndex)
  await create(itemByIdIndex)
  await create(orderByIdIndex)
}
