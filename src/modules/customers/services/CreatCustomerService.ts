import AppError from '@shared/errors/AppError';
import { injectable, inject} from 'tsyringe'
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
export default class CreateCustomerService {
  constructor(
      @inject('CustomersRepository')
      private customersRepository: ICustomersRepository
    ) {}

  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {

    const emailExist = await this.customersRepository.findByEmail(email);

    if (emailExist) {
      throw new AppError('Email address already used.');
    }

    const customer = await this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}
