import { createClient, q } from '../..'
import {
  optionsCollection, usersCollection, itemsCollection, ordersCollection
} from './collections'
import {
  optionsByScopeIndex, itemByIdIndex, userByUsernameIndex, orderByIdIndex
} from './indexes'

const { Collection, Index, CreateRole, Query, Select, Get } = q

export default async function (key: string): Promise<void> {
  const client = createClient(key)

  await client.query(CreateRole({
    name: 'admin',
    membership: [{
      resource: Collection(usersCollection),
      predicate: Query(ref => Select(['data', 'isAdmin'], Get(ref)))
    }],

    privileges: [
      {
        resource: Collection(optionsCollection),
        actions: {
          create: true,
          delete: true,
          read: true,
          write: true
        }
      },
      {
        resource: Collection(usersCollection),
        actions: {
          create: true,
          delete: true,
          read: true,
          write: true
        }
      },
      {
        resource: Collection(itemsCollection),
        actions: {
          create: true,
          delete: true,
          read: true,
          write: true
        }
      },
      {
        resource: Collection(ordersCollection),
        actions: {
          create: true,
          delete: true,
          read: true,
          write: true
        }
      },

      {
        resource: Index(optionsByScopeIndex),
        actions: {
          unrestricted_read: true
        }
      },
      {
        resource: Index(itemByIdIndex),
        actions: {
          unrestricted_read: true
        }
      },
      {
        resource: Index(userByUsernameIndex),
        actions: {
          unrestricted_read: true
        }
      },
      {
        resource: Index(orderByIdIndex),
        actions: {
          unrestricted_read: true
        }
      }
    ]
  }))
}
