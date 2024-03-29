import customersRouter from '@modules/customers/routes/customers.routes';
import ordersRouter from '@modules/orders/routes/orders.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';
import productsRouter from 'src/modules/products/routes/products.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', productsRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;
