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

    for (dir of base.directories) {
      if (!files.directoryExists(path.resolve(workDir, dir))) {
        fs.mkdirSync(path.resolve(workDir, dir))
      }
    }

    // create base files
    let filesInfo = base.files

    // basic package info
    let packageJson = filesInfo.find((ele) => ele.name === 'package.json')
    packageJson.data.name = answers.name

    // template-specific process
      
    // write files
    for (item of filesInfo) {
      let data = JSON.stringify(item.data, null, 2)
      if (item.transform) data = item.transform(data)

      let filepath = workDir
      if (item.path) filepath = path.resolve(workDir, filepath)

      console.log('writing ' + item.name + ' in ' + filepath)
      fs.writeFileSync(path.resolve(filepath, item.name), data)
    }
  })
}