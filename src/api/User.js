import { User } from '../models';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(200, users);
  }
  catch (e) {
    res.json(400);
  }
});

router.get('/:id', async (req, res) => {
  const id =req.params.id;
  try {
    const user = await User.findById(id);
    res.json(200, user);
  }
  catch (e) {
    res.json(400);
  }
});

export default router;
