import { Comment } from '../../../models/index';
import { Router } from 'express';
import { isAuthenticated } from '../../../lib/jwt';

const router = Router({ mergeParams: true });

router.post('/comments', isAuthenticated(), async (req, res) => {
  try {
    const comment = await Comment.create({
      UserId: req.user.id,
      PostId: req.post.id,
      contents: req.body.contents,
    });
    console.log(comment);
    res.status(201).json({});
  }
  catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

export default router;
