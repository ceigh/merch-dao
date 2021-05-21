import { createClient, q } from '..'
import { userByUsernameIndex } from '../jobs/create-db/indexes'
import { getRefByIndex } from '../../helpers/db'

import type * as user from '../../../../types/api/user'
import type { UserDoc } from '../../../types'

const client = createClient()
const { CurrentIdentity, Get, Delete } = q

const userRefByUsername = (username: string): ReturnType<typeof getRefByIndex> =>
  getRefByIndex(userByUsernameIndex, username)

export async function getUser (_input: {}, secret: string):
Promise<user.Get.O> {
  const { data }: UserDoc = await client.query(
    Get(CurrentIdentity()), { secret })
  return data
}

export async function deleteUser (input: user.Delete.I, secret: string):
Promise<void> {
  await client.query(Delete(userRefByUsername(input.username)), { secret })
}
