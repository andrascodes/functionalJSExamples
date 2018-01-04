'use strict'

const Box = x =>
	({
        // takes a second box: b2
		ap: b2 => b2.map(x),
		map: f => Box(f(x)),
		fold: f => f(x),
        chain: f => f(x),
		inspect: () => `Box(${x})`,
	})
Box.of = m => Box(m)

// Applicative Functors: if it has an 'ap' method
// We have a box with a function, we want to apply it to another Box
// const res = Box(x => x + 1).ap(Box(2)) // Box(3)

// map only allows one argument at a time
// Box(x).map(f)
// Applicative Functors: if it has an 'ap' method
// We have a box with a function, we want to apply it to another Box
// We're applying a function that returns another function that takes another argument
const add = x => y => x + y
// const res = Box(add).ap(Box(2)).ap(Box(3)) // Box(y => 2 + y).ap(Box(3))

// Law 1: F: functor
// F(x).map(f) == F(f).ap(F(x))

// Helper function: lift Applicative with 2 args, fx: functor with an x
// const liftA2 = (f, fx, fy) => 
//     F(f).ap(fx).ap(fy)
// But we don't know what 'F' is, we can't give the same F when boxing in f as the 2nd and 3rd argument's Functor
// We don't know at calltime what 'F' is
const liftA2 = (f, fx, fy) => 
    fx.map(f).ap(fy)
// now we don't have to mention any functors, completely generic fx, whatever functor we pass in

// const res = Box(add).ap(Box(2)).ap(Box(4)) // Box(y => 2 + y).ap(Box(4))
// add(2, 4)
const res = liftA2(add, Box(2), Box(4))

console.log(res)

// Applying multiple arguments to a function in a generic way