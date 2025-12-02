import fs from 'node:fs'
import { DBHelper, pool } from '../DBHelper.js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const executeMigrations = async () => {
    try {
        const filePath = path.join(__dirname, '01-create-tables.sql')
        const script = fs.readFileSync(filePath, 'utf-8')

        await DBHelper.query(script)
    } catch (error) {
        console.error(error)
    }
}

executeMigrations()
