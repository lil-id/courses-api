const { Router } = require('express');
const userModel = require('../../../models/users/user-courses/UserCoursesAccessModel');
const response = require('../../../utils/Response');

const userAccessRouter = Router();

// Create Course Access
userAccessRouter.post('/', async (req, res) => {
  const data = await userModel.createUserAccess(req.body);
  response.sendResponse(res, data);
});

// Get All User with All Courses
userAccessRouter.get('/', async (req, res) => {
  const data = await userModel.getAllUserAccess(req.body);
  response.sendResponse(res, data);
});

// Get One User with All Courses
userAccessRouter.get('/:userID', async (req, res) => {
  const { userID } = req.params;
  const data = await userModel.getUserCourseDetail(BigInt(userID));
  response.sendResponse(res, data);
});

// Update User Access
userAccessRouter.put('/:accessIDNumber', async (req, res) => {
  const { accessIDNumber } = req.params;
  const data = await userModel.updateUserAccess(req.body, BigInt(accessIDNumber));
  response.sendResponse(res, data);
});

// Delete User Access
userAccessRouter.delete('/:accessIDNumber', async (req, res) => {
  const { accessIDNumber } = req.params;
  const data = await userModel.deleteUserAccess(BigInt(accessIDNumber));
  response.sendResponse(res, data);
});

module.exports = userAccessRouter;
