const inquirer = require('inquirer')
const process = require('process')
const path = require('path')

module.exports = {

  askProjectInfo: () => {

    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Name of the project?',
        default: process.cwd().split(path.sep)[process.cwd().split(path.sep).length - 1],
        validate: function(value) {
          let rule = /^[a-zA-Z-_]*$/
          if (rule.test(value)) {
            return true
          }
          return 'Invalid project name.'
        }
      }, {
        type: 'list',
        name: 'type',
        message: 'Type of the project',
        choices: ['Basic', 'Vue', 'Vue + Nuxt'],
      }, {
        type: 'confirm',
        name: 'ts',
        message: 'Using TypeScript',
        default: true
      }, {
        type: 'input',
        name: 'entry',
        message: 'Project entry',
        default: 'index.js',
      }
    ]

    return inquirer.prompt(questions)
  }

}