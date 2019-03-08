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
    if (e.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ msg: '이미 가입된 이메일 입니다' });
    }
    else if (e.name === 'SequelizeValidationError') {
      res.status(400).json({ msg: '잘못된 요청 입니다' });
    }
    else {
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
        return res.status(400).json({ msg: '존재하지 않는 이메일 입니다.' });
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
