export class CreateTransactionRepository {
  constructor(DBHelper) {
    this.DBHelper = DBHelper
  }

  static create(DBHelper) {
    return new CreateTransactionRepository(DBHelper)
  }

  async execute(id, userid, name, amount, type, date) {
    const createdTransaction = await this.DBHelper.query(
      `
      INSERT INTO Transactions (id, user_id, name, amount, type, date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [id, userid, name, amount, type, date]
    )

    return createdTransaction[0]
  }
}
