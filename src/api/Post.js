import { User, Post } from '../models';
import { Router } from 'express';
import { isAuthenticated } from '../lib/jwt';

const router = Router();

router.post('/', isAuthenticated(), async (req, res) => {
  try {
    const newPost = await Post.create({
      UserId: req.user.id,
      title: req.body.title,
      contents: req.body.contents,
    });
    res.status(201).json({
      id: newPost.id,
      title: newPost.title,
      contents: newPost.contents,
      user: req.user,
    });
  }
  catch (e) {
    if (e.name === 'SequelizeValidationError') {
      res.status(400).json({ msg: '잘못된 요청 입니다' });
    }
    else {
      res.status(500).json(e);
    }
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: { model: User },
    });
    res.status(200).json(posts);
  }
  catch (e) {
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findOne({
      where: { id },
      include: { model: User },
    });
    res.status(200).json(post);
  }
  catch (e) {
    res.status(500).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Post.destroy({
      where: { id },
    });
    res.status(204).json({});
  }
  catch (e) {
    res.status(500).json(e);
  }
});

export default router;
