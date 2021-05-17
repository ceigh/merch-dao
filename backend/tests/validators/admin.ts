import { suite } from 'uvu'
import { equal, ok } from 'uvu/assert'
import {
  getAddAdminErr, getSignInErr, getSignOutErr, getUpdatePasswordErr
} from '../../src/helpers/validators/admin'
import * as _ from '..'

const signInErr = suite('getSignInErr')

signInErr('is empty if creds ok', () => {
  equal(getSignInErr({ password: _.password, username: _.username }), '')
})

signInErr('is not empty if username wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getSignInErr({ password: _.password, username: v }))
  })
})

signInErr('is not empty if password wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getSignInErr({ username: _.username, password: v }))
  })
})

signInErr.run()

const addAdminErr = suite('getAddAdminErr')

addAdminErr('is empty if creds ok', () => {
  equal(getAddAdminErr({ password: _.password, username: _.username }), '')
})

addAdminErr('is not empty if username wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getAddAdminErr({ password: _.password, username: v }))
  })
})

addAdminErr('is not empty if password wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getSignInErr({ username: _.username, password: v }))
  })
})

addAdminErr.run()

const signOutErr = suite('getSignOutErr')

signOutErr('is empty if allTokens ok', () => {
  equal(getSignOutErr({ allTokens: true }), '')
})

signOutErr('is not empty if allTokens wrong', () => {
  _.optional(_.wrongValuesForBoolean).forEach(v => {
    ok(getSignOutErr({ allTokens: v }))
  })
})

signOutErr.run()

const updatePasswordErr = suite('getUpdatePasswordErr')

updatePasswordErr('is empty if passwords ok', () => {
  equal(getUpdatePasswordErr({
    oldPassword: _.password, newPassword: 'a'
  }), '')
})

updatePasswordErr('is empty if signOut ok', () => {
  const values = [true, false]
  values.forEach(v => {
    equal(getUpdatePasswordErr(
      { oldPassword: _.password, newPassword: 'a', signOut: v }), ''
    )
  })
})

updatePasswordErr('is not empty if old password wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getUpdatePasswordErr({ oldPassword: v, newPassword: _.password }))
  })
})

updatePasswordErr('is not empty if new password wrong', () => {
  _.wrongValuesForNonBlankString.forEach(v => {
    ok(getUpdatePasswordErr({ oldPassword: _.password, newPassword: v }))
  })
})

updatePasswordErr('is not empty if signOut wrong', () => {
  _.optional(_.wrongValuesForBoolean).forEach(v => {
    ok(getUpdatePasswordErr({
      oldPassword: _.password, newPassword: 'a', signOut: v
    }))
  })
})

updatePasswordErr.run()
