import validator from 'validator'
import {
  validateMissingFieldsError,
  passwordValidationError,
  emailAlreadyInUse,
  invalidEmail,
} from './helpers/errors.js'
import { created } from './helpers/users.js'

export class CreateUserController {
  constructor(CreateUserUseCase, GetUserByEmailUseCase) {
    ;((this.CreateUserUseCase = CreateUserUseCase),
      (this.GetUserByEmailUseCase = GetUserByEmailUseCase))
  }

  static create(CreateUserUseCase, GetUserByEmailUseCase) {
    return new CreateUserController(CreateUserUseCase, GetUserByEmailUseCase)
  }

  async execute(httpComms) {
    const body = httpComms.body

    const { password, email, ...rest } = body

    const requiredFields = ['first_name', 'last_name', 'email', 'password']

    for (const field of requiredFields) {
      if (
        !body[field] ||
        (typeof body[field] === 'string' && body[field].trim().length === 0)
      ) {
        throw validateMissingFieldsError(field)
      }
    }

    if (!validator.isStrongPassword(password)) {
      throw passwordValidationError('Password should be stronger')
    }

    if (!validator.isEmail(email)) {
      throw invalidEmail('Invalid Email. Use a valid one!')
    }

    try {
      const getUserByEmail = await this.GetUserByEmailUseCase.execute(email)
      console.log(getUserByEmail)

      if (
        getUserByEmail &&
        Array.isArray(getUserByEmail) &&
        getUserByEmail.length > 0
      ) {
        throw emailAlreadyInUse('Email already in use. Try using another one!')
      }
    } catch (error) {
      return error
    }

    try {
      const userUseCase = await this.CreateUserUseCase.execute({
        ...rest,
        email,
        password,
      })
      return created(userUseCase)
    } catch (error) {
      return error
    }
  }
}
