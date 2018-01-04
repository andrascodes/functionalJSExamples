'use strict';

// Box: takes an x value, returns an object with a map function.
const Box = x =>
	({
		// We'll take some function f, and return f(x) in a Box.
		// Apply the f function to the value of Box, then return it in a new Box.
		map: f => Box(f(x)),
		fold: f => f(x),
		inspect: () => `Box(${x})`,
	})

// const moneyToFloat = str => 
//     parseFloat(str.replace(/\$/g, ''));

// unnested the replace expression from parseFloat
// map is a type of composition
const moneyToFloat = str =>
	Box(str)
		.map(s => s.replace(/\$/g, ''))
		.map(r => parseFloat(r))

// ---------------------------

// const percentToFloat = str => {
//     const replaced = str.replace(/\%/g, '')
//     const number = parseFloat(replaced)
//     return number * 0.01
// }

// Replacing assignments
const percentToFloat = str =>
	Box(str.replace(/\%/g, ''))
		.map(replaced => parseFloat(replaced))
		.map(number => number * 0.01)

// ---------------------------

// const applyDiscount = (price, discount) => {
//     const cost = moneyToFloat(price)
//     const savings = percentToFloat(discount)
//     return cost - cost * savings
// }

// Two different assignments, keep both vars in scope
const applyDiscount = (price, discount) =>
	moneyToFloat(price)
		.fold(cost =>
			percentToFloat(discount)
				.fold(savings => cost - cost * savings))


const result = applyDiscount('$4.99', '20%')

console.log(result)