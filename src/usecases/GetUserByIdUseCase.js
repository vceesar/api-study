export class GetUserByIdUseCase {
  constructor(GetUserByIdRepository) {
    this.GetUserByIdRepository = GetUserByIdRepository
  }

  static create(GetUserByIdRepository) {
    return new GetUserByIdUseCase(GetUserByIdRepository)
  }

  async execute(UserIdParam) {
    const userFound = await this.GetUserByIdRepository.execute(UserIdParam)

    return this.presentedOutput(userFound)
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
