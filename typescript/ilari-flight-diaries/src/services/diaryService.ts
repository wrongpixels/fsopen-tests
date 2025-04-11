import diaryData from '../../data/entries';
import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

const getEntries = (): DiaryEntry[] => diaryData;

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] =>
  getEntries().map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));

const addDiary = () => null;

export default { getEntries, addDiary, getNonSensitiveEntries };
