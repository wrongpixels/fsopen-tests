import { NewDiaryEntry, Visibility, Weather } from './types';

const objectHasFields = (
  object: unknown,
  fields: string[]
): object is {
  weather: unknown;
  visibility: unknown;
  date: unknown;
  comment: unknown;
} => {
  if (!object || typeof object !== 'object') {
    return false;
  }
  for (const f of fields) {
    if (!(f in object)) {
      return false;
    }
  }
  return true;
};

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!objectHasFields(object, ['weather', 'visibility', 'date', 'comment'])) {
    throw new Error('Incorrect or missing data');
  }
  const newEntry: NewDiaryEntry = {
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility),
    date: parseDate(object.date),
    comment: parseComment(object.comment),
  };

  return newEntry;
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error('Incorrect or missing visibility: ' + visibility);
  }
  return visibility;
};

const isVisibility = (visibility: string): visibility is Visibility =>
  Object.values(Visibility).includes(visibility as Visibility);

const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error('Incorrect or missing weather: ' + weather);
  }
  return weather;
};

const isWeather = (weather: string): weather is Weather =>
  Object.values(Weather).includes(weather as Weather);

const parseComment = (comment: unknown): string | undefined => {
  if (!isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }
  return comment;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseDate = (date: unknown): string => {
  if (!isString(date) || isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isString = (text: unknown): text is string =>
  typeof text === 'string' || text instanceof String;
export default toNewDiaryEntry;
