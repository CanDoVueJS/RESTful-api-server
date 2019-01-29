import { User, Post, Comment } from '../../models/index';
import { Router } from 'express';
import CommentView from './comment';
import { isAuthenticated } from '../../lib/jwt';

const router = Router();
const includeOption = [{ all: true }, {
  model: Comment,
  include: {
    model: User,
  },
}];

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
      include: includeOption,
    });
    res.status(200).json(posts);
  }
  catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findOne({
      where: { id },
      include: includeOption,
    });
    res.status(200).json(post);
  }
  catch (e) {
    res.status(500).json(e);
  }
});

router.put('/:id', isAuthenticated(), async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const post = await Post.findByPk(id);

  if (!post.isMyPost(user)) {
    res.status(403).json({ msg: '자신의 게시물이 아닌 게시물은 수정하실 수 없습니다.' });
  }

  try {
    post.title = req.body.title;
    post.contents = req.body.contents;
    await post.save();

    const updatedPost = await Post.findOne({
      where: { id },
      include: includeOption,
    });
    res.status(200).json(updatedPost);
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

router.delete('/:id', isAuthenticated(), async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const post = await Post.findByPk(id);

  if (!post.isMyPost(user)) {
    res.status(403).json({ msg: '자신의 게시물이 아닌 게시물은 삭제하실 수 없습니다.' });
  }

  try {
    post.destroy();
    res.status(204).json({});
  }
  catch (e) {
    res.status(500).json(e);
  }
});

router.use('/:postId', async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      res.status(404);
    }
    req.post = post;
    next();
  }
  catch (e) {
    res.status(500).json(e);
  }
}, CommentView);

export default router;
