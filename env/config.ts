import { EnvEnum } from '~/env/env'

export function getConfig() {
  const config = useRuntimeConfig()
  const env = config.public.env as EnvEnum

  const serverConfig = {
    env,
  }

  switch (env) {
    case 'development': {
      break
    }
    case 'test': {
      break
    }
    case 'pre': {
      break
    }
    case 'production': {
      break
    }
  }

  return serverConfig
}
