import express from 'express'
import {
  createUserFactory,
  deleteUserFactory,
  getAllUsersFactory,
  getUserByEmailFactory,
  updateUserFactory,
  getUserByIdFactory,
} from './factories/index.js'

const app = express()

app.use(express.json())

//Update User
app.patch('/users/:id', async (req, res) => {
  try {
    const controller = updateUserFactory()
    const updatedUser = await controller.execute(req)
    return res.status(updatedUser.statusCode).send(updatedUser)
  } catch (error) {
    return res.status(error.statusCode).send(error)
  }
})

//Get All Users or Get User By Email
app.get('/users', async (req, res) => {
  const email = req.query.email
  try {
    if (!email) {
      const controller = getAllUsersFactory()
      const result = await controller.execute(req)
      return res.status(200).send(result)
    } else {
      const controller = getUserByEmailFactory()
      const result = await controller.execute(req)
      return res.status(result.statusCode).send(result)
    }
  } catch (error) {
    return res.status(error.statusCode).send(error)
  }
})

// Get User By Id Route
app.get('/users/:id', async (req, res) => {
  try {
    const controller = getUserByIdFactory()
    const users = await controller.execute(req)
    return res.status(users.statusCode).send(users)
  } catch (error) {
    return res.status(error.statusCode).send(error)
  }
})

//Create User
app.post('/users', async (req, res) => {
  try {
    const controller = createUserFactory()
    const userCreated = await controller.execute(req)
    return res.status(userCreated.statusCode).json(userCreated)
  } catch (error) {
    return res.status(error.statusCode).json(error)
  }
})

//Delete User by id
app.delete('/users/:id', async (req, res) => {
  try {
    const controller = deleteUserFactory()
    const deletedUser = await controller.execute(req)
    return res.status(deletedUser.statusCode).json(deletedUser)
  } catch (error) {
    return res.status(error.statusCode).json(error)
  }
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`App rodando na porta ${process.env.PORT || 5000}`)
})
