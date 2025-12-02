export class GetAllUsersUseCase {
    constructor(GetAllUsersRepository) {
        this.GetAllUsersRepository = GetAllUsersRepository
    }

    static create(GetAllUsersRepository) {
        return new GetAllUsersUseCase(GetAllUsersRepository)
    }

    async execute() {
        try {
            const users = await this.GetAllUsersRepository.execute()

            if (users) {
                return this.presentedOutput(users)
            }
        } catch (err) {
            throw err
        }
    }

    presentedOutput(users) {
        return users.map((i) => ({
            id: i.id,
            first_name: i.first_name,
            last_name: i.last_name,
            email: i.email,
        }))
    }
}
