import { suite } from 'uvu'
import { equal, ok } from 'uvu/assert'
import { getCreateErr } from '../../src/helpers/validators/admin'
import * as _ from '..'

const createErr = suite('getCreateErr')

createErr('is empty if creds ok', () => {
  equal(getCreateErr({ password: _.password, username: _.username }), '')
})

createErr('is not empty if username wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getCreateErr({ password: _.password, username: v }))
  })
})

createErr('is not empty if password wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getCreateErr({ username: _.username, password: v }))
  })
})

createErr.run()
