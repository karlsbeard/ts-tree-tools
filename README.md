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

| Methods | Description |
| ----    | ----        |
| toTree   | convert the list structure to tree structure |
| toList      | convert the tree structure to list structure |
| findNodeById       | find the first node by id in the tree |
| findNodeByFunc    | find the first node by call function in the tree |
| findAllNode | find the all nodes by call function in the tree |
