import * as v from '.'
import type { Data } from '../server'

export function getDeleteErr (data: Data): string {
  const usernameNonBlankStringErr =
    v.getNonBlankStringErr(data.username, 'username')
  if (usernameNonBlankStringErr !== '') return usernameNonBlankStringErr

  return ''
}
