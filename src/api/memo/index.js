import { Memo } from '../../models/index';
import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  console.log(req.body);
  const { title, content } = req.body;
  if (!title) {
    return res.status(400).json({ msg: '메모 제목을 입력해주세요.' });
  }
  else if (!content) {
    return res.status(400).json({ msg: '메모 내용을 입력해주세요.' });
  }
  try {
    const newMemo = await Memo.create({
      title: req.body.title,
      content: req.body.content,
    });
    return res.status(201).json({
      id: newMemo.id,
      title: newMemo.title,
      content: newMemo.content,
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
    const memos = await Memo.findAll();
    return res.status(200).json(memos);
  }
  catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const memo = await Memo.findByPk(id);
    if (memo) {
      return res.status(200).json(memo);
    }
    else {
      return res.status(404).json({});
    }
  }
  catch (e) {
    return res.status(500).json(e);
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const memo = await Memo.findByPk(id);

  if (!memo) {
    return res.status(404).json({});
  }

  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ msg: '메모 내용을 입력해주세요.' });
  }

  try {
    memo.content = req.body.content;
    await memo.save();
    return res.status(200).json(memo);
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

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const memo = await Memo.findByPk(id);

  if (!memo) {
    return res.status(404).json({});
  }

  try {
    memo.destroy();
    return res.status(204).json({});
  }
  catch (e) {
    return res.status(500).json(e);
  }
});

export default router;
