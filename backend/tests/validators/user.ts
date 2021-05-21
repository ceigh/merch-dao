import { suite } from 'uvu'
import { equal, ok } from 'uvu/assert'
import { getDeleteErr } from '../../src/helpers/validators/user'
import * as _ from '..'

const deleteErr = suite('getDeleteErr')

deleteErr('is empty if username ok', () => {
  equal(getDeleteErr({ username: 'a'.repeat(9) }), '')
})

deleteErr('is not empty if username wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getDeleteErr({ user: v }))
  })
})

deleteErr.run()
