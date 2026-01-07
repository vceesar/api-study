export class GetUserByEmailRepository {
    constructor(DBHelper) {
        this.DBHelper = DBHelper
    }

    static create(DBHelper) {
        return new GetUserByEmailRepository(DBHelper)
    }

    async execute(email) {
        const userFound = this.DBHelper.query(
            'SELECT * FROM Users WHERE EMAIL = $1',
            [email]
        )

        return userFound
    }
}
