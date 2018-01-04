'use strict'

// data flow building, retrieve the data and pass it through a series of functions

const Task = require('data.task')
const { findArtist, relatedArtists } = require('./spotify')
const { List } = require('immutable-ext')
const { Pair, Sum } = require('../monoid')

const argv = new Task((rej, res) => res(process.argv))
const names = argv.map(args => args.slice(2))

const related = name =>
    findArtist(name)
    .map(artist => artist.id)
    .chain(id => relatedArtists(id))
    .map(artists => artists.map(artist => artist.name))

const Intersection = xs =>
({
    xs,
    concat: ({xs: ys}) =>
        Intersection(xs.filter(x => ys.some(y => x === y)))
})

const artistIntersection = rels =>
    rels
    .foldMap(x => Pair(Intersection(x), Sum(x.length)))
    // A pair is a functor, BiMap is a BiFunctor runs on both values
    .bimap(x => x.xs, y => y.x)
    .toList()

const main = names => 
    List(names)
    .traverse(Task.of, related)
    .map(artistIntersection)

names.chain(main)
.fork(console.error, 
      console.log)