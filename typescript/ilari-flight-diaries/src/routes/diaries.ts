/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Response } from 'express';
import diaryService from '../services/diaryService';
import { NonSensitiveDiaryEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const id: number = Number(req.params.id);
  const diary = diaryService.findById(id);
  if (diary) {
    res.send(diary);
  }
  res.sendStatus(404);
});

router.post('/', (req, res) => {
  const { weather, date, visibility, comment } = req.body;
  const newEntry = diaryService.addDiary({
    weather,
    date,
    visibility,
    comment,
  });
  res.status(202).json(newEntry);
});

export default router;
