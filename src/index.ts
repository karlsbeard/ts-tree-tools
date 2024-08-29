export * from './base'
export * from './find'

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
