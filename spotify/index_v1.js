'use strict'

// data flow building, retrieve the data and pass it through a series of functions

const Task = require('data.task')
const { findArtist, relatedArtists } = require('./spotify')
const { List } = require('immutable-ext')

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

const artistIntersection = rels1 => rels2 =>
    Intersection(rels1).concat(Intersection(rels2)).xs

const main = ([name1, name2]) => 
    Task.of(artistIntersection)
    .ap(related(name1))
    .ap(related(name2))

names.chain(main)
.fork(console.error, 
      console.log)