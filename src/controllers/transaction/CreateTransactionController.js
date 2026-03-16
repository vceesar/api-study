import { badRequest, validRequest } from '../helpers/users.js'

export class CreateTransactionController {
  constructor(CreateTransactionUseCase) {
    this.CreateTransactionUseCase = CreateTransactionUseCase
  }

  static create(CreateTransactionUseCase) {
    return new CreateTransactionController(CreateTransactionUseCase)
  }

  async execute(httpComms) {
    const { name, amount, type } = httpComms.body
    try {
      const createdTransaction = await this.CreateTransactionUseCase.execute(
        name,
        amount,
        type
      )

      if (createdTransaction) {
        return validRequest()
      }

      throw badRequest()
    } catch (error) {
      return error
    }
  }
}
