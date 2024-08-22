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
  /**
   *
   * @param list the list structure
   * @param config the tree config which you want to convert
   * @returns return the tree structure
   */
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
  /**
   *
   * @param tree the tree structure
   * @param config the list config which you want to convert
   * @returns return the list structure
   */
  toList<T extends BaseTreeNode>(tree: T[], config: Partial<Config> = {}): T[] {
    const { children } = getConfig(config)
    const result: T[] = []

    function loop(list: T[]) {
      for (const item of list) {
        const { [children]: _, ...node } = item
        result.push(node as T)
        if (item[children]) {
          loop(item[children])
        }
      }
    }
    loop(tree)

    return result
  },

}
