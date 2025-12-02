export class GetUserByIdRepository {
    constructor(DBHelper) {
        this.DBHelper = DBHelper
    }

    static create(DBHelper) {
        return new GetUserByIdRepository(DBHelper)
    }

    async execute(UserIdParam) {
        try {
            const foundUser = await this.DBHelper.query(
                'SELECT * FROM Users WHERE id = $1',
                [UserIdParam]
            )
            if (foundUser) {
                return foundUser
            }
        } catch (err) {
            throw err
        }
    }
}
