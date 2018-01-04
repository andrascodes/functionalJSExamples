'use strict'

const Task = require('data.task')
const { List, Map } = require('immutable-ext')

const Box = x =>
	({
		// We'll take some function f, and return f(x) in a Box.
		// Apply the f function to the value of Box, then return it in a new Box.
		map: f => Box(f(x)),
		fold: f => f(x),
		inspect: () => `Box(${x})`,
	})

const Right = x =>
	({
		chain: f => f(x),
		map: f => Right(f(x)),
		fold: (f, g) => g(x),
		inspect: () => `Right(${x})`,
	})

const Left = x =>
	({
		chain: f => Left(x),
		map: f => Left(x),
		fold: (f, g) => f(x),
		inspect: () => `Left(${x})`,
	})

const fromNullable = x =>
	x != null ? Right(x) : Left(null)



// Functors: any type with a map method (Right, Left, Box, Task)
// Law 1:
// Any type f of x, some functor holding x, 
// when we map f over it and then we map g over it, 
// that should be the same as running map once over it by saying first run f, then run g.
// Preserving function composition while mapping
// fx.map(f).map(g) == fx.map(x => f(g(x))

// const res1 = Left('squirrels')
//             .map(s => s.substr(5))
//             .map(s => s.toUpperCase())

// const res2 = Left('squirrels')
//             .map(s => s.substr(5).toUpperCase())

// Law 2
// fx.map(id) == id(fx)

const id = x => x
const res1 = List.of('crayons').map(id)
const res2 = id(List.of('crayons'))

console.log(res1, res2)