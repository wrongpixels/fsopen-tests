import { useState, useEffect } from 'react';
import { Note } from './types';
import { getAllNotes, createNote } from './services/noteService';

const App = () => {
  const [newNote, setNewNote] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>();
  const fetchNotes = async () => {
    const data = await getAllNotes();
    setNotes(data);
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  if (!notes) {
    return <>Loading...</>;
  }

  const addNote = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const addedNote = await createNote({
      content: newNote,
    });
    setNotes(notes.concat(addedNote));
  };

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {notes.map((n) => (
          <li key={n.id}>{n.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
