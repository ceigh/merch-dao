import { createClient, q } from '..'
import { usersCollection } from '../jobs/create-db/collections'
import { userByUsernameIndex } from '../jobs/create-db/indexes'
import { getRefByIndex } from '../../helpers/db'

import type { values } from 'faunadb/src/types/values'
import type * as user from '../../../../types/api/user'
import type { User } from '../../../../types'
import type { UserDoc } from '../../../types'

const client = createClient()
const {
  Paginate, Documents, Collection, Select, Lambda, CurrentIdentity, Get, Delete,
  Map
} = q

const userRefByUsername = (username: string): ReturnType<typeof getRefByIndex> =>
  getRefByIndex(userByUsernameIndex, username)

export async function getUser (_input: {}, secret: string):
Promise<user.Get.O> {
  const { data }: UserDoc = await client.query(
    Get(CurrentIdentity()), { secret })
  return data
}

export async function getAll (_input: {}, secret: string):
Promise<user.GetAll.O> {
  // pagination can be added in the future
  const { data: users }: values.Page<User> =
    await client.query(Map(
      Paginate(Documents(Collection(usersCollection))),
      Lambda(u => Select(['data'], Get(u)))
    ), { secret })
  return { users }
}

export async function deleteUser (input: user.Delete.I, secret: string):
Promise<void> {
  await client.query(Delete(userRefByUsername(input.username)), { secret })
}
