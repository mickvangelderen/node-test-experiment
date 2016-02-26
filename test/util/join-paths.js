import curry from 'funko/lib/curry'
import path from 'path'

const joinPaths = curry(2, (a, b) => path.join(a, b))

export default joinPaths
