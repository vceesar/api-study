export class DeleteUserRepository {
    constructor(DBHelper) {
        this.DBHelper = DBHelper
    }

    static create(DBHelper) {
        return new DeleteUserRepository(DBHelper)
    }

    async execute(id) {
        const deletedUser = await this.DBHelper.query(
            `DELETE FROM Users where id = $1 RETURNING id`,
            [id]
        )

        return deletedUser
    }
}
