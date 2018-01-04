'use strict'

// const {List} = require('immutable-ext')

// // List() constructor is a natural transformation
// const res = List(['hello', 'world'])
// .chain(x => List(x.split('')))

// console.log(res)

// ---------------------------

// const {fromNullable} = require('./either')

// const first = xs =>
//     fromNullable(xs[0])

// const largeNumbers = xs =>
//     xs.filter(x => x > 100)

// const larger = x =>
//     x * 2

// const app = xs =>
//     first(largeNumbers(xs)).map(larger)

// console.log(app([2,400,5,1000]))

// ---------------------------

// find a user then find that user's best friend

const {Right, Left} = require('./either')
const Box = require('./box')
const Task = require('data.task')

const fake = id =>
    ({
        id: id,
        name: 'user1',
        best_friend_id: id + 1
    })

const Db = ({
    find: id =>
        new Task((rej, res) =>
            res(id > 2 ? Right(fake(id)) : Left('not found')))
})

const eitherToTask = e =>
    e.fold(Task.rejected, Task.of)

// Db.find(3) // Task(Right(user))
// .chain(either =>                  // grab the 'user' which is in an Either
//     either.map(user => Db.find(user.best_friend_id)))       // map over theEither so we can get the 'user' out
//     // Right(Task(Right(user)))

Db.find(3) // Task(Right(user))
.chain(eitherToTask) // transforms the inner either to Task (Task(Task(user))) and smooshes it together to: Task(user)
.chain(user =>
    Db.find(user.best_friend_id))
.chain(eitherToTask)
.fork(e => console.error(e),
      r => console.log(r))