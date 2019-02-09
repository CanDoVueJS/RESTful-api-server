import { Comment } from '../../../models/index';
import { Router } from 'express';
import { isAuthenticated } from '../../../lib/jwt';

const router = Router({ mergeParams: true });

router.post('/comments', isAuthenticated(), async (req, res) => {
  try {
    await req.post.createComment({
      UserId: req.user.id,
      contents: req.body.contents,
    });
    res.status(201).json({});
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

router.delete('/comments/:commentId', isAuthenticated(), async (req, res) =>{
  const id = req.params.commentId;
  const user = req.user;
  const comment = await Comment.findByPk(id);

  if (!comment) {
    res.status(404).json({ msg: '존재하지 않는 댓글입니다.' });
  }
  else if (!req.post.hasComment(id)) {
    res.status(404).json({ msg: '이 게시물에 존재하지 않는 댓글입니다.' });
  }
  else if (!comment.isMyComment(user)) {
    res.status(403).json({ msg: '자신의 댓글만 삭제하실 수 있습니다.' });
  }

  try {
    comment.destroy();
    res.status(204).json({});
  }
  catch (e) {
    res.status(500).json(e);
  }
});

router.put('/comments/:commentId', isAuthenticated(), async (req, res) => {
  const id = req.params.commentId;
  const user = req.user;
  const comment = await Comment.findByPk(id);

  if (!comment) {
    res.status(404).json({ msg: '존재하지 않는 댓글입니다.' });
  }
  else if (!req.post.hasComment(id)) {
    res.status(404).json({ msg: '이 게시물에 존재하지 않는 댓글입니다.' });
  }
  else if (!comment.isMyComment(user)) {
    res.status(403).json({ msg: '자신의 댓글만 수정하실 수 있습니다.' });
  }

  try {
    comment.contents = req.body.contents;
    await comment.save();
    res.status(200).json({});
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

export default router;
