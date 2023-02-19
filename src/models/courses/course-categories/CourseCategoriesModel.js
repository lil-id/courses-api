/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
const joi = require('joi');
const prisma = require('../../../configs/prisma-client/PrismaClientConfig');

class Categories {
  createCategory = async (body) => {
    try {
      const schema = joi.object({
        name: joi.string().required(),
      });

      const validation = schema.validate(body);

      if (validation.error) {
        const ErrorMessage = validation.error.details.map((detail) => detail.message);

        return {
          status: false,
          code: 422,
          error: ErrorMessage.join(', '),
        };
      }

      const createCourseCategory = await prisma.course_categories.create({
        data: {
          name: body.name,
        },
      });

      return {
        status: true,
        code: 201,
        data: createCourseCategory,
      };
    } catch (error) {
      return {
        status: false,
        error,
      };
    }
  };

  updateCategory = async (body, categoryID) => {
    try {
      const schema = joi.object({
        name: joi.string().required(),
      });

      const validation = schema.validate(body);

      if (validation.error) {
        const errorMessage = validation.error.details.map((detail) => detail.message);

        return {
          status: false,
          code: 422,
          error: errorMessage.join(', '),
        };
      }

      const updateCourseCategory = await prisma.course_categories.update({
        where: {
          id: categoryID,
        },
        data: {
          name: body.name,
        },
      });

      return {
        status: true,
        code: 200,
        data: updateCourseCategory,
      };
    } catch (error) {
      return {
        status: false,
        error,
      };
    }
  };

  getAllCategories = async () => {
    try {
      const getAllCourseCategories = await prisma.course_categories.findMany();

      return {
        status: true,
        code: 200,
        data: getAllCourseCategories,
      };
    } catch (error) {
      return {
        status: false,
        error,
      };
    }
  };

  getDetailsCategory = async (categoryID) => {
    try {
      const getDetailsCourseCategory = await prisma.course_categories.findUnique({
        where: {
          id: categoryID,
        },
      });

      return {
        status: true,
        code: 200,
        data: getDetailsCourseCategory,
      };
    } catch (error) {
      return {
        status: false,
        error,
      };
    }
  };

  deleteCategory = async (categoryID) => {
    try {
      const deleteCourseCategory = await prisma.course_categories.delete({
        where: {
          id: categoryID,
        },
      });

      return {
        status: true,
        code: 200,
        data: deleteCourseCategory,
      };
    } catch (error) {
      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new Categories();
