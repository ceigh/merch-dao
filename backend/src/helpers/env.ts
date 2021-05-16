const prefix = 'MD'

function throwEnvErr (key: string): never {
  throw new Error(`missing ${key} env variable`)
}

export function getFromEnv (key: string, fallback?: string): never | string {
  const prefixedKey = `${prefix}_${key}`
  const value = process.env[prefixedKey]
  if (value !== undefined) return value
  if (fallback !== undefined) return fallback
  throwEnvErr(prefixedKey)
}
