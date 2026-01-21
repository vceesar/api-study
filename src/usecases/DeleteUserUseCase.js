export class DeleteUserUseCase {
    constructor(DeleteUserRepository) {
        this.DeleteUserRepository = DeleteUserRepository
    }

    static create(DeleteUserRepository) {
        return new DeleteUserUseCase(DeleteUserRepository)
    }

    execute(id) {
        return this.DeleteUserRepository.execute(id)
    }
}
