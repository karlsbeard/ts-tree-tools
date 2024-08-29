import type { Config } from './type'

const DEFAULT_CONFIG: Config<'id', 'pid', 'children'> = {
  id: 'id',
  pid: 'pid',
  children: 'children',
}

export function getConfig<ID extends string, PID extends string, CHILDREN extends string>(config: Partial<Config<ID, PID, CHILDREN>>): Config<ID, PID, CHILDREN> {
  return { ...DEFAULT_CONFIG, ...config } as Config<ID, PID, CHILDREN>
}
