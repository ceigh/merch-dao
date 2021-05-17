import { createClient, q } from '../..'

const { Collection, CreateRole } = q

export default async function (key: string): Promise<void> {
  const client = createClient(key)

  await client.query(CreateRole({
    name: 'admin',
    membership: [{
      resource: Collection('admins')
    }],

    privileges: [
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
          delete: true,
          read: true,
          write: true
        }
      }
    ]
  }))
}
