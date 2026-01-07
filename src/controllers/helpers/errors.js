import { badRequest } from './users.js'

export function validateMissingFieldsError(field) {
    return badRequest(`Missing param: ${field}`)
}

export function passwordValidationError(message) {
    return badRequest(message)
}
