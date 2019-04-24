const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const inquirer = require('./lib/inquirer.js')
const fs = require('fs')
const path = require('path')
const base = require('./config/base/')
const files = require('./lib/files.js')

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

    // create package.json
    let packageJson = base.packageJson

    // template-specific process
    
    // write package.json
    fs.writeFileSync(path.resolve(workDir, 'package.json'), JSON.stringify(packageJson, null, 2))
})