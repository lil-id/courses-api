/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
const joi = require('joi');
const prisma = require('../../../configs/prisma-client/PrismaClientConfig');

class CourseAccess {
  createUserAccess = async (body) => {
    try {
      const schema = joi.object({
        users_id: joi.number().integer().required(),
        course_id: joi.number().integer().required(),
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

      const createUserAccess = await prisma.user_courses.create({
        data: {
          users_id: body.users_id,
          course_id: body.course_id,
        },
      });

      return {
        status: true,
        code: 201,
        data: createUserAccess,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        error,
      };
    }
  };

  updateUserAccess = async (body, accessIDNumber) => {
    try {
      const schema = joi.object({
        users_id: joi.number().integer().required(),
        course_id: joi.number().integer().required(),
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

      const updateUserAccount = await prisma.user_courses.updateMany({
        where: {
          id: accessIDNumber,
        },
        data: {
          users_id: body.users_id,
          course_id: body.course_id,
        },
      });

      return {
        status: true,
        code: 200,
        data: updateUserAccount,
      };
    } catch (error) {
      return {
        status: false,
        error,
      };
    }
  };

  // Get All User Access with All Courses
  getAllUserAccess = async () => {
    try {
      const getAllUsersAccess = await prisma.user_courses.findMany();

      return {
        status: true,
        code: 200,
        data: getAllUsersAccess,
      };
    } catch (error) {
      return {
        status: false,
        error,
      };
    }
  };

  // Get One User with All Courses
  getUserCourseDetail = async (userID) => {
    try {
      const getUserCourseDetails = await prisma.user_courses.findMany({
        where: {
          users_id: userID,
        },
      });

      return {
        status: true,
        code: 200,
        data: getUserCourseDetails,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        error,
      };
    }
  };

  deleteUserAccess = async (accessIdNumber) => {
    try {
      const deleteUserAccess = await prisma.user_courses.delete({
        where: {
          id: accessIdNumber,
        },
      });

      return {
        status: true,
        code: 200,
        data: deleteUserAccess,
      };
    } catch (error) {
      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new CourseAccess();
