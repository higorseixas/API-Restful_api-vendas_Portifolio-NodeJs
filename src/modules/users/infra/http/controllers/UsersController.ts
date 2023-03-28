import { Request, Response } from 'express';
import ListUserService from '../../../services/ListUserService';
import CreateUserService from '../../../services/CreatUserService';
import { hash } from 'bcryptjs';
import { instanceToInstance } from 'class-transformer';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService();

    const users = listUser.execute();

    return response.json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = await new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }
}
