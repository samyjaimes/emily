import get from 'lodash/get'
import Config from './default'

export const getConfig = (key: string, defaultValue?: unknown): unknown => {
  return get(Config, key, defaultValue)
}
