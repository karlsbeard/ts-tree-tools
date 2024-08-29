import type { BaseTreeNode, Config } from './type'
import { getConfig } from './util'

/**
 * @description convert the list structure to tree structure
 * @param list the list structure
 * @param config the tree config which you want to convert
 * @returns return the tree structure
 */
export function toTree<T extends BaseTreeNode<ID, PID, CHILDREN>, ID extends string = 'id', PID extends string = 'pid', CHILDREN extends string = 'children'>(list: T[], config: Partial<Config<ID, PID, CHILDREN>> = {}): T[] {
  const { id, pid, children } = getConfig<ID, PID, CHILDREN>(config)
  const map = new Map<string | number, T>()
  const result: T[] = []

  for (const item of list) {
    if (!item[children]) {
      item[children] = [] as any
    }
    map.set(item[id], item)
  }

  for (const item of list) {
    const parent = map.get(item[pid]);
    (parent ? parent.children : result)?.push(item)
  }

  return result
}
/**
 * @description convert the tree structure to list structure
 * @param tree the tree structure
 * @param config the list config which you want to convert
 * @returns return the list structure
 */
export function toList<T extends BaseTreeNode>(tree: T[], config: Partial<Config> = {}): T[] {
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
}
