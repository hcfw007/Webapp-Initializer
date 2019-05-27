const transformers = {
  disableEslint: (data) => {
    return '/* eslint-disable */\n' + data
  },

  exports: (data) => {
    return 'module.exports = ' + data
  },

  imports: (data, importArray) => {
    for (let item of importArray) {
      let importStatement = `const ${ item.name } = require('${ item.package }')`
      if (item.subDir) {
        for (let sub of item.objPath)
          importStatement += `.('${ sub }')`
      }
      importStatement += '\n\n'

      data = importStatement + data
    }

    return data
  },

  removeDoubleQuotations: (data) => {
    return data.replace(/"/g, '') 
  }
}

const transform = (data, transformList, appendix = {}) => {
  let _transformList = [...transformList].reverse()
  for (let item of _transformList) {
    data = transformers[item](data, appendix[item])
  }

  return data
}

module.exports = {
  transformers,
  transform,
}