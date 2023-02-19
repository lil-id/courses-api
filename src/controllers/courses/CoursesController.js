const { Router } = require('express');
const courseModel = require('../../models/courses/CoursesModel');
const response = require('../../utils/Response');

const courseRouter = Router();

// Course Registration
courseRouter.post('/', async (req, res) => {
  const data = await courseModel.createCourse(req.body);
  response.sendResponse(res, data);
});

// Get All Courses
courseRouter.get('/', async (req, res) => {
  const data = await courseModel.getAllCourses(req.body);
  response.sendResponse(res, data);
});

// Get Detailed Course Information
courseRouter.get('/:courseID', async (req, res) => {
  const { courseID } = req.params;
  const data = await courseModel.getCourseInformation(BigInt(courseID));
  response.sendResponse(res, data);
});

// Update Course Information
courseRouter.put('/:courseID', async (req, res) => {
  const { courseID } = req.params;
  const data = await courseModel.updateCourseInformation(req.body, BigInt(courseID));
  response.sendResponse(res, data);
});

// Delete Course
courseRouter.delete('/:courseID', async (req, res) => {
  const { courseID } = req.params;
  const data = await courseModel.deleteCourse(BigInt(courseID));
  response.sendResponse(res, data);
});

module.exports = courseRouter;
