/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const prisma = require('../../configs/prisma-client/PrismaClientConfig');

const adminSession = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'jwt-secret-code');
      const adminEmail = await prisma.admin.findUnique({
        where: {
          email: decodedToken.email,
        },
      });

      if (adminEmail) {
        req.adminEmail = {
          email: adminEmail.email,
        };
        next();
      } else {
        res.status(403).send({
          status: false,
          error: 'Not Authorize',
        });
      }
    } catch (error) {
      res.status(403).send({
        status: false,
        error: 'Not Authorize',
      });
    }
  }

  if (!token) {
    res.status(401).send({
      status: false,
      error: 'Not Authorize, No Token',
    });
  }
};

module.exports = adminSession;
