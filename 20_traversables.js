'use strict'

const fs = require('fs')
const Task = require('data.task')
// Wrap standard Node callbacks to return Task based functions
const futurize = require('futurize').futurize(Task)
const { List } = require('immutable-ext')

const readFile = futurize(fs.readFile)

// const files = ['box.js', 'config.json']
// const res = files.map(fn => readFile(fn, 'utf-8'))
// How do we know when all of them are finished? How do we fork each one?
// Take an array of Tasks and turn it into a Task of an array of results
// [Task] => Task([])
// Turn these types inside out, Leapfrog the Types
const files = List(['box.js', 'config.json'])

// Need to give the outer type in case of failure (it never runs the function)
// Traverse expects you to return an applicative functor from the 2nd function argument
// They need to have an 'ap' method, Most types are applicative functors
files.traverse(Task.of, fn => readFile(fn, 'utf-8'))
.fork(console.error, console.log)
