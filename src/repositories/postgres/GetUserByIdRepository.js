export class GetUserByIdRepository {
  constructor(DBHelper) {
    this.DBHelper = DBHelper
  }

  static create(DBHelper) {
    return new GetUserByIdRepository(DBHelper)
  }

  async execute(UserIdParam) {
    return await this.DBHelper.query('SELECT * FROM Users WHERE id = $1', [
      UserIdParam,
    ])
  }
}
