import noteServices from '../services/notes.js'

const Note = ({ toggleImportanceOf, note, removeNote }) => {

  return(
    <li className='note'>
     Note: {note.content}
      <button style={{ marginLeft: 10 }}
        onClick={ () => toggleImportanceOf(note.id)}>Set {note.important?'':'not '}important</button>
        <button onClick={() => removeNote(note.id)}>Remove</button>
    </li>
  )
}
export default Note