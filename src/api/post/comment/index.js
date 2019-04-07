import { Router } from 'express';
import { isAuthenticated } from '../../../lib/jwt';
import { Comment, User } from '../../../models/index';

const router = Router({ mergeParams: true });

router.post('/comments', isAuthenticated(), async (req, res) => {
  const { contents } = req.body;
  if (!contents) {
    return res.status(400).json({ msg: '댓글 내용을 입력해주세요.' });
  }
  try {
    const newComment = await req.post.createComment({
      UserId: req.user.id,
      contents: req.body.contents,
    });
    const createdComment = await Comment.findOne({
      where: { id: newComment.id },
      include: [ User ],
    });
    return res.status(201).json(createdComment);
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

router.delete('/comments/:commentId', isAuthenticated(), async (req, res) =>{
  const id = parseInt(req.params.commentId);
  const user = req.user;
  const comments = await req.post.getComments();
  const comment = comments.find(comment => comment.id === id);

  if (!comment) {
    return res.status(404).json({ msg: '존재하지 않는 댓글입니다.' });
  }
  else if (!req.post.hasComment(id)) {
    return res.status(404).json({ msg: '이 게시물에 존재하지 않는 댓글입니다.' });
  }
  else if (!comment.isMyComment(user)) {
    return res.status(403).json({ msg: '자신의 댓글만 삭제하실 수 있습니다.' });
  }

  try {
    comment.destroy();
    return res.status(204).json({});
  }
  catch (e) {
    return res.status(500).json(e);
  }
});

router.put('/comments/:commentId', isAuthenticated(), async (req, res) => {
  const id = parseInt(req.params.commentId);
  const user = req.user;
  const comments = await req.post.getComments();
  const comment = comments.find(comment => comment.id === id);

  if (!comment) {
    return res.status(404).json({ msg: '존재하지 않는 댓글입니다.' });
  }
  else if (!req.post.hasComment(id)) {
    return res.status(404).json({ msg: '이 게시물에 존재하지 않는 댓글입니다.' });
  }
  else if (!comment.isMyComment(user)) {
    return res.status(403).json({ msg: '자신의 댓글만 수정하실 수 있습니다.' });
  }

  try {
    comment.contents = req.body.contents;
    await comment.save();
    const updatedComment = await Comment.findOne({
      where: { id: comment.id },
      include: [ User ],
    });
    return res.status(200).json(updatedComment);
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

export default router;
