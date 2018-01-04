'use strict'

const Task = require('data.task')

const Box = x =>
	({
		// We'll take some function f, and return f(x) in a Box.
		// Apply the f function to the value of Box, then return it in a new Box.
		map: f => Box(f(x)),
		fold: f => f(x),
        chain: f => f(x),
		inspect: () => `Box(${x})`,
	})
Box.of = m => Box(m)

// Monad: of and chain method on the type => Monadic interface
// of might be: pure
// chain might be: flatMap, bind, >>=
// Box, Either, Task, List

// httpGet('/user')
//     // .map(user => httpGet(`/comments/${user.id}`)) // Task(Task([Comment]))
//     .chain(user =>  // Task([Comment]) flattens the two types into one
//         httpGet(`/comments/${user.id}`)
//         .chain(comments =>
//             updateDOM(user, comments))) // if not chain: Task(Task(Task([Comment])))

// Box(Box(x)) => Box(x)
const join = m => 
    m.chain(x => x)

// Law 1:
// const m = Box(Box(Box(3)))
// const res1 = join(m.map(join)) 
// const res2 = join(join(m))

// Law 2:
const m = Box('wonder')
const res1 = join(Box.of(m)) 
const res2 = join(m.map(Box.of))

console.log(res1, res2)

// Chain's main functionality is just to join two types together
// Map is defineable by Chain and of
m.chain(x => M.of(f(x)))

// We can derive a map method from any Monad
// Monad is a functor, applicative functor and a pointed functor