import { createClient, q } from '..'
import { userByUsernameIndex } from '../jobs/create-db/indexes'

import type * as auth from '../../../../types/api/auth'
import type { values } from 'faunadb/src/types/values'

type Ref = values.Ref
interface LoginRes { instance: Ref, secret: string }

const client = createClient()
const {
  Index, Login, Match, Update, Logout, CurrentIdentity, Identify
} = q

export async function signIn (input: auth.SignIn.I): Promise<auth.SignIn.O> {
  const { secret }: LoginRes =
    await client.query(Login(
      Match(Index(userByUsernameIndex), input.username),
      { password: input.password }))

  return { secret }
}

export async function signOut (input: auth.SignOut.I, secret: string):
Promise<void> {
  await client.query(Logout(input.allTokens ?? false), { secret })
}

export async function updatePassword (input: auth.UpdatePassword.I,
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
