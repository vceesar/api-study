import express from 'express'
import { DBHelper } from './db/postgres/helper.js'

const app = express()

// Middleware to parse JSON request bodies
app.use(express.json())

app.get('/', async (req, res) => {
    const db = await DBHelper.query('SELECT * FROM Users')
    res.send(db)
})

app.post('/users', async (req, res) => {
    const { id, name } = req.body
    if (id === undefined || name === undefined) {
        return res.status(400).send('Id or Name are invalid!')
    }

    try {
        await DBHelper.query(
            `INSERT INTO Users (id, name) VALUES (${id}, '${name}')`
        )

        res.status(201).send('User inserted Sucessfully')
    } catch (error) {
        res.status(500).send('Error inserting user: ' + error.message)
    }
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`App rodando na porta ${process.env.PORT || 5000}`)
})
