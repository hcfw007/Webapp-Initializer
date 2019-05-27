const packageJson = require('./package.json')
const eslintJson = require('./eslintrc.json')
const webpackJson = require('./webpack.json')

module.exports = {
  files: [
    {
      'name': 'package.json',
      'data': packageJson,
    },
    {
      'name': 'eslintrc.js',
      'data': eslintJson,
      'transformers': ['disableEslint', 'exports']
    },
    {
      'name': 'webpack.config.js',
      'data': webpackJson,
      'transformers': ['removeDoubleQuotations', 'disableEslint', 'imports', 'exports'],
      'appendix': {
        'imports': [
          {
            'name': 'webpack',
            'package': 'webpack',
          },
          {
            'name': 'path',
            'package': 'path',
          },
          {
            'name': 'CleanWebpackPlugin',
            'package': 'clean-webpack-plugin',
          },
          {
            'name': 'CopyPlugin',
            'package': 'copy-webpack-plugin',
          },
        ]
      }
    }
  ],
  directories: [
    'src',
    'dist',
  ],
}