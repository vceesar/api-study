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

        if (updatedUser.length > 0) {
            return {
                statusCode: 200,
                message: updatedUser[0],
            }
        }

        return {
            statusCode: 204,
            message: `Could'nt updated user`,
        }
    }
}
