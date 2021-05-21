import { q } from '../db'
import type Expr from 'faunadb/src/types/Expr'

const { Match, Index, Get, Select } = q

export function getRefByIndex (index: string, value: any): Expr {
  return Select(['ref'], Get(Match(Index(index), value)))
}
