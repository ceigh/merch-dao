import * as v from '.'
import type { Data } from '../server'

export async function getAddAdminErr (data: Data): Promise<string> {
  const usernameErr = v.getNonBlankStringErr(data.username, 'username')
  if (usernameErr !== '') return usernameErr

  const passwordErr = v.getNonBlankStringErr(data.password, 'password')
  if (passwordErr !== '') return passwordErr

  return ''
}

export const getSignInErr = getAddAdminErr

export function getSignOutErr (data: Data): string {
  const { allTokens } = data
  if (allTokens !== undefined) {
    const booleanErr = v.getBooleanErr('allTokens', allTokens)
    if (booleanErr !== '') return booleanErr
  }
  return ''
}

export function getUpdatePasswordErr (data: Data): string {
  const { oldPassword, newPassword } = data
  const oldPasswordKey = 'old password'
  const newPasswordKey = 'new password'

  const oldPasswordErr = v
    .getNonBlankStringErr(oldPassword, oldPasswordKey)
  if (oldPasswordErr !== '') return oldPasswordErr

  const newPasswordErr = v
    .getNonBlankStringErr(newPassword, newPasswordKey)
  if (newPasswordErr !== '') return newPasswordErr

  if (oldPassword === newPassword) {
    return `${oldPasswordKey} is equal to ${newPasswordKey}`
  }

  const { signOut } = data
  if (signOut !== undefined) {
    const booleanErr = v.getBooleanErr('signOut', signOut)
    if (booleanErr !== '') return booleanErr
  }

  return ''
}
