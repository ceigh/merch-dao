import { suite } from 'uvu'
import { equal, ok } from 'uvu/assert'
import { getAddErr } from '../../src/helpers/validators/admin'
import * as _ from '..'

const addErr = suite('getAddErr')

addErr('is empty if creds ok', () => {
  equal(getAddErr({ password: _.password, username: _.username }), '')
})

addErr('is not empty if username wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getAddErr({ password: _.password, username: v }))
  })
})

addErr('is not empty if password wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getAddErr({ username: _.username, password: v }))
  })
})

addErr.run()
