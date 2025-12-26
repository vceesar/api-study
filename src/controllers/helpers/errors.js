import { badRequest } from './users.js'

export function validateMissingFieldsError(field) {
    return badRequest(400, `Missing param: ${field}`)
}

export function passwordValidationError(message) {
    return badRequest(400, message)
}
