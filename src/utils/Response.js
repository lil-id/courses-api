/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
const stringify = require('safe-stable-stringify');

class Response {
  sendResponse = (res, data) => {
    try {
      if (data.code) {
        res.status(data.code);
        delete data.code;
        res.send(stringify(data));
        return true;
      }

      res.status(data && data.status ? 200 : 400);
      res.send(stringify(data));
      return true;
    } catch (error) {
      res.status(400).send({
        status: false,
        error,
      });

      return false;
    }
  };
}

module.exports = new Response();
