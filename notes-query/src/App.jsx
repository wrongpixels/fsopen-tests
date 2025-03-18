import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNote, updateNote } from './requests.js'

const App = () => {
  const queryClient = useQueryClient()
  const activeNotes = () => queryClient.getQueryData(['notes'])
  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      queryClient.setQueryData(['notes'], activeNotes().concat(newNote))
    }
  })
  const editNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: (editedNote) => {
      queryClient.setQueryData(['notes'], activeNotes()
          .map(n => n.id === editedNote.id?editedNote:n))
    }
  })

  const addNote = async (event) => {
    event.preventDefault()
    const note = { content: event.target.note.value, important: true }
    newNoteMutation.mutate(note)
    event.target.note.value = ''
  }

  const toggleImportance = (note) => {
    const editedNote = {...note, important: !note.important}
    editNoteMutation.mutate(editedNote)
  }

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading)
  {
    return <div>Loading data…</div>
  }

  const notes = result.data

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} 
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App