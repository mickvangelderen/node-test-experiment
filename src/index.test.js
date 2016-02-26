import './double.test'
import './quadruple.test'
import expect from 'must'
import { double, quadruple } from './'

expect(double).to.be.a.function()
expect(quadruple).to.be.a.function()
