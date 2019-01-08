import { User } from '../models';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  }
  catch (e) {
    res.status(500);
  }
});

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  }
  catch (e) {
    res.status(500);
  }
});

export default router;
