import { Place } from '../models';
import { Router } from 'express';
import { isAuthenticated } from '../lib/jwt';

const router = Router();

router.post('/', isAuthenticated(), async (req, res) => {
  try {
    const newPlace = await Place.create({
      user: req.user.id,
      name: req.body.name,
    });
    res.status(201).json({
      id: newPlace.id,
      name: newPlace.name,
    });
  }
  catch (e) {
    res.status(500);
  }
});

router.get('/', async (req, res) => {
  try {
    const places = await Place.findAll();
    res.status(200).json(places);
  }
  catch (e) {
    res.status(500);
  }
});

router.get('/:id', async (req, res) => {
  const placeId = req.params.id;
  try {
    const place = await Place.findById(placeId);
    res.status(200).json(place);
  }
  catch (e) {
    res.status(500);
  }
});

export default router;
