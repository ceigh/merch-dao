import type { values } from 'faunadb/src/types/values'
import type { User, Item, Options } from '../../types'

export type UserDoc = values.Document<User>
export type ItemDoc = values.Document<Item>
export type OptionsDoc = values.Document<Options>
