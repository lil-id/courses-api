const courseController = require('../../controllers/courses/CoursesController');

const listRoutes = [
  ['courses', courseController],
];

const routes = (app) => {
  listRoutes.forEach((route) => {
    const [url, controller] = route;
    app.use(`/api/${url}`, controller);
  });
};

module.exports = routes;
