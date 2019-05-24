const packageJson = require('./package.json')
const eslintJson = require('./eslintrc.json')

module.exports = {
  files: [
    {
      'name': 'package.json',
      'data': packageJson,
    },
    {
      'name': 'eslintrc.js',
      'data': eslintJson,
      'transform': (data) => {
        return 'module.exports = ' + data
      }
    }
  ],
  directories: [
  ],
}