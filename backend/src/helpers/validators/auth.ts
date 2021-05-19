import * as v from '.'
import { getAddErr as getAddAdminErr } from './admin'
import type { Data } from '../server'

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
  const oldPasswordKey = 'старый пароль'
  const newPasswordKey = 'новый пароль'

  const oldPasswordErr = v
    .getNonBlankStringErr(oldPassword, oldPasswordKey)
  if (oldPasswordErr !== '') return oldPasswordErr

  const newPasswordErr = v
    .getNonBlankStringErr(newPassword, newPasswordKey)
  if (newPasswordErr !== '') return newPasswordErr

  if (oldPassword === newPassword) {
    return 'одинаковые пароли'
  }

  const { signOut } = data
  if (signOut !== undefined) {
    const booleanErr = v.getBooleanErr('signOut', signOut)
    if (booleanErr !== '') return booleanErr
  }

  return ''
}
