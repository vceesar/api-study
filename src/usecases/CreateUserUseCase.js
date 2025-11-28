import {uuidv4} from 'uuid'
import bcrypt from 'bcrypt'
export class CreateUserUseCase{
  constructor(createUserRepository){
    this.createUserRepository = createUserRepository
  }

  static create(createUserRepository){
    return new CreateUserUseCase(createUserRepository)
  }

  async execute(UserDataParams){
    const userId = uuidv4()

    const hashedPassword = await bcrypt.hash(UserDataParams.password, 10)

    const userInfo = {
      userId,
      password: hashedPassword,
      ...UserDataParams
    }

    const createdUser = await this.createUserRepository.create(userInfo)

    return await createdUser.execute()
  }
}