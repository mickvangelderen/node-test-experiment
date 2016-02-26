import double from './double.test'
import expect from 'must'
import quadruple from './quadruple'

expect(quadruple(42)).to.equal(double(double(42)))

export default quadruple
