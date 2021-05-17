import { createClient, q } from '..'
import { adminsCollection } from '../jobs/create-db/collections'
import { adminByUsernameIndex } from '../jobs/create-db/indexes'

import type * as admin from '../../../../types/api/admin'
import type { Admin } from '../../../../types'
import type { values } from 'faunadb/src/types/values'

type Ref = values.Ref
interface LoginRes { instance: Ref, secret: string }

const client = createClient()
const {
  Create, Collection, Index, Login, Match,
  Update, Logout, CurrentIdentity, Identify
} = q

export async function addAdmin (input: admin.AddAdmin.I, secret: string):
Promise<void> {
  const newAdmin: Admin = { username: input.username }

  await client.query(
    Create(Collection(adminsCollection),
      { credentials: { password: input.password }, data: newAdmin }),
    { secret })
}

export async function signIn (input: admin.SignIn.I): Promise<admin.SignIn.O> {
  const { secret }: LoginRes =
    await client.query(Login(
      Match(Index(adminByUsernameIndex), input.username),
      { password: input.password }))

  return { secret }
}

export async function signOut (input: admin.SignOut.I, secret: string):
Promise<void> {
  await client.query(Logout(input.allTokens ?? false), { secret })
}

export async function updatePassword (input: admin.UpdatePassword.I,
  secret: string): Promise<void> {
  const identity = CurrentIdentity()

  const oldPasswordOk: boolean = await client.query(
    Identify(identity, input.oldPassword), { secret })
  if (!oldPasswordOk) throw new Error('неверный старый пароль')

  await client.query(Update(identity,
    { credentials: { password: input.newPassword } }), { secret })

  const doSignOut = input.signOut ?? false
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (doSignOut) await signOut({ allTokens: true }, secret)
}
