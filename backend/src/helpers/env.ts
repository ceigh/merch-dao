const envPrefix = 'MD'

function throwEnvErr (envVarKey: string): never {
  throw new Error(`missing ${envVarKey} env variable`)
}

export function getFromEnv (envVarKey: string): never | string {
  const prefixedKey = `${envPrefix}_${envVarKey}`
  const value = process.env[prefixedKey]
  if (value !== undefined) return value
  throwEnvErr(prefixedKey)
}
