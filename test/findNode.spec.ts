import { describe, expect, it } from 'vitest'
import { type BaseTreeNode, TTs } from '@/index'

describe('findNodeById', () => {
  it('find the first node by id in the tree', () => {
    const tree: BaseTreeNode[] = [{
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

    const labelRes = {
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
    }

    const resNode = TTs.findNodeById(tree, 2)

    expect(resNode).toEqual(labelRes)
  })
})

describe('findNodeByFunc', () => {
  it('find the first node by call function in the tree', () => {
    const tree: BaseTreeNode[] = [{
      id: 1,
      pid: null,
      children: [],
    }]

    const labelRes = {
      id: 1,
      pid: null,
      children: [],
    }

    const res = TTs.findNodeByFunc(tree, node => node.id === 1)

    expect(res).toEqual(labelRes)
  })

  it('return null when not found', () => {
    const tree: BaseTreeNode[] = [{
      id: 1,
      pid: null,
      children: [],
    }]

    const res = TTs.findNodeByFunc(tree, node => node.id === 2)

    expect(res).toBeNull()
  })

  it('return null when input tree is empty', () => {
    const tree: BaseTreeNode[] = []

    const res = TTs.findNodeByFunc(tree, node => node.id === 1)

    expect(res).toBeNull()
  })

  it('return target tree when target is root', () => {
    const tree: BaseTreeNode[] = [{
      id: 1,
      pid: null,
      children: [
        {
          id: 2,
          pid: 1,
          children: [],
        },
        {
          id: 3,
          pid: 1,
          children: [],
        },
      ],
    }]

    const labelRes = {
      id: 3,
      pid: 1,
      children: [],
    }

    const res = TTs.findNodeByFunc(tree, node => node.id === 3)

    expect(res).toEqual(labelRes)
  })
})

describe('findAllNode', () => {
  it('find the all nodes by call function in the tree', () => {
    const tree: BaseTreeNode[] = [{
      id: 1,
      pid: null,
      content: 'berry',
      children: [
        {
          id: 2,
          pid: 1,
          content: 'apple',
          children: [
            {
              id: 5,
              pid: 2,
              content: 'apple-1',
              children: [],
            },
          ],
        },
        {
          id: 3,
          pid: 1,
          content: 'banana',
          children: [
            {
              id: 4,
              pid: 3,
              content: 'banana-1',
              children: [],
            },
          ],
        },
      ],

    }]

    const labelRes = [
      {
        id: 2,
        pid: 1,
        content: 'apple',
        children: [
          {
            id: 5,
            pid: 2,
            content: 'apple-1',
            children: [],
          },
        ],
      },
      {
        id: 5,
        pid: 2,
        content: 'apple-1',
        children: [],
      },
      {
        id: 3,
        pid: 1,
        content: 'banana',
        children: [
          {
            id: 4,
            pid: 3,
            content: 'banana-1',
            children: [],
          },
        ],
      },
      {
        id: 4,
        pid: 3,
        content: 'banana-1',
        children: [],
      },
    ]

    const res = TTs.findAllNode(tree, node => node.content.includes('a'))

    expect(res).toEqual(labelRes)
  })
})
