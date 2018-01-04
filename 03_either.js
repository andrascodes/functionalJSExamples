// const Either = Right || Left

// Pure Functional Error handling
const Right = x =>
({
	map: f => Right(f(x)),
	fold: (f, g) => g(x),
	inspect: () => `Right(${x})`,
})

const Left = x =>
({
	map: f => Left(x),
	fold: (f, g) => f(x),
	inspect: () => `Left(${x})`,
})

// const result = Right(2)
// 	.map(x => x + 1)
// 	.map(x => x / 2)
// 	.fold(x => 'error', x => x)

// console.log(result)

// Has multiple expressions :S
// const findColor = name => {
// 	const found = ({ red: '#ff4444',  blue: '#3b5998', yellow: '#fff68f'})[name]
// 	return found ? Right(found) : Left(null)
// }

// takes a null or not null value and returns a Right or Left
const fromNullable = x => 
	x != null ? Right(x) : Left(null)

const findColor = name => 
	fromNullable({ red: '#ff4444',  blue: '#3b5998', yellow: '#fff68f'}[name])

// We need to map.
// If findColor return Right: slice is applied
// If Left: slice is not applied and returns a Left
// fold: will error if Left, apply the second function if Right
// At the time of programming we'll know if we're getting a null or not.
const result = findColor('blue')
	.map(c => c.slice(1))
	.fold(e => 'no color',
				c => c.toUpperCase())

console.log(result);