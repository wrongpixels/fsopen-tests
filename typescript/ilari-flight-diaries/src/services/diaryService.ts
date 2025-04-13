import diaryData from '../../data/entries';
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

let diaryEntries: DiaryEntry[] = diaryData;

const getEntries = (): DiaryEntry[] => diaryEntries;

const findById = (id: number): DiaryEntry | undefined =>
  diaryEntries.find((e) => e.id === id);

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] =>
  getEntries().map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));

const addDiary = (entry: NewDiaryEntry): DiaryEntry | undefined => {
  const newEntry: DiaryEntry = {
    id: getEntries().length + 1,
    ...entry,
  };
  if (newEntry) {
    diaryEntries = diaryEntries.concat(newEntry);
    return newEntry;
  }
  return undefined;
};

export default { getEntries, addDiary, getNonSensitiveEntries, findById };
