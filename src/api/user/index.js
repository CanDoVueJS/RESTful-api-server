import { User } from '../../models/index';
import { Router } from 'express';
import { isAuthenticated } from '../../lib/jwt';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  }
  catch (e) {
    return res.status(500);
  }
});

router.get('/me', isAuthenticated(), async (req, res) => {
  return res.status(200).json(req.user);
});

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    return res.status(200).json(user);
  }
  catch (e) {
    return res.status(500);
  }
});

export default router;
