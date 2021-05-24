import type { values } from 'faunadb/src/types/values'
import type { User, Item, Options, Order } from '../../types'

export type UserDoc = values.Document<User>
export type ItemDoc = values.Document<Item>
export type OptionsDoc = values.Document<Options>
export type OrderDoc = values.Document<Order>
