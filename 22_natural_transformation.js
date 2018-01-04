'use strict'

const Either = require('./either')
const { Right, Left, fromNullable } = Either
const Box = require('./box')
const Task = require('data.task')

// Type conversion, Taking one functor to another, a structural change
// F a -> G a

const eitherToTask = e =>
    e.fold(Task.rejected, Task.of)

// eitherToTask(Right('nightingale'))
// .fork(e => console.error('err', e),
//       r => console.log('res', r))

// Can't write Left, that violates the laws of Natural Transformations
// const boxToEither = b =>
//     b.fold(x => Right(x))

// const res = boxToEither(Box(100))
// console.log(res)

// Laws of Natural Transformations
// nt(x).map(f) == nt(x.map(f))
// any function that satisfies this is a natural transformation
// exchangeable: 
// get the first number from a list then run a function on just that
// or run a function on all list elements and get the first one, the first option is more efficient in this case

const boxToEither = b =>
    b.fold(x => Right(x))
    // b.fold(x => Left(x)) - with left the two side is not equal

// const res1 = boxToEither(Box(100)).map(x => x * 2)
// const res2 = boxToEither(Box(100).map(x => x * 2))
// console.log(res1, res2)

// array of xs, grab the first thing, transforming the list to an Either
// we lose the rest of the list, but the law is still valid
const first = xs =>
    fromNullable(xs[0])

const res1 = first([1,2,3]).map(x => x + 1)
const res2 = first(([1,2,3]).map(x => x + 1))
console.log(res1, res2)

// We end up with the same result no matter which path we're taking.
//          F(a) - map(f) -> F(b)
//          |                  |
//          nt                 nt
//          |                  |
//          v                  v
//          G(a) - map(f) -> G(b)