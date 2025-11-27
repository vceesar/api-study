import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

export const DBHelper = {
    query: async (query) => {
        const client = await pool.connect()
        try {
            const queryTeste = await client.query(query)
            console.log('Query executed sucessfully !')
            return JSON.stringify(queryTeste.rows)
        } catch (error) {
            console.error(error)
            throw error
        } finally {
            await client.end()
        }
    },
}
