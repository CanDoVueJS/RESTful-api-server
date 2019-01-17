import { User, Post } from '../models';
import { Router } from 'express';
import { isAuthenticated } from '../lib/jwt';

const router = Router();

router.post('/', isAuthenticated(), async (req, res) => {
  try {
    const newPost = await Post.create({
      userId: req.user.id,
      title: req.body.title,
      contents: req.body.contents,
    });
    res.status(201).json({
      id: newPost.id,
      title: newPost.title,
      contents: newPost.contents,
      user: newPost.user,
    });
  }
  catch (e) {
    res.status(500).json(e);
  }
});

router.get('/', async (req, res) => {
  try {
    const places = await Post.findAll({
      include: { model: User },
    });
    res.status(200).json(places);
  }
  catch (e) {
    res.status(500);
  }
});

router.get('/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const place = await Post.findOne({
      where: { id: postId },
      include: { model: User },
    });
    res.status(200).json(place);
  }
  catch (e) {
    res.status(500);
  }
});

export default router;
