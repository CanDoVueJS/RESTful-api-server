import { User } from '../models';
import { Router } from 'express';

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

router.post('/login', async (req, res) => {
  try {
    
  }
  catch (e) {}
})

export default router;
