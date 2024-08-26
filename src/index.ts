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
   * @description convert the list structure to tree structure
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
   * @description convert the tree structure to list structure
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
  findNodeByIdBFS<T extends BaseTreeNode>(tree: T[], id: string | number): T | null {
    if (!tree.length)
      return null

    const queue: T[] = [...tree]

    while (queue.length) {
      const node = queue.shift()

      if (node?.id === id) {
        return node
      }

      if (node?.children) {
        queue.push(...node.children as T[])
      }
    }

    return null
  },

  findNodeByIdDFS<T extends BaseTreeNode>(tree: T[], id: string | number): T | null {
    for (const node of tree) {
      if (node.id === id) {
        return node
      }

      if (node.children) {
        const children = node.children as T[]
        const result = TTs.findNodeByIdDFS(children, id)
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

  findNodeByFunc<T extends BaseTreeNode>(tree: T[], func: (node: T) => boolean): T | null {
    for (const node of tree) {
      if (func(node)) {
        return node
      }
      if (node.children) {
        const children = node.children as T[]
        const result = TTs.findNodeByFunc(children, func)
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

  findAllNode<T extends BaseTreeNode>(tree: T[], func: (node: T) => boolean): T[] {
    const result: T[] = []
    for (const node of tree) {
      if (func(node)) {
        result.push(node)
      }
      if (node.children) {
        const children = node.children as T[]
        result.push(...TTs.findAllNode(children, func))
      }
    }
    return result
  },

  /**
   * @description find the first path by id in the tree
   * @param tree the tree structure
   * @param id the id which you want to find
   * @returns return the path
   */

  findPathByIdBFS<T extends BaseTreeNode>(tree: T[], id: string | number): T[] | null {
    if (!tree.length)
      return null

    const queue: { node: T, path: T[] }[] = []

    for (const node of tree) {
      queue.push({ node, path: [node] })
    }

    while (queue.length) {
      const { node, path } = queue.shift()!
      if (node.id === id) {
        return path
      }

      if (node.children) {
        const children = node.children as T[]
        for (const child of children) {
          queue.push({ node: child, path: [...path, child] })
        }
      }
    }

    return null
  },

  findPathByIdDFS<T extends BaseTreeNode>(tree: T[], id: string | number): T[] | null {
    const path: T[] = []

    function dfs(nodes: T[]): boolean {
      for (const node of nodes) {
        path.push(node)
        if (node.id === id) {
          return true
        }
        if (node.children) {
          const children = node.children as T[]
          if (dfs(children)) {
            return true
          }
        }
        path.pop()
      }
      return false
    }

    return dfs(tree) ? path : null
  },

  /**
   * @description find the first path by func in the tree within BFS
   * @param tree the tree structure
   * @param func the function which you want to find
   * @returns return the path, maybe the null
   */

  findPathByFuncBFS<T extends BaseTreeNode>(tree: T[], func: (node: T) => boolean): T[] | null {
    const path: T[] = []
    const list: T[] = [...tree]
    const visitedSet = new Set<T>()

    while (list.length) {
      const node = list[0]
      if (visitedSet.has(node)) {
        path.pop()
        list.shift()
      }
      else {
        visitedSet.add(node)
        const children = node.children as T[] | undefined
        if (children) {
          list.unshift(...children)
        }
        path.push(node)
        if (func(node)) {
          return path
        }
      }
    }
    return null
  },

  /**
   * @description find the first path by func in the tree within DFS
   * @param tree the tree structure
   * @param func the function which you want to find
   * @returns return the path
   */

  findPathByFuncDFS<T extends BaseTreeNode>(tree: T[], func: (node: T) => boolean): T[] | null {
    const path: T[] = []
    for (const node of tree) {
      if (func(node)) {
        return path
      }
      if (node.children) {
        const children = node.children as T[]
        const path = TTs.findPathByFuncDFS(children, func)
        if (path) {
          return path
        }
      }
    }
    return null
  },

  /**
   * @description find all path by func in the tree
   * @param tree  the tree structure
   * @param func the function which you want to find
   * @returns all path which you want to find
   */

  findPathAll<T extends BaseTreeNode>(tree: T[], func: (node: T) => boolean): T[][] {
    const allPath: T[][] = []
    for (const node of tree) {
      if (func(node)) {
        allPath.push([node])
      }
      if (node.children) {
        const children = node.children as T[]
        const childPaths = TTs.findPathAll(children, func)
        for (const childPath of childPaths) {
          allPath.push([node, ...childPath])
        }
      }
    }
    return allPath
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
