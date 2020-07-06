import { getCustomRepository } from 'typeorm';

import { response } from 'express';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

import TransactionRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    // id existe no banco?
    const transactionRepository = getCustomRepository(TransactionRepository);
    const transaction = await transactionRepository.findOne(id);

    if (!transaction) {
      // id nao existe no banco?
      throw new AppError('Transaction does not exist.');
    }

    await transactionRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
