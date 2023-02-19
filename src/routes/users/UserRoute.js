const userController = require('../../controllers/users/UserController');

const listRoutes = [
  ['users', userController],
];

const routes = (app) => {
  listRoutes.forEach((route) => {
    const [url, controller] = route;

    app.use(`/api/${url}`, controller);
  });
};

module.exports = routes;
