import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['**.js', 'dist', 'node_modules', 'README.md'],
  javascript: false,
})
