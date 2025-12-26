export class CreateUserRepository {
    constructor(DBHelper) {
        this.DBHelper = DBHelper
    }

    static create(DBHelper) {
        return new CreateUserRepository(DBHelper)
    }

    async execute(CreateUserParams) {
        const userCreated = await this.DBHelper.query(
            'INSERT INTO Users (id,first_name,last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [
                CreateUserParams.id,
                CreateUserParams.first_name,
                CreateUserParams.last_name,
                CreateUserParams.email,
                CreateUserParams.password,
            ]
        )
        return userCreated[0]
    }
}
