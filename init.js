const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const inquirer = require('./lib/inquirer.js')
const fs = require('fs')
const path = require('path')
const base = require('./config/base')
const files = require('./lib/files.js')


module.exports = init

function init() {
  clear()

  console.log(
    chalk.yellow(
      figlet.textSync('Webapp Initializer', { horizontalLayout: 'full' })
    )
  )

  inquirer.askProjectInfo().then(answers => {
    console.log(answers)
    let workDir = process.cwd()

    // mkdir
    if (process.cwd().split('/')[process.cwd().split('/').length - 1] !== answers.name) {
      if (!files.directoryExists(path.resolve(workDir, answers.name))) fs.mkdirSync(path.resolve(workDir, answers.name))
      workDir = path.resolve(workDir, answers.name)
    }

    // create base files
    let packageJson = base.packageJson
    let eslintJson = base.eslintJson

    // basic package info
    packageJson.name = answers.name

    // template-specific process
      
    // write files
    fs.writeFileSync(path.resolve(workDir, 'package.json'), JSON.stringify(packageJson, null, 2))
    fs.writeFileSync(path.resolve(workDir, 'eslintrc.js'), 'module.exports = ' + JSON.stringify(eslintJson, null, 2))
  })

}