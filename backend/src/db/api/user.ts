import { createClient, q } from '..'

import type * as user from '../../../../types/api/user'
import type { UserDoc } from '../../../types'

const client = createClient()
const { CurrentIdentity, Get } = q

export async function getUser (_input: {}, secret: string):
Promise<user.Get.O> {
  const { data }: UserDoc = await client.query(
    Get(CurrentIdentity()), { secret })
  return data
}
