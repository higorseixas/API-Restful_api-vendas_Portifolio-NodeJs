import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';
import productsRouter from '@modules/products/infra/http/routes/products.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', productsRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;
