import {
  CreateUserRepository,
  DeleteUserRepository,
  GetAllUsersRepository,
  GetUserByEmailRepository,
  GetUserByIdRepository,
  UpdateUserRepository,
} from '../../repositories/index.js'

import {
  CreateUserController,
  DeleteUserController,
  GetAllUsersController,
  GetUserByEmailController,
  GetUserByIdController,
  UpdateUserController,
} from '../../controllers/index.js'

import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  GetUserByEmailUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
} from '../../usecases/index.js'
import { DBHelper } from '../../db/postgres/DBHelper.js'
import { Pool } from 'pg'

const dbHelperInstance = DBHelper.create(Pool)

export const getAllUsersFactory = () => {
  const repo = GetAllUsersRepository.create(dbHelperInstance)
  const useCase = GetAllUsersUseCase.create(repo)
  return GetAllUsersController.create(useCase)
}

export const getUserByEmailFactory = () => {
  const repo = GetUserByEmailRepository.create(dbHelperInstance)
  const useCase = GetUserByEmailUseCase.create(repo)
  return GetUserByEmailController.create(useCase)
}

export const getUserByIdFactory = () => {
  const repo = GetUserByIdRepository.create(dbHelperInstance)
  const useCase = GetUserByIdUseCase.create(repo)
  return GetUserByIdController.create(useCase)
}

export const createUserFactory = () => {
  const createUserRepo = CreateUserRepository.create(dbHelperInstance)
  const getUserByEmailRepo = GetUserByEmailRepository.create(dbHelperInstance)
  const createUserUseCase = CreateUserUseCase.create(createUserRepo)
  const getUserByEmailUseCase = GetUserByEmailUseCase.create(getUserByEmailRepo)
  return CreateUserController.create(createUserUseCase, getUserByEmailUseCase)
}

export const updateUserFactory = () => {
  const repo = UpdateUserRepository.create(dbHelperInstance)
  const useCase = UpdateUserUseCase.create(repo)
  return UpdateUserController.create(useCase)
}

export const deleteUserFactory = () => {
  const repo = DeleteUserRepository.create(dbHelperInstance)
  const useCase = DeleteUserUseCase.create(repo)
  return DeleteUserController.create(useCase)
}
