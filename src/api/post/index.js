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
  const { title, contents } = req.body;
  if (!title) {
    return res.status(400).json({ msg: '게시물 제목을 입력해주세요.' });
  }
  else if (!contents) {
    return res.status(400).json({ msg: '게시물 내용을 입력해주세요.' });
  }
  try {
    const newPost = await Post.create({
      UserId: req.user.id,
      title: req.body.title,
      contents: req.body.contents,
    });
    return res.status(201).json({
      id: newPost.id,
      title: newPost.title,
      contents: newPost.contents,
      user: req.user,
    });
  }
  catch (e) {
    if (e.name === 'SequelizeValidationError') {
      return res.status(400).json({ msg: e.errors[0].message });
    }
    else {
      return res.status(500).json(e);
    }
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: includeOption,
    });
    return res.status(200).json(posts);
  }
  catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findOne({
      where: { id },
      include: includeOption,
    });
    if (post) {
      return res.status(200).json(post);
    }
    else {
      return res.status(404).json({ msg: '포스트가 존재하지 않습니다.' });
    }
  }
  catch (e) {
    return res.status(500).json(e);
  }
});

router.put('/:id', isAuthenticated(), async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const post = await Post.findByPk(id);

  if (!post) {
    return res.status(404).json({ msg: '존재하지 않는 게시물입니다.' });
  }
  else if (!post.isMyPost(user)) {
    return res.status(403).json({ msg: '자신의 게시물이 아닌 게시물은 수정하실 수 없습니다.' });
  }

  const { title, contents } = req.body;
  if (!title) {
    return res.status(400).json({ msg: '게시물 제목을 입력해주세요.' });
  }
  else if (!contents) {
    return res.status(400).json({ msg: '게시물 내용을 입력해주세요.' });
  }

  try {
    post.title = req.body.title;
    post.contents = req.body.contents;
    await post.save();

    const updatedPost = await Post.findOne({
      where: { id },
      include: includeOption,
    });
    return res.status(200).json(updatedPost);
  }
  catch (e) {
    if (e.name === 'SequelizeValidationError') {
      return res.status(400).json({ msg: e.errors[0].message });
    }
    else {
      return res.status(500).json(e);
    }
  }
});

router.delete('/:id', isAuthenticated(), async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const post = await Post.findByPk(id);

  if (!post) {
    return res.status(404).json({ msg: '존재하지 않는 게시물입니다.' });
  }
  else if (!post.isMyPost(user)) {
    return res.status(403).json({ msg: '자신의 게시물이 아닌 게시물은 삭제하실 수 없습니다.' });
  }

  try {
    post.destroy();
    return res.status(204).json({});
  }
  catch (e) {
    return res.status(500).json(e);
  }
});

router.use('/:postId', async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404);
    }
    req.post = post;
    next();
  }
  catch (e) {
    return res.status(500).json(e);
  }
}, CommentView);

export default router;
