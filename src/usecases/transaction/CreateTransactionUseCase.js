import { v4 } from 'uuid'

export class CreateTransactionUseCase {
  constructor(CreateTransactionRepository) {
    this.CreateTransactionRepository = CreateTransactionRepository
  }

  static create(CreateTransactionRepository) {
    return new CreateTransactionUseCase(CreateTransactionRepository)
  }

  execute(name, amount, type) {
    const transactionID = v4()
    const currentDate = new Date().toLocaleDateString()
    return this.CreateTransactionRepository.execute(
      transactionID,
      '42df76b6-535b-46ad-aa80-acac0a18e5cd',
      name,
      amount,
      type,
      currentDate
    )
  }
}
