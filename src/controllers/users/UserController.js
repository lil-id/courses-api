const { Router } = require('express');
const userModel = require('../../models/users/UserModel');
const response = require('../../utils/Response');

const userRouter = Router();

// Users Registration
userRouter.post('/', async (req, res) => {
  const data = await userModel.createUserAccount(req.body);
  response.sendResponse(res, data);
});

// Get All Users Account
userRouter.get('/', async (req, res) => {
  const data = await userModel.getAllUsersAccount();
  response.sendResponse(res, data);
});

// Get User Details Account
userRouter.get('/:idUser', async (req, res) => {
  const { idUser } = req.params;
  const data = await userModel.getUserAccountDetails(BigInt(idUser));
  response.sendResponse(res, data);
});

// User Update Account
userRouter.put('/:idUser', async (req, res) => {
  const { idUser } = req.params;
  const data = await userModel.updateUserAccount(req.body, BigInt(idUser));
  response.sendResponse(res, data);
});

// User Delete Account
userRouter.delete('/:idUser', async (req, res) => {
  const { idUser } = req.params;
  const data = await userModel.deleteUserAccount(BigInt(idUser));
  response.sendResponse(res, data);
});

module.exports = userRouter;
