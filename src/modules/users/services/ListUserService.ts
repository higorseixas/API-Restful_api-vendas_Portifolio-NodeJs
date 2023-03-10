// import AppError from '@shared/errors/AppError';
import Customer from '@modules/customers/typeorm/entities/Customer';
import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';

export default class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const users = customerRepository.find();

    return users;
  }
}
