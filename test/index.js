import find from './util/find'
import joinPaths from './util/join-paths'

find(joinPaths(__dirname, '../src'))
.map(files => files.filter(file => /\.test\.js$/.test(file)))
.fork(
	error => { throw error },
	files => files.forEach(require)
)
