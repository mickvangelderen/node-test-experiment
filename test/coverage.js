import find from './util/find'
import joinPaths from './util/join-paths'

find(joinPaths(__dirname, '../src'))
.fork(
	error => { throw error },
	files => files.forEach(require)
)