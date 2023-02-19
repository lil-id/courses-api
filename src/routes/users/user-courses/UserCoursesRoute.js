const userAccessController = require('../../../controllers/users/user-courses/UserCoursesAccessController');

const listRoutes = [
  ['user-courses', userAccessController],
];

const routes = (app) => {
  listRoutes.forEach((route) => {
    const [url, controller] = route;

    app.use(`/api/${url}`, controller);
  });
};

module.exports = routes;
