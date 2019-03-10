import { User } from '../../models/index';
import { Router } from 'express';
import passport from 'passport';
import { generateToken } from '../../lib/jwt';

const router = Router();

router.post('/signup', async (req, res) => {
  try {
    await User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    res.status(201).json({});
  }
  catch (e) {
    const isSequelizeValidateError = e.name === 'SequelizeValidationError' || e.name === 'SequelizeUniqueConstraintError';
    if (isSequelizeValidateError) {
      res.status(400).json({ msg: e.errors[0].message });
    } else {
      console.error(e);
      res.status(500).json(e);
    }
  }
});

router.post('/signin', (req, res, next) => {
  try {
    passport.authenticate('local', (err, user, info) => {
      const error = err || info;
      if (error) {
        return res.status(400).json({ msg: error.message });
      }

      const accessToken = generateToken({
        id: user.id,
        email: user.email,
        name: user.name,
      });
      res.json({ accessToken: accessToken });
    })(req, res, next);
  }
  catch (e) {
    return res.status(500).json({});
  }
});

export default router;
