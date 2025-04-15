import { useState } from 'react';

interface Note {
  content: string;
  id: string;
}

const App = () => {
  const [newNote, setNewNote] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', content: "Now, that's a NOTE" },
  ]);

  const addNote = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setNotes(
      notes.concat({
        id: String(notes.length + 1),
        content: newNote,
      })
    );
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
