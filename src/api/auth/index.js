import { User } from '../../models/index';
import { Router } from 'express';
import passport from 'passport';
import { generateToken } from '../../lib/jwt';

const router = Router();

router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email) {
    return res.status(400).json({ msg: '이메일을 입력해주세요.' });
  }
  else if (!password) {
    return res.status(400).json({ msg: '비밀번호를 입력해주세요.' });
  }
  else if (!name) {
    return res.status(400).json({ msg: '이름을 입력해주세요.' })
  }

  try {
    await User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    return res.status(201).json({});
  }
  catch (e) {
    const isSequelizeValidateError = e.name === 'SequelizeValidationError' || e.name === 'SequelizeUniqueConstraintError';
    if (isSequelizeValidateError) {
      return res.status(400).json({ msg: e.errors[0].message });
    }
    else {
      console.error(e);
      return res.status(500).json(e);
    }
  }
});

router.post('/signin', (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ msg: '이메일을 입력해주세요.' });
  }
  else if (!password) {
    return res.status(400).json({ msg: '비밀번호를 입력해주세요.' });
  }
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
      return res.json({ accessToken: accessToken });
    })(req, res, next);
  }
  catch (e) {
    return res.status(500).json({});
  }
});

export default router;
