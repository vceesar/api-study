import { badRequest, validRequest, notFound } from './helpers/users.js'

export class GetUserByIdController {
    constructor(GetUserByIdUseCase) {
        this.GetUserByIdUseCase = GetUserByIdUseCase
    }

    static create(GetUserByIdUseCase) {
        return new GetUserByIdController(GetUserByIdUseCase)
    }

    async execute(httpComms) {
        const { id } = httpComms.params
        try {
            const findUserById = await this.GetUserByIdUseCase.execute(id)

            if (findUserById.length > 0) {
                return validRequest(findUserById[0])
            }

            throw notFound(`User with requested id ${id} not found.`)
        } catch (err) {
            throw err
        }
    }
}
