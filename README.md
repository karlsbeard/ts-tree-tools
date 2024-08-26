# TS Tools for processing tree structure

## Introduction

Ts-Tree-Tools(TTs) is based on [tree-tool](https://github.com/wintc23/js-tree-tool), with no dependencies and small size.

## How to install

```bash
# 使用pnpm
pnpm install ts-tree-tools

# 使用npm
npm install ts-tree-tools

# 使用yarn
yarn install ts-tree-tools
```

## How to use

### Import

```js
// commonjs
const TTs = require('ts-tree-tools')

// es6
import TTs from 'ts-tree-tools'
```

### Usage

#### API

The following methods are available in this library:

| Method | Description |
| ------ | ----------- |
| `toTree` | Converts a flat list structure into a hierarchical tree structure. |
| `toList` | Converts a hierarchical tree structure back into a flat list structure. |
| `findNodeByIdBFS` | Finds the first node by its `id` using a breadth-first search (BFS) approach. |
| `findNodeByIdDFS` | Finds the first node by its `id` using a depth-first search (DFS) approach. |
| `findNodeByFunc` | Finds the first node that satisfies a given function condition in the tree. |
| `findAllNode` | Finds all nodes that satisfy a given function condition in the tree. |
| `findPathByIdBFS` | Finds the path from the root to the first node with the specified `id` using BFS. |
| `findPathByIdDFS` | Finds the path from the root to the first node with the specified `id` using DFS. |
| `findPathByFuncBFS` | Finds the path from the root to the first node that satisfies a given function using BFS. |
| `findPathByFuncDFS` | Finds the path from the root to the first node that satisfies a given function using DFS. |
| `findPathAll` | Finds all paths from the root to all nodes that satisfy a given function condition in the tree. |