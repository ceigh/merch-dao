import * as v from '.'
import type { Data } from '../server'

export function getCreateErr (data: Data): string {
  const usernameErr = v.getNonBlankStringErr(data.username, 'username')
  if (usernameErr !== '') return usernameErr

  const passwordErr = v.getNonBlankStringErr(data.password, 'password')
  if (passwordErr !== '') return passwordErr

  return ''
}
