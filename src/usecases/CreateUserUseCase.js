import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
export class CreateUserUseCase {
    constructor(createUserRepository) {
        this.createUserRepository = createUserRepository
    }

    static create(createUserRepository) {
        return new CreateUserUseCase(createUserRepository)
    }

    async execute(UserDataParams) {
        const userId = v4()

        const hashedPassword = await bcrypt.hash(UserDataParams.password, 10)

        const userInfo = {
            ...UserDataParams,
            id: userId,
            password: hashedPassword,
        }

        const createdUser = await this.createUserRepository.execute(userInfo)

        return createdUser
    }
}
