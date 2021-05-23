import { createClient, q } from '..'
import { optionsCollection } from '../jobs/create-db/collections'
import { optionsByScopeIndex } from '../jobs/create-db/indexes'
import { getRefByIndex } from '../../helpers/db'
import { itemRefById } from './items'

import type * as options from '../../../../types/api/options'
import type { Options } from '../../../../types'
import type { OptionsDoc } from '../../../types'

const client = createClient()
const { Get, Create, Collection, Update } = q

const optionsRefByScope = (scope: Options['scope']):
ReturnType<typeof getRefByIndex> =>
  getRefByIndex(optionsByScopeIndex, scope)

export async function create (input: options.Create.I, secret: string):
Promise<void> {
  await client.query(Create(Collection(optionsCollection), { data: input }),
    { secret })
}

export async function get (input: options.Get.I): Promise<options.Get.O> {
  const { data }: OptionsDoc = await client.query(Get(
    optionsRefByScope(input.scope)))
  return data
}

export async function update (input: options.Update.I,
  secret: string): Promise<void> {
  const { scope, options } = input

  const { currentItem } = options
  if (currentItem !== undefined) {
    await client.query(Get(itemRefById(currentItem)))
  }

  await client.query(Update(optionsRefByScope(scope), { data: options }),
    { secret })
}
