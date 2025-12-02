export class GetAllUsersRepository {
    constructor(DBHelper) {
        this.DBHelper = DBHelper
    }

    static create(DBHelper) {
        return new GetAllUsersRepository(DBHelper)
    }

    async execute() {
        const users = await this.DBHelper.query(`SELECT * FROM Users`)

        return users
    }
}
