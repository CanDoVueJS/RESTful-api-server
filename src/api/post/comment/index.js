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
  }
});

router.delete('/comments/:commentId', isAuthenticated(), async (req, res) =>{
  const id = req.params.commentId;
  const user = req.user;
  const comment = await Comment.findByPk(id);
  if (!comment.isMyComment(user)) {
    res.status(403).json().json({ msg: '자신의 댓글만 삭제하실 수 있습니다.' });
  }

  try {
    comment.destroy();
    res.status(204).json({});
  }
  catch (e) {
    res.status(500).json(e);
  }
});

export default router;
