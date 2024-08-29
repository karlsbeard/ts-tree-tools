import type { BaseTreeNode } from './type'

/**
 * @description find the first node by id in the tree
 * @param tree the tree structure
 * @param id the id which you want to find
 * @returns return the node
 */
export function findNodeByIdBFS<T extends BaseTreeNode>(tree: T[], id: string | number): T | null {
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
}

export function findNodeByIdDFS<T extends BaseTreeNode>(tree: T[], id: string | number): T | null {
  for (const node of tree) {
    if (node.id === id) {
      return node
    }

    if (node.children) {
      const children = node.children as T[]
      const result = findNodeByIdDFS(children, id)
      if (result) {
        return result
      }
    }
  }
  return null
}

/**
 * @description find the first node by call function in the tree
 * @param tree the tree structure
 */

export function findNodeByFunc<T extends BaseTreeNode>(tree: T[], func: (node: T) => boolean): T | null {
  for (const node of tree) {
    if (func(node)) {
      return node
    }
    if (node.children) {
      const children = node.children as T[]
      const result = findNodeByFunc(children, func)
      if (result) {
        return result
      }
    }
  }
  return null
}

/**
 * @description find the all nodes by call function in the tree
 * @param tree the tree structure
 */

export function findAllNode<T extends BaseTreeNode>(tree: T[], func: (node: T) => boolean): T[] {
  const result: T[] = []
  for (const node of tree) {
    if (func(node)) {
      result.push(node)
    }
    if (node.children) {
      const children = node.children as T[]
      result.push(...findAllNode(children, func))
    }
  }
  return result
}

/**
 * @description find the first path by id in the tree
 * @param tree the tree structure
 * @param id the id which you want to find
 * @returns return the path
 */

export function findPathByIdBFS<T extends BaseTreeNode>(tree: T[], id: string | number): T[] | null {
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
}

export function findPathByIdDFS<T extends BaseTreeNode>(tree: T[], id: string | number): T[] | null {
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
}

/**
 * @description find the first path by func in the tree within BFS
 * @param tree the tree structure
 * @param func the function which you want to find
 * @returns return the path, maybe the null
 */

export function findPathByFuncBFS<T extends BaseTreeNode>(tree: T[], func: (node: T) => boolean): T[] | null {
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
}

/**
 * @description find the first path by func in the tree within DFS
 * @param tree the tree structure
 * @param func the function which you want to find
 * @returns return the path
 */

export function findPathByFuncDFS<T extends BaseTreeNode>(tree: T[], func: (node: T) => boolean): T[] | null {
  const path: T[] = []
  for (const node of tree) {
    if (func(node)) {
      return path
    }
    if (node.children) {
      const children = node.children as T[]
      const path = findPathByFuncDFS(children, func)
      if (path) {
        return path
      }
    }
  }
  return null
}

/**
 * @description find all path by func in the tree
 * @param tree  the tree structure
 * @param func the function which you want to find
 * @returns all path which you want to find
 */

export function findPathAll<T extends BaseTreeNode>(tree: T[], func: (node: T) => boolean): T[][] {
  const allPath: T[][] = []
  for (const node of tree) {
    if (func(node)) {
      allPath.push([node])
    }
    if (node.children) {
      const children = node.children as T[]
      const childPaths = findPathAll(children, func)
      for (const childPath of childPaths) {
        allPath.push([node, ...childPath])
      }
    }
  }
  return allPath
}
