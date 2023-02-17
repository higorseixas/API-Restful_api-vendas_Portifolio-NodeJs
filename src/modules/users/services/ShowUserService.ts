import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
}

class ShowUserService {
  public async execute({ id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const users = await usersRepository.findOne(id);

    if (!users) {
      throw new AppError('Product not found.');
    }

    return users;
  }
}

export default ShowUserService;
