import all from 'funko/lib/future/all'
import chain from 'funko/lib/chain'
import fs from 'fs'
import futureFromCallback from 'funko/lib/future/from-callback'
import joinPaths from './join-paths'
import map from 'funko/lib/map'
import pipe from 'funko/lib/pipe'
import reduce from 'funko/lib/reduce'
import rejected from 'funko/lib/future/rejected'
import resolved from 'funko/lib/future/resolved'

const readdir = path =>
	futureFromCallback(callback => fs.readdir(path, callback))

const stat = path =>
	futureFromCallback(callback => fs.stat(path, callback))

const find = path =>
	pipe([
		// String
		stat,
		// Future Error Stat
		chain(stat => {
			if (stat.isFile()) {
				return resolved([ path ])
			}
			if (stat.isDirectory()) {
				return pipe([
					// String
					readdir,
					// Future Error [ String ]
					chain(pipe([
						// [ String ]
						map(pipe([
							// String
							joinPaths(path),
							// String
							find
							// Future Error [ String ]
						])),
						// [ Future Error [ String ] ]
						all,
						// Future Error [ [ String ] ]
						map(reduce((flat, list) => flat.concat(list), []))
						// Future Error [ String ]
					]))
					// Future Error [ [ String ] ]
				], path)
			}
			return rejected(new Error(`Path "${path}"" is not a file nor a directory.`))
		})
		// Future Error [ String ]
	], path)

export default find
