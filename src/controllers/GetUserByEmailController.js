import { validRequest, notFound } from './helpers/users.js'
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
            const findUserByEmail =
                await this.GetUserByEmaiLUseCase.execute(email)

            if (findUserByEmail.length > 0) {
                return validRequest(findUserByEmail[0])
            }

            throw notFound(`User with requested email ${email} not found.`)
        } catch (err) {
            throw err
        }
    }
}
