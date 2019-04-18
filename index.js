const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const inquirer = require('./lib/inquirer.js')

clear()

console.log(
    chalk.yellow(
        figlet.textSync('Webapp Initializer', { horizontalLayout: 'full' })
    )
)

inquirer.askProjectInfo().then(answers => {
    console.log(answers)
})