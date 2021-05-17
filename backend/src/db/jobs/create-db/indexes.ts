import { createClient, q } from '../..'
import type { Collections } from './collections'
import type { Client } from 'faunadb'

const { CreateIndex } = q

export const adminByUsernameIndex = 'admin_by_username'
export const itemByIdIndex = 'item_by_id'
export const orderByIdIndex = 'order_by_id'

let client: Client
let collectionsGlobal: Collections

async function create (name: string): Promise<void> {
  const parts = name.split('_')
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

  await create(adminByUsernameIndex)
  await create(itemByIdIndex)
  await create(orderByIdIndex)
}
