// export interface BaseTreeNode {
//   id: string | number
//   pid: string | number | null
//   children?: BaseTreeNode[]
//   [key: string]: any
// }

export type _BaseTreeNode<ID extends string, PID extends string, CHILDREN extends string> = GenerateObjectType<ID, string | number> & GenerateObjectType<PID, string | number | null> & GenerateObjectTypeOptional<CHILDREN, _BaseTreeNode<ID, PID, CHILDREN>[]> & {
  [key: string]: any
}

export type BaseTreeNode<ID extends string, PID extends string, CHILDREN extends string> = Pretty<_BaseTreeNode<ID, PID, CHILDREN>>

export interface Config<ID extends string, PID extends string, CHILDREN extends string> {
  id: ID
  pid: PID
  children: CHILDREN
}

type GenerateObjectType<Name extends string, Type> = {
  [Property in Name]: Type;
}

type GenerateObjectTypeOptional<Name extends string, Type> = {
  [Property in Name]?: Type;
}

// type a = BaseTreeNode<'id','pid','children'>

type Pretty<O extends object> = {
  [T in keyof O]: O[T]
}
