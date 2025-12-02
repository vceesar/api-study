import validator from 'validator'
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
                const error = new Error()
                error.statusCode = 400
                error.message = `Missing param: ${field}`
                throw error
            }
        }

        if (!validator.isStrongPassword(password)) {
            const error = new Error()
            error.statusCode = 400
            error.message = 'Password should be stronger'
            throw error
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
