import { Post } from '../models';
import { Router } from 'express';
import { isAuthenticated } from '../lib/jwt';

const router = Router();

router.post('/', isAuthenticated(), async (req, res) => {
  try {
    const newPost = await Post.create({
      user: req.user.id,
      name: req.body.name,
    });
    res.status(201).json({
      id: newPost.id,
      title: newPost.title,
    });
  }
  catch (e) {
    res.status(500);
  }
});

router.get('/', async (req, res) => {
  try {
    const places = await Post.findAll();
    res.status(200).json(places);
  }
  catch (e) {
    res.status(500);
  }
});

router.get('/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const place = await Post.findById(postId);
    res.status(200).json(place);
  }
  catch (e) {
    res.status(500);
  }
});

export default router;
