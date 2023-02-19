/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
const joi = require('joi');
const bcrypt = require('bcrypt');
const prisma = require('../../configs/prisma-client/PrismaClientConfig');

class User {
  createUserAccount = async (body) => {
    try {
      const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: joi.string().required(),
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

      const hashUserPassword = bcrypt.hashSync(body.password, 10);
      const createUserAccount = await prisma.users.create({
        data: {
          name: body.name,
          email: body.email,
          password: hashUserPassword,
        },
      });

      return {
        status: true,
        code: 201,
        data: createUserAccount,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        error,
      };
    }
  };

  updateUserAccount = async (body, id) => {
    try {
      const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: joi.string().required(),
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

      const hashUserPassword = bcrypt.hashSync(body.password, 10);
      const updateUserAccount = await prisma.users.update({
        where: {
          id,
        },
        data: {
          name: body.name,
          password: hashUserPassword,
          email: body.email,
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

  getAllUsersAccount = async () => {
    try {
      const getAllUsersAccount = await prisma.users.findMany();

      return {
        status: true,
        code: 200,
        data: getAllUsersAccount,
      };
    } catch (error) {
      return {
        status: false,
        error,
      };
    }
  };

  getUserAccountDetails = async (id) => {
    try {
      const getUserAccountDetails = await prisma.users.findUnique({
        where: {
          id,
        },
      });

      return {
        status: true,
        code: 200,
        data: getUserAccountDetails,
      };
    } catch (error) {
      return {
        status: false,
        error,
      };
    }
  };

  deleteUserAccount = async (id) => {
    try {
      const deleteUserAccount = await prisma.users.delete({
        where: {
          id,
        },
      });

      return {
        status: true,
        code: 200,
        data: deleteUserAccount,
      };
    } catch (error) {
      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new User();
