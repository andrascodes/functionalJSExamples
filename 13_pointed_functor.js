'use strict'

const Task = require('data.task')
const { List, Map } = require('immutable-ext')

// of: generic interface, for lifting a value into our type and let us start working with it, as if it's a total success
Task.of('hello') // Task('hello')
Either.of('hello') // Right('hello')
// as soon as we pop a value into of, I want to be able to start mapping and chaining, using all the generic interfaces
Either.of('hello').map(x => x + '!')
// if it would return a Left, we wouldn't be able to map it