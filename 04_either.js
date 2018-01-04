// const Either = Right || Left

// Pure Functional Error handling
// fold: removing a value from its context, taking it out of the Box
// chain: expects you to run a function and return another Box
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

// takes a null or not null value and returns a Right or Left
const fromNullable = x =>
	x != null ? Right(x) : Left(null)

const fs = require('fs')

// const getPort = () => {
//     try {
//         const str = fs.readFileSync('./04_either/conig.json')
//         const config = JSON.parse(str)
//         return config.port
//     } catch(e) {
//         return 3000
//     }
// }

const tryCatch = f => {
	try {
		return Right(f())
	} catch (e) {
		return Left(e)
	}
}

const getPort = () =>
	tryCatch(() => fs.readFileSync('./04_either/config.json'))
		// tryCatch: boxes in the Either returned by the previous tryCatch resulting in: Either(Either()) 
		.chain(c => tryCatch(() => JSON.parse(c)))
		.fold(e => 3000,
					c => c.port)

const result = getPort()

console.log(result);