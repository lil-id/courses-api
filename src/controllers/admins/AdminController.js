/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const { Router } = require('express');
const adminModel = require('../../models/admins/AdminModel');
const response = require('../../utils/Response');

const adminRouter = Router();

// Admin Account Registration
adminRouter.post('/register', async (req, res) => {
  const data = await adminModel.createAdminAccount(req.body);
  response.sendResponse(res, data);
});

// Admin Login
adminRouter.post('/login', async (req, res) => {
  const data = await adminModel.loginAdminAccount(req.body);
  response.sendResponse(res, data);
});

module.exports = adminRouter;
