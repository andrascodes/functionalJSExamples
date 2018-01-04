'use strict'

const Either = require('./either')

const liftA2 = (f, fx, fy) => 
    fx.map(f).ap(fy)

const $ = selector => 
    Either.of({selector, height: 10})

// const getScreenSize = (screen, head, foot) => 
//     screen - (head.height + foot.height)

// Sequentially finding a DOMnode
// $('header').chain(head => 
//     $('footer').map(footer =>
//         getScreenSize(800, header, footer)))

// With applicatives we can do this all at once
const getScreenSize = screen => head => foot =>
    screen - (head.height + foot.height)

// const res = Either.of(getScreenSize(800))
//             .ap($('header'))
//             .ap($('footer'))

const res = liftA2(getScreenSize(800), $('header'), $('footer'))

console.log(res)