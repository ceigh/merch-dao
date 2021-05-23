import type { values } from 'faunadb/src/types/values'
import type { User, Item } from '../../types'

export type UserDoc = values.Document<User>
export type ItemDoc = values.Document<Item>
