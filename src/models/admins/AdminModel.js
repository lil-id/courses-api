/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../../configs/prisma-client/PrismaClientConfig');

class Admin {
  createAdminAccount = async (body) => {
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

      const hashAdminPassword = bcrypt.hashSync(body.password, 10);
      const createAdminAccount = await prisma.admin.create({
        data: {
          name: body.name,
          email: body.email,
          password: hashAdminPassword,
        },
      });

      return {
        status: true,
        code: 201,
        data: createAdminAccount,
      };
    } catch (error) {
      return {
        status: false,
        error,
      };
    }
  };

  loginAdminAccount = async (body) => {
    try {
      const schema = joi.object({
        email: joi.string().required().email(
          { minDomainSegments: 2, tlds: { allow: ['com', 'net'] } },
        ),
        password: joi.string().required(),
      });

      const validation = schema.validate(body);

      if (validation.error) {
        const errorDetails = validation.error.details.map((detail) => detail.message);

        return {
          status: false,
          code: 422,
          error: errorDetails.join(', '),
        };
      }
      const adminEmail = await prisma.admin.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!adminEmail) {
        return {
          status: false,
          code: 404,
          error: 'Email or Password Wrong',
        };
      }

      if (!bcrypt.compareSync(body.password, adminEmail.password)) {
        return {
          status: false,
          code: 401,
          error: 'Email or Password Wrong',
        };
      }

      const payload = {
        email: adminEmail.email,
      };

      const createToken = jwt.sign(payload, 'jwt-secret-code', { expiresIn: '30m' });

      return {
        status: true,
        data: {
          createToken,
        },
      };
    } catch (error) {
      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new Admin();
