const courseCategoriesController = require('../../../controllers/courses/course-categories/CourseCategoriesController');

const listRoutes = [
  ['categories', courseCategoriesController],
];

const routes = (app) => {
  listRoutes.forEach((route) => {
    const [url, controller] = route;
    app.use(`/api/${url}`, controller);
  });
};

module.exports = routes;
