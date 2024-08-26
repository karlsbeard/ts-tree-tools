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

  /**
   * @description find the first node by id in the tree
   * @param tree the tree structure
   * @param id the id which you want to find
   * @returns return the node
   */
  findNodeById(tree: BaseTreeNode[], id: string | number): BaseTreeNode | null {
    for (const node of tree) {
      if (node.id === id) {
        return node
      }
      if (node.children) {
        const result = TTs.findNodeById(node.children, id)
        if (result) {
          return result
        }
      }
    }
    return null
  },

  /**
   * @description find the first node by call function in the tree
   * @param tree the tree structure
   */

  findNodeByFunc(tree: BaseTreeNode[], func: (node: BaseTreeNode) => boolean): BaseTreeNode | null {
    for (const node of tree) {
      if (func(node)) {
        return node
      }
      if (node.children) {
        const result = TTs.findNodeByFunc(node.children, func)
        if (result) {
          return result
        }
      }
    }
    return null
  },

  /**
   * @description find the all nodes by call function in the tree
   * @param tree the tree structure
   */

  findAllNode(tree: BaseTreeNode[], func: (node: BaseTreeNode) => boolean): BaseTreeNode[] {
    const result: BaseTreeNode[] = []
    for (const node of tree) {
      if (func(node)) {
        result.push(node)
      }
      if (node.children) {
        result.push(...TTs.findAllNode(node.children, func))
      }
    }
    return result
  },
}

// TODO: setting your own tree config

// function makeHandlers() {
//   const handlers = {} as { [K in keyof typeof TTs]: typeof TTs[K] }
//   for (const key in TTs) {
//     if (key.startsWith('_'))
//       continue
//     handlers[key] = TTs[key]
//   }
//   return handlers
// }

// const handlers = makeHandlers()

// const treeHandler = {
//   ...handlers,
//   createInstance(config: Partial<Config> = {}) {
//     const obj = {}
//     for (const key in handlers) {
//       const func = handlers[key]
//       obj[key] = (...args) => func(...args, config)
//     }
//     return obj
//   },
// }

// if (typeof window !== 'undefined') {
//   // @ts-expect-error global variable
//   window.TTs = treeHandler
// }
// else if (typeof exports !== 'undefined') {
//   module.exports = treeHandler
// }

// export default treeHandler
