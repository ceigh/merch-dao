import { createClient, q } from '../..'
import type { values } from 'faunadb/src/types/values'

type Ref = values.Ref
export type Collections = Record<string, Ref>

const { CreateCollection } = q

export default async function (key: string): Promise<Collections> {
  const client = createClient(key)
  const collections = [
    { name: 'admins' },
    { name: 'items' },
    { name: 'orders' }
  ]

  const entries = await Promise.all(collections.map(async c => {
    const { ref }: { ref: Ref } =
      await client.query(CreateCollection(c))
    return [c.name, ref]
  }))

  return Object.fromEntries(entries)
}
