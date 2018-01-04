'use strict'

const Either = require('./either')
const { Right, Left, fromNullable } = Either
const Box = require('./box')
const Task = require('data.task')
const { List, Map } = require('immutable-ext')

// Isomorphism is a pair of functions: to, from
// from(to(x)) == x
// to(from(y)) == y
// convert and convert back to get back the original data
// proves a datatype holds the same info as another datatype
// String ~ [Char] // is isomorphic

// Isomorphism type
const Iso = (to, from) =>
({
    to,
    from
})

const chars = Iso(s => s.split(''), c => c.join(''))
// const res = chars.from(chars.to('hello world'))

const truncate = str =>
    chars.from(chars.to(str).slice(0, 3)).concat('...')

// const res = truncate('hello world')

// ---------------------------

// Singleton array: array holding 1 element
// [a] ~ Either null a

const singleton = Iso(e => 
    e.fold( () => [], x => [x] ),       // to
    ([x]) => x ? Right(x) : Left() )    // from

const filterEither = (e, pred) =>
    singleton.from(singleton.to(e).filter(pred))

const res = filterEither( Right('hello'), x => x.match(/h/ig) )
                .map(x => x.toUpperCase())

console.log(res)