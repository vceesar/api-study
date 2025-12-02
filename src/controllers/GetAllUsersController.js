export class GetAllUsersController {
    constructor(GetAllUsersUseCase) {
        this.GetAllUsersUseCase = GetAllUsersUseCase
    }

    static create(GetAllUsersUseCase) {
        return new GetAllUsersController(GetAllUsersUseCase)
    }

    async execute() {
        try {
            const users = await this.GetAllUsersUseCase.execute()

            if (users) {
                return {
                    statusCode: 200,
                    message: users,
                }
            }
        } catch (err) {
            throw err
        }
    }
}
