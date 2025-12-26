export class GetUserByEmailRepository {
    constructor(DBHelper) {
        this.DBHelper = DBHelper
    }

    static create(DBHelper) {
        return new GetUserByEmailRepository(DBHelper)
    }

    async execute() {}
}
