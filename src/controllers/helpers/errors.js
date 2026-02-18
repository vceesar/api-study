import { badRequest, conflicted } from './users.js'

export function validateMissingFieldsError(field) {
  return badRequest(`Missing param: ${field}`)
}

export function invalidFieldsToPatch(field) {
  return badRequest(`Problem to update param(s). Try using a valid one!`)
}

export function passwordValidationError(message) {
  return badRequest(message)
}

export function emailAlreadyInUse(message) {
  return conflicted(message)
}

export function invalidEmail(message) {
  return badRequest(message)
}

export function invalidUUID(message) {
  return badRequest(message)
}
