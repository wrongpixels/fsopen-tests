import express, { Response, Request, NextFunction } from 'express';
import diaryService from '../services/diaryService';
import { NonSensitiveDiaryEntry } from '../types';
import { newEntrySchema } from '../utils';
import { NewDiaryEntry } from '../types';
import z from 'zod';

const router = express.Router();

const newDiaryParse = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (e) {
    next(e);
  }
};

const handleZodErrors = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({ error: error.issues });
  }
  next(error);
};

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

router.post(
  '/',
  newDiaryParse,
  (req: Request<unknown, unknown, NewDiaryEntry>, res) => {
    try {
      const newEntry = diaryService.addDiary(req.body);
      res.status(202).json(newEntry);
      console.log('added', newEntry);
    } catch (e: unknown) {
      res
        .status(500)
        .json({ error: e instanceof Error ? e.message : 'unknown error' });
    }
  }
);
router.use(handleZodErrors);

export default router;
