import { validRequest } from './helpers/users.js'
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
                validRequest(200, users)
            }
        } catch (err) {
            throw err
        }
    }
}
