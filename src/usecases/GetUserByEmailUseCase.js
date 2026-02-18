export class GetUserByEmailUseCase {
  constructor(GetUserByEmailRepository) {
    this.GetUserByEmailRepository = GetUserByEmailRepository
  }

  static create(GetUserByEmailRepository) {
    return new GetUserByEmailUseCase(GetUserByEmailRepository)
  }

  async execute(email) {
    const userUseCase = await this.GetUserByEmailRepository.execute(email)

    return this.presentedOutput(userUseCase)
  }

  presentedOutput(output) {
    return output.map((i) => ({
      id: i.id,
      first_name: i.first_name,
      last_name: i.last_name,
      email: i.email,
    }))
  }
}
