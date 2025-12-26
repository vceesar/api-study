export class GetUserByIdUseCase {
    constructor(GetUserByIdRepository) {
        this.GetUserByIdRepository = GetUserByIdRepository
    }

    static create(GetUserByIdRepository) {
        return new GetUserByIdUseCase(GetUserByIdRepository)
    }

    async execute(UserIdParam) {
        try {
            const userFound =
                await this.GetUserByIdRepository.execute(UserIdParam)

            console.log(this.presentedOutput(userFound))

            return this.presentedOutput(userFound)
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
