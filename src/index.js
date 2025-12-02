import express from 'express'
import { DBHelper } from './db/postgres/DBHelper.js'
import { CreateUserController } from './controllers/CreateUserController.js'
import { CreateUserUseCase } from './usecases/CreateUserUseCase.js'
import { CreateUserRepository } from './repositories/postgres/CreateUserRepository.js'
import { Pool } from 'pg'
import { GetAllUsersRepository } from './repositories/postgres/GetAllUsersRepository.js'
import { GetAllUsersUseCase } from './usecases/GetAllUsersUseCase.js'
import { GetAllUsersController } from './controllers/GetAllUsersController.js'
import { GetUserByIdController } from './controllers/GetUserByIdController.js'
import { GetUserByIdUseCase } from './usecases/GetUserByIdUseCase.js'
import { GetUserByIdRepository } from './repositories/postgres/GetUserByIdRepository.js'
import { UpdateUserRepository } from './repositories/postgres/UpdateUserRepository.js'
import { UpdateUserUseCase } from './usecases/UpdateUserUseCase.js'
import { UpdateUserController } from './controllers/UpdateUserController.js'

const dbHelperInstance = DBHelper.create(Pool)
const app = express()

app.use(express.json())

app.patch('/users/:id', async (req, res) => {
    const updateUserRepository = UpdateUserRepository.create(dbHelperInstance)
    const updateUserUseCase = UpdateUserUseCase.create(updateUserRepository)
    const updateUserController = UpdateUserController.create(updateUserUseCase)

    try {
        const updatedUser = await updateUserController.execute(req)

        res.status(updatedUser.statusCode).send(updatedUser)
    } catch (err) {
        throw err
    }
})

app.get('/users', async (_, res) => {
    const getAllUsersRepository = GetAllUsersRepository.create(dbHelperInstance)
    const getAllUsersUseCase = GetAllUsersUseCase.create(getAllUsersRepository)
    const getAllUsersController =
        GetAllUsersController.create(getAllUsersUseCase)

    try {
        const users = await getAllUsersController.execute()

        res.status(200).send(users)
    } catch (err) {
        console.log(err)
    }
})

app.get('/users/:id', async (req, res) => {
    const getUserByIdRepository = GetUserByIdRepository.create(dbHelperInstance)
    const getUserByIdUseCase = GetUserByIdUseCase.create(getUserByIdRepository)
    const getUserByIdController =
        GetUserByIdController.create(getUserByIdUseCase)
    try {
        const users = await getUserByIdController.execute(req)

        res.status(users.statusCode).send(users)
    } catch (err) {
        console.log(err)
    }
})

app.post('/users', async (req, res) => {
    const createUserRepository = CreateUserRepository.create(dbHelperInstance)
    const createUserUseCase = CreateUserUseCase.create(createUserRepository)
    const createUserController = CreateUserController.create(createUserUseCase)
    try {
        const userCreated = await createUserController.execute(req)

        if (userCreated) {
            return res.status(201).send('User inserted Sucessfully')
        }
    } catch (error) {
        const statusCode = error.statusCode || 500
        const errorBody = error.body || {
            errorMessage: error.message || 'Internal server error',
        }
        return res.status(statusCode).json(errorBody)
    }
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`App rodando na porta ${process.env.PORT || 5000}`)
})
