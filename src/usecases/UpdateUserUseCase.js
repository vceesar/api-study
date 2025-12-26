export class UpdateUserUseCase {
    constructor(UpdateUserRepository) {
        this.UpdateUserRepository = UpdateUserRepository
    }

    static create(UpdateUserRepository) {
        return new UpdateUserUseCase(UpdateUserRepository)
    }

    async execute(userId, userFieldsParam) {
        const updatedUser = await this.UpdateUserRepository.execute(
            userId,
            userFieldsParam
        )

        return updatedUser
    }
}
