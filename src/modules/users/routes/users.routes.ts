import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import UsersControlles from "../controllers/UsersController";
import isAuthenticated from "../../../shared/http/middlewares/isAthenticated";
import UserAvatarController from '../controllers/UserAvatarController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const usersController = new UsersControlles();
const usersAvatarController = new UserAvatarController();
const upload = multer(uploadConfig.multer);

usersRouter.get('/', isAuthenticated, usersController.index);
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
