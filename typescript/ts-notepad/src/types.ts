export interface Note {
  content: string;
  id: string;
}

export type NewNote = Omit<Note, 'id'>;
