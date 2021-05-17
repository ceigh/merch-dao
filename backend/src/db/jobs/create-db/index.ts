import { resolve } from 'path'
import { appendFileSync } from 'fs'
import { createClient, q } from '../..'

import createCollections from './collections'
import createIndexes from './indexes'
import createRoles from './roles'

import type { values } from 'faunadb/src/types/values'

type Ref = values.Ref

const client = createClient()
const dotenvFile = resolve(process.cwd(), '../.env')
let dbRef: Ref
const { log } = console
const { Delete, CreateDatabase, CreateKey } = q

async function revertChanges (err: Error): Promise<never> {
  if (dbRef !== undefined) {
    log('\nreverting changes...')
    try {
      await client.query(Delete(dbRef))
    } catch (e) { console.error(e.message) }
  }
  throw new Error(err.message)
}

async function createDb (): Promise<void> {
  log('creating database...')
  const { ref }: { ref: Ref } = await client.query(
    CreateDatabase({ name: 'merch-dao' }))
  dbRef = ref
  log('database created\n')
}

async function createKey (role: 'server' | 'admin'):
Promise<{ value: string, ref: Ref }> {
  log(`creating ${role} key...`)
  const { ref, secret }: { ref: Ref, secret: string } =
    await client.query(CreateKey({ role, database: dbRef }))
  if (role === 'server') {
    appendFileSync(dotenvFile, `\nMD_FN_KEY=${secret}\n`)
  }
  log(`${role} key created\n`)
  return { ref, value: secret }
}

async function main (): Promise<void> {
  await createDb()

  const adminKeyObj = await createKey('admin')
  const adminKey = adminKeyObj.value

  log('creating collections...')
  const collections = await createCollections(adminKey)
  log('collections created\n')

  log('creating indexes...')
  await createIndexes(adminKey, collections)
  log('indexes created\n')

  log('creating roles...')
  await createRoles(adminKey)
  log('roles created\n')

  log('deleting admin key...')
  await client.query(Delete(adminKeyObj.ref))
  log('admin key deleted\n')

  await createKey('server')
}

main().then(() => process.exit(0))
  .catch(async err => await revertChanges(err))
