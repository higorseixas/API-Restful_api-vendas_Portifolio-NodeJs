import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const emailExist = await usersRepository.findByEmail(email);

    if (emailExist) {
      throw new AppError('Email address already used.');
    }

    const hashePassword = await new hash(password, 8);

    const user = await createUser.execute({
      name,
      email,
      password: hashePassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
