import { describe, expect, it } from 'vitest'
import type { BaseTreeNode } from '@/index'
import { TTs } from '@/index'

interface CustomNode extends BaseTreeNode {
  name: string
}

describe('toTree', () => {
  it('converts a flat list to a tree structure', () => {
    const list: CustomNode[] = [
      { id: 1, pid: null, name: 'root' },
      { id: 2, pid: 1, name: 'child1' },
      { id: 3, pid: 1, name: 'child2' },
      { id: 4, pid: 2, name: 'child1-1' },
    ]
    const tree = TTs.toTree(list)

    expect(tree).toEqual([
      {
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
      },
    ])
  })

  it('return an empty array when input list is empty', () => {
    const list: CustomNode[] = []
    const tree = TTs.toTree(list)
    expect(tree).toEqual([])
  })

  it('handle multiple root nodes correctly', () => {
    const list: CustomNode[] = [
      { id: 1, pid: null, name: 'root 1' },
      { id: 2, pid: null, name: 'root 2' },
      { id: 3, pid: 1, name: 'child 1.1' },
    ]
    const tree = TTs.toTree(list)

    expect(tree).toEqual([
      {
        id: 1,
        pid: null,
        name: 'root 1',
        children: [
          {
            id: 3,
            pid: 1,
            name: 'child 1.1',
            children: [],
          },
        ],
      },
      {
        id: 2,
        pid: null,
        name: 'root 2',
        children: [],
      },
    ])
  })
})
