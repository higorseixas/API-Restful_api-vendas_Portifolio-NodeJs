import AppError from '@shared/errors/AppError';
import fs from 'fs';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

interface IRequest {
  users_id: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  public async execute({ users_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findById(users_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (uploadConfig.driver === 's3') {
      const s3Provider = new S3StorageProvider();

      if (user.avatar) {
        await s3Provider.deleteFile(user.avatar);
      }

      const filename = await s3Provider.saveFile(avatarFilename);
      user.avatar = filename;

    } else {
      const diskProvider = new DiskStorageProvider();
      if (user.avatar) {
        await diskProvider.deleteFile(user.avatar);
      }

      const filename = await diskProvider.saveFile(avatarFilename);
      
      user.avatar = filename;

    }

    await usersRepository.save(user);

    return user;
  }
}
