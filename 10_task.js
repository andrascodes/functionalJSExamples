'use strict'

const Task = require('data.task')

// capture this in a task, so it will be lazy and we can compose with it
const launchMissilies = () =>
  new Task((rej, res) => {
    console.log("launch missilies!")
    res("missile")
  })
  

// chain: takes an x task increments it by 1 and creates another incremented Task, which it returns
// if there is no fork at the end it will not run
launchMissilies()
.map(x => x + "!")
.fork(e => console.log('err', e),
      x => console.log('success', x))

const app = launchMissilies().map(x => x + "!")
// the caller of the application has to fork it, they're in charge of all the sideeffects
// they can even extend it, before it runs
app
.map(x => x + "!")
.fork(e => console.log('err', e),
      x => console.log('success', x))