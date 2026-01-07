export class GetUserByEmailUseCase {
    constructor(GetUserByEmailRepository) {
        this.GetUserByEmailRepository = GetUserByEmailRepository
    }

    static create(GetUserByEmailRepository) {
        return new GetUserByEmailUseCase(GetUserByEmailRepository)
    }

    async execute(email) {
        const userUseCase = this.GetUserByEmailRepository.execute(email)

        return userUseCase
    }
}
