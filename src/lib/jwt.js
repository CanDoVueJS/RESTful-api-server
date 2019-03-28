'use strict';

const jwt = require('jsonwebtoken');
const compose = require('composable-middleware');
const secret = 'hot-place-api-token-secret';
const expiresIn = '7 days'; // minutes
const { User } = require('../models/index');

function generateToken ({ id, email, name }) {
  return jwt.sign({ id, email, name }, secret, { expiresIn });
}

function isAuthenticated () {
  const validate = require('express-jwt')({ secret });
  return compose()
    // Validate jwt
    .use(function (req, res, next) {
      try {
        validate(req, res, next);
      }
      catch (e) {
        console.error(e);
      }
    })
    .use(async function (req, res, next) {
      // Attach user to request
      try {
        const user = await User.findByPk(req.user.id);
        req.user = user;
        next();
      }
      catch (e) {
        next(e);
      }
    });
}

exports.generateToken = generateToken;
exports.isAuthenticated = isAuthenticated;
