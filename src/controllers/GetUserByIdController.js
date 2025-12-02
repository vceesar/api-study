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
                return {
                    statusCode: 200,
                    message: findUserById[0],
                }
            }

            return {
                statusCode: 404,
                message: `User with requested id ${id} not found.`,
            }
        } catch (err) {
            throw err
        }
    }
}
