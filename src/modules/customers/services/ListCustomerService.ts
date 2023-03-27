import { getCustomRepository } from 'typeorm';
import { pagination } from 'typeorm-pagination';
import { paginate } from 'typeorm-pagination/dist/helpers/pagination';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total:number;
  current_page: number;
  prev_pag: number| null;
  next_page: number | null;
  data: Customer[];
}

export default class ListCustomerService {
  public async execute(): Promise<IPaginateCustomer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = await customersRepository.createQueryBuilder().paginate();

    return customers as unknown as IPaginateCustomer;
  }
}
