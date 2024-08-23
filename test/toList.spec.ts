import { describe, expect, it } from 'vitest'
import type { BaseTreeNode } from '@/main'
import { TTs } from '@/main'

interface TreeNode extends BaseTreeNode {

}

describe('toList', () => {
  it('convert a tree to a flat structure', () => {
    const tree: TreeNode[] = [{
      id: 1,
      pid: null,
      name: 'root',
      children: [
        {
          id: 2,
          pid: 1,
          name: 'child1',
          children: [
            {
              id: 4,
              pid: 2,
              name: 'child1-1',
              children: [],
            },
          ],
        },
        {
          id: 3,
          pid: 1,
          name: 'child2',
          children: [],
        },
      ],
    }]

    const list = TTs.toList(tree)

    expect(list).toEqual(
      [
        { id: 1, pid: null, name: 'root' },
        { id: 2, pid: 1, name: 'child1' },
        { id: 4, pid: 2, name: 'child1-1' },
        { id: 3, pid: 1, name: 'child2' },
      ],
    )
  })

  it('return an empty array when input tree is empty', () => {
    const tree: TreeNode[] = []
    const list = TTs.toList(tree)
    expect(list).toEqual([])
  })

  it('handle multiple root nodes correctly', () => {
    const tree: TreeNode[] = [
      { id: 1, pid: null, name: 'root 1' },
      { id: 2, pid: null, name: 'root 2', children: [
        { id: 3, pid: 2, name: 'child 2.1' },
      ] },
    ]
    const list = TTs.toList(tree)
    expect(list).toEqual([
      { id: 1, pid: null, name: 'root 1' },
      { id: 2, pid: null, name: 'root 2' },
      { id: 3, pid: 2, name: 'child 2.1' },
    ])
  })
})
