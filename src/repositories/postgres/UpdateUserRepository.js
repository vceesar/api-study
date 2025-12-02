export class UpdateUserRepository {
    constructor(DBHelper) {
        this.DBHelper = DBHelper
    }

    static create(DBHelper) {
        return new UpdateUserRepository(DBHelper)
    }

    async execute(userId, userFieldsParam) {
        const updatedFields = []
        const updatedValues = []

        Object.keys(userFieldsParam).forEach((item, index) => {
            updatedFields.push(`${item} = $${index + 1}`)
            updatedValues.push(userFieldsParam[item])
        })

        updatedValues.push(userId)

        const queryFields = updatedFields.join(', ')
        const userIdField = updatedFields.length + 1

        const query = `UPDATE Users SET ${queryFields} WHERE id = $${userIdField} RETURNING *`
        return await this.DBHelper.query(query, updatedValues)
    }
}
