#!/usr/bin/env node

'use strict'

const commander = require('commander')
const program = new commander.Command()
const init = require('../init')

program
  .command('init')
  .action(() => {
    init()
  })

program.parse(process.argv)