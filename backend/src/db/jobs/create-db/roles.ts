import { createClient, q } from '../..'

const { Collection, CreateRole, Query, Select, Get } = q

export default async function (key: string): Promise<void> {
  const client = createClient(key)

  await client.query(CreateRole({
    name: 'admin',
    membership: [{
      resource: Collection('users'),
      predicate: Query(ref => Select(['data', 'isAdmin'], Get(ref)))
    }],

    privileges: [
      {
        resource: Collection('users'),
        actions: {
          create: true,
          delete: true,
          read: true,
          write: true
        }
      },
      {
        resource: Collection('items'),
        actions: {
          create: true,
          delete: true,
          read: true,
          write: true
        }
      },
      {
        resource: Collection('orders'),
        actions: {
          create: true,
          delete: true,
          read: true,
          write: true
        }
      }
    ]
  }))
}
