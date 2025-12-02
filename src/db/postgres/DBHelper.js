export class DBHelper {
    constructor(Pool) {
        this.validateEnv()
        this.pool = new Pool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        })
    }

    static create(Pool) {
        return new DBHelper(Pool)
    }

    validateEnv() {
        const { DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env
        if (!DB_USER || !DB_PASSWORD || !DB_NAME || !DB_PORT) {
            throw new Error(
                'Database env vars missing: DB_USER, DB_PASSWORD, DB_NAME, DB_PORT must all be set'
            )
        }
    }

    async query(query, params) {
        const client = await this.pool.connect()
        try {
            const queryTeste = await client.query(query, params)
            // console.log('Query executed sucessfully !' + queryTeste.rows)
            return queryTeste.rows
        } catch (error) {
            console.error(error)
            throw error
        } finally {
            await client.release()
        }
    }
}
