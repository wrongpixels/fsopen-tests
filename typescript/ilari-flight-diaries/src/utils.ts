import { NewDiaryEntry, Weather } from './types';

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  console.log(object);
  const newEntry: NewDiaryEntry = {
    weather: 'cloudy', // fake the return value
    visibility: 'great',
    date: '2022-1-1',
    comment: 'comment',
  };

  return newEntry;
};

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isString(weather) || !isWeather(weather)) {
    throw new Error('Incorrect or missing weather:' + weather);
  }
  return weather;
};

const parseComment = (comment: unknown): string | undefined => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }
  return comment;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseData = (date: unknown): string => {
  if (!date || !isString(date) || isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isString = (text: unknown): text is string =>
  typeof text === 'string' || text instanceof String;
export default toNewDiaryEntry;
