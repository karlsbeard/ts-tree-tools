export interface BaseTreeNode {
  id: string | number
  pid: string | number | null
  children?: BaseTreeNode[]
  [key: string]: any
}

interface Config {
  id: string
  pid: string
  children: string
}

const DEFAULT_CONFIG: Config = {
  id: 'id',
  pid: 'pid',
  children: 'children',
}

function getConfig(config: Partial<Config>): Config {
  return { ...DEFAULT_CONFIG, ...config }
}

export const TTs = {
  toTree<T extends BaseTreeNode>(list: T[], config: Partial<Config> = {}): T[] {
    const { id, pid, children } = getConfig(config)
    const map = new Map<string | number, T>()
    const result: T[] = []

    for (const item of list) {
      if (!item[children]) {
        item.children = []
      }
      map.set(item[id], item)
    }

    for (const item of list) {
      const parent = map.get(item[pid])
       ;(parent ? parent.children : result)?.push(item)
    }

    return result
  },
}
