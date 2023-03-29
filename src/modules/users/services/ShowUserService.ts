import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IShowUser } from '../domain/models/IShowUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';


@injectable()
export default class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IShowUser): Promise<User> {
    const users = await this.usersRepository.findById(id);

    if (!users) {
      throw new AppError('Product not found.');
    }

    return users;
  }
}
