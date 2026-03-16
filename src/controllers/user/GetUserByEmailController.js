import { invalidEmail } from '../helpers/errors.js'
import { validRequest, notFound } from '../helpers/users.js'
import validator from 'validator'
export class GetUserByEmailController {
  constructor(GetUserByEmaiLUseCase) {
    this.GetUserByEmaiLUseCase = GetUserByEmaiLUseCase
  }
  static create(GetUserByEmaiLUseCase) {
    return new GetUserByEmailController(GetUserByEmaiLUseCase)
  }

  async execute(httpComms) {
    const { email } = httpComms.query

    try {
      const isEmailValid = validator.isEmail(email) ? true : false

      if (!isEmailValid) {
        throw invalidEmail('Invalid Email. Use a valid one!')
      }

      const findUserByEmail = await this.GetUserByEmaiLUseCase.execute(email)

      if (findUserByEmail.length > 0) {
        return validRequest(findUserByEmail[0])
      }

      return notFound(`User with requested email ${email} not found.`)
    } catch (err) {
      throw err
    }
  }
}
