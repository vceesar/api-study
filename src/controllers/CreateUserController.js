import validator from 'validator'
import {
    validateMissingFieldsError,
    passwordValidationError,
} from './helpers/errors.js'

export class CreateUserController {
    constructor(CreateUserUseCase) {
        this.CreateUserUseCase = CreateUserUseCase
    }

    static create(CreateUserUseCase) {
        return new CreateUserController(CreateUserUseCase)
    }

    async execute(httpComms) {
        const body = httpComms.body

        const { password, ...rest } = body

        const requiredFields = ['first_name', 'last_name', 'email', 'password']

        for (const field of requiredFields) {
            if (
                !body[field] ||
                (typeof body[field] === 'string' &&
                    body[field].trim().length === 0)
            ) {
                throw validateMissingFieldsError(field)
            }
        }

        if (!validator.isStrongPassword(password)) {
            throw passwordValidationError('Password should be stronger')
        }

        try {
            const userUseCase = await this.CreateUserUseCase.execute({
                ...rest,
                password,
            })
            return userUseCase
        } catch (error) {
            throw error
        }
    }
}
