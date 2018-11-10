import { User } from '../models';
import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    res.status(201).json({
      id: newUser.null,
      email: newUser.email,
      name: newUser.name,
    });
  }
  catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

router.post('/login', (req, res, next) => {
  try {
    passport.authenticate('local', (err, user, info) => {
      const error = err || info;
      if (error) return res.status(401).json(error);
      if (!user) return res.status(404).json({});

      res.json(req.user);
    })(req, res, next);
  }
  catch (e) {}
})

export default router;
