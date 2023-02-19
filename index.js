/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const express = require('express');
const adminRoutes = require('./src/routes/admins/AdminRoute');
const userRoutes = require('./src/routes/users/UserRoute');
const categoryRoutes = require('./src/routes/courses/course-categories/CourseCategoriesRoute');
const courseRoutes = require('./src/routes/courses/CourseRoute');
const userCourseRoutes = require('./src/routes/users/user-courses/UserCoursesRoute');

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

adminRoutes(app);
userRoutes(app);
categoryRoutes(app);
courseRoutes(app);
userCourseRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
