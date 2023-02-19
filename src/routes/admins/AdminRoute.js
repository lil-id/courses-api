const adminController = require('../../controllers/admins/AdminController');

const listRoutes = [
  ['admins', adminController],
];

const routes = (app) => {
  listRoutes.forEach((route) => {
    const [url, controller] = route;
    app.use(`/api/auth/${url}`, controller);
  });
};

module.exports = routes;
