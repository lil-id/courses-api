/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
const joi = require('joi');
const prisma = require('../../configs/prisma-client/PrismaClientConfig');

class Course {
  createCourse = async (body) => {
    try {
      const schema = joi.object({
        title: joi.string().required(),
        course_category_id: joi.number().integer().required(),
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

      const createCourse = await prisma.courses.create({
        data: {
          title: body.title,
          course_category_id: body.course_category_id,
        },
      });

      return {
        status: true,
        code: 201,
        data: createCourse,
      };
    } catch (error) {
      return {
        status: false,
        error,
      };
    }
  };

  updateCourseInformation = async (body, courseID) => {
    try {
      const schema = joi.object({
        title: joi.string().required(),
        course_category_id: joi.number().integer().required(),
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

      const updateCourseInformation = await prisma.courses.update({
        where: {
          id: courseID,
        },
        data: {
          title: body.title,
          course_category_id: body.course_category_id,
        },
      });

      return {
        status: true,
        code: 200,
        data: updateCourseInformation,
      };
    } catch (error) {
      return {
        status: false,
        error,
      };
    }
  };

  getAllCourses = async () => {
    try {
      const getAllCourses = await prisma.courses.findMany();

      return {
        status: true,
        code: 200,
        data: getAllCourses,
      };
    } catch (error) {
      return {
        status: false,
        error,
      };
    }
  };

  getCourseInformation = async (courseID) => {
    try {
      const getCourseDetails = await prisma.courses.findUnique({
        where: {
          id: courseID,
        },
      });

      return {
        status: true,
        code: 200,
        data: getCourseDetails,
      };
    } catch (error) {
      return {
        status: false,
        error,
      };
    }
  };

  deleteCourse = async (courseID) => {
    try {
      const deleteCourse = await prisma.courses.delete({
        where: {
          id: courseID,
        },
      });

      return {
        status: true,
        code: 200,
        data: deleteCourse,
      };
    } catch (error) {
      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new Course();
