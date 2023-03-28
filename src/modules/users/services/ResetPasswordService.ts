import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import UserRepository from '../infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '../infra/typeorm/repositories/UserTokensRepository';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const usersTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exist.');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    user.password = await hash(password, 8);

    await usersRepository.save(user);
  }
}

export default ResetPasswordService;
