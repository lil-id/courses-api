const { Router } = require('express');
const courseCategoriesModel = require('../../../models/courses/course-categories/CourseCategoriesModel');
const response = require('../../../utils/Response');

const categoriesRouter = Router();

// Course Category Registration
categoriesRouter.post('/', async (req, res) => {
  const data = await courseCategoriesModel.createCategory(req.body);
  response.sendResponse(res, data);
});

// Get All Course Categories
categoriesRouter.get('/', async (req, res) => {
  const data = await courseCategoriesModel.getAllCategories();
  response.sendResponse(res, data);
});

// Get Details Course Category
categoriesRouter.get('/:categoryID', async (req, res) => {
  const { categoryID } = req.params;
  const data = await courseCategoriesModel.getDetailsCategory(BigInt(categoryID));
  response.sendResponse(res, data);
});

// Update Course Category
categoriesRouter.put('/:categoryID', async (req, res) => {
  const { categoryID } = req.params;
  const data = await courseCategoriesModel.updateCategory(req.body, BigInt(categoryID));
  response.sendResponse(res, data);
});

// Delete Course Category
categoriesRouter.delete('/:categoryID', async (req, res) => {
  const { categoryID } = req.params;
  const data = await courseCategoriesModel.deleteCategory(BigInt(categoryID));
  response.sendResponse(res, data);
});

module.exports = categoriesRouter;
