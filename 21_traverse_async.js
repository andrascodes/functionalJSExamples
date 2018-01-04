'use strict'

const fs = require('fs')
const Task = require('data.task')
const { List, Map } = require('immutable-ext')

const httpGet = (path, params) => 
    Task.of(`${path} result`)

// map:

// Map({ home: '/', about: '/about-us', blog: '/blog'})
// .map(route => httpGet(route, {}))

// result:
// Map({home: Task('/ result')...})

// What we want instead?
// Task(Map({home: '/ result', ...}))
// Solution: Traverse

// Map({ home: '/', about: '/about-us', blog: '/blog'})
// .traverse(Task.of, route => httpGet(route, {}))
// .fork(console.error, console.log)

// Ability to hold our structure in place and traverse within that

Map({ home: ['/', '/home'], about: ['/about-us']})
.traverse(Task.of, routes => 
    List(routes)
    .traverse(Task.of, route => httpGet(route, {})))
.fork(console.error, console.log)

// useful when you have a big nested tree, files system, 
// and you want to traverse this structure without any bookkeeping, taking it apart and putting it together
// or without any mutation at all