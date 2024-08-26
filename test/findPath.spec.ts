import { describe, expect, it } from 'vitest'
import { TTs } from '@/index'

const { findPathAll, findPathByFuncBFS, findPathByIdBFS } = TTs

describe('findPath', () => {
  it('findPathAll', () => {
    const tree = [
      {
        id: 1,
        pid: null,
        children: [
          {
            id: 2,
            pid: 1,
            children: [
              {
                id: 3,
                pid: 2,
              },
            ],
          },
        ],
      },
    ]
    const labelRes = [[tree[0], tree[0].children![0], tree[0].children![0].children![0]]]
    const result = findPathAll(tree, node => node.id === 3)
    expect(result).toEqual(labelRes)
  })

  it('findPathByFuncBFS', () => {
    const tree = [
      {
        id: 1,
        pid: null,
        children: [
          {
            id: 2,
            pid: 1,
            children: [
              {
                id: 3,
                pid: 2,
              },
            ],
          },
        ],
      },
    ]
    const labelRes = [tree[0], tree[0].children![0], tree[0].children![0].children![0]]
    const result = findPathByFuncBFS(tree, node => node.id === 3)
    expect(result).toEqual(labelRes)
  })

  it('findPathById', () => {
    const tree = [
      {
        id: 1,
        pid: null,
        children: [
          {
            id: 2,
            pid: 1,
            children: [
              {
                id: 3,
                pid: 2,
              },
            ],
          },
        ],
      },
    ]
    const labelRes = [tree[0].children![0].children![0]]
    const result = findPathByIdBFS(tree, 3)
    expect(result).toEqual(labelRes)
  })
})
