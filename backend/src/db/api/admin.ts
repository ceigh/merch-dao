import { createClient, q } from '..'
import { usersCollection } from '../jobs/create-db/collections'
import { getAll as getAllUsers } from './user'

import type * as admin from '../../../../types/api/admin'
import type * as user from '../../../../types/api/user'
import type { User } from '../../../../types'

const client = createClient()
const { Create, Collection } = q

export async function create (input: admin.Create.I, secret: string):
Promise<void> {
  const newAdmin: User = {
    username: input.username,
    isAdmin: true
  }

  await client.query(
    Create(Collection(usersCollection),
      { credentials: { password: input.password }, data: newAdmin }),
    { secret })
}

export async function getAll (_input: {}, secret: string):
Promise<user.GetAll.O> {
  const { users } = await getAllUsers({}, secret)
  const admins = users.filter(u => u.isAdmin)
  return { users: admins }
}
