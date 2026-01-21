import { validRequest } from './helpers/users.js'

export class DeleteUserController {
    constructor(DeleteUserUseCase) {
        this.DeleteUserUseCase = DeleteUserUseCase
    }

    static create(DeleteUserUseCase) {
        return new DeleteUserController(DeleteUserUseCase)
    }

    execute(httpComms) {
        const { id } = httpComms.params

        try {
            const deletedUser = this.DeleteUserUseCase.execute(id)

            if (!deletedUser) {
                return notFound(`User with id ${id} not found`)
            }

            return validRequest(`User with id ${id} deleted sucessfully`)
        } catch (err) {
            throw new Error(err)
        }
    }
}
