import PG from 'pg'
import { CreateTransactionController } from '../../controllers/index.js'
import { DBHelper } from '../../db/postgres/DBHelper.js'
import { CreateTransactionRepository } from '../../repositories/index.js'
import { CreateTransactionUseCase } from '../../usecases/index.js'
import { Pool } from 'pg'

const dbHelperInstance = DBHelper.create(Pool)
export const createTransactionFactory = () => {
  const createTransactionRepository =
    CreateTransactionRepository.create(dbHelperInstance)
  const createTransactionUseCase = CreateTransactionUseCase.create(
    createTransactionRepository
  )
  const createTransactionController = CreateTransactionController.create(
    createTransactionUseCase
  )

  return createTransactionController
}
