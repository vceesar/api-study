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

            return updatedUser
        } catch (err) {
            throw err
        }
    }
}
