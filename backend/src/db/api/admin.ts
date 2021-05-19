import { createClient, q } from '..'
import { usersCollection } from '../jobs/create-db/collections'

import type * as admin from '../../../../types/api/admin'
import type { User } from '../../../../types'

const client = createClient()
const { Create, Collection } = q

export async function add (input: admin.Add.I, secret: string): Promise<void> {
  const newAdmin: User = {
    username: input.username,
    isAdmin: true
  }

  await client.query(
    Create(Collection(usersCollection),
      { credentials: { password: input.password }, data: newAdmin }),
    { secret })
}
