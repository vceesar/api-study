import { badRequest, validRequest } from './helpers/users.js'
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
            const updatedUser = await this.UpdateUserUseCase.execute(id, body)

            if (!updatedUser.length > 0) {
                throw badRequest('Error while patching the user')
            }
            return validRequest(updatedUser[0])
        } catch (err) {
            throw err
        }
    }
}
