'use strict';

const jwt = require('jsonwebtoken');
const compose = require('composable-middleware');
const secret = 'hot-place-api-token-secret';
const expiresIn = '7 days'; // minutes

function generateToken ({ id, email, name }) {
  return jwt.sign({ id, email, name }, secret, { expiresIn });
}

function isAuthenticated () {
  const validate = require('express-jwt')({ secret });
  return compose()
    // Validate jwt
    .use(function (req, res, next) {
      try {
        console.log('token -> ', req.headers.authorization);
        validate(req, res, next);
      }
      catch (e) {
        console.error(e);
      }
    })
    .use(function (req, res, next) {
      console.log(1);
      // Attach user to request
      req.user = {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
      };
      next();
    });
}

exports.generateToken = generateToken;
exports.isAuthenticated = isAuthenticated;
