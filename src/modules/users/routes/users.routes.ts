import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import UsersControlles from "../controllers/UsersController";
import { defaults } from "joi";

const usersRouter = Router();
const usersController = new UsersControlles();

usersRouter.get('/', usersController.index);
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

export default usersRouter;
