import axios from 'axios';
import { Note, NewNote } from '../types';

const URL = 'http://localhost:3001/api/notes';

export const getAllNotes = async () => (await axios.get<Note[]>(URL)).data;

export const createNote = async (note: NewNote) =>
  (await axios.post<Note>(URL, note)).data;
