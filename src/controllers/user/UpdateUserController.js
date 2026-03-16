import { badRequest, validRequest } from '../helpers/users.js'
import { invalidFieldsToPatch } from '../helpers/errors.js'
export class UpdateUserController {
  constructor(UpdateUserUseCase) {
    this.UpdateUserUseCase = UpdateUserUseCase
  }

  static create(UpdateUserUseCase) {
    return new UpdateUserController(UpdateUserUseCase)
  }

  async execute(httpComms) {
    const { id } = httpComms.params

    const body = httpComms.body

    try {
      const allowedFieldsToUpdate = ['first_name', 'last_name', 'email']
      const bodyKeys = Object.keys(body)

      if (bodyKeys.length === 0) {
        throw invalidFieldsToPatch()
      }

      const allFieldsAreValid = bodyKeys.every((key) =>
        allowedFieldsToUpdate.includes(key)
      )

      if (!allFieldsAreValid) {
        throw invalidFieldsToPatch()
      }

      // Montar objeto apenas com campos permitidos e com valor não vazio
      const bodyToPatch = {}
      for (const field of allowedFieldsToUpdate) {
        if (body[field] != null && String(body[field]).trim().length > 0) {
          bodyToPatch[field] = body[field].trim()
        }
      }

      if (Object.keys(bodyToPatch).length === 0) {
        throw badRequest('No valid values to update')
      }

      const updatedUser = await this.UpdateUserUseCase.execute(id, bodyToPatch)
      if (updatedUser.length > 0) {
        return validRequest(updatedUser[0])
      }
      throw badRequest('Error while patching the user')
    } catch (err) {
      throw err
    }
  }
}
