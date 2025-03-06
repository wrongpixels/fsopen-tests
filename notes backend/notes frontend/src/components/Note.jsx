const Note = ({ toggleImportanceOf, note }) => {
  return(
    <li className='note'>
      {note.content}
      <button style={{ marginLeft: 10 }}
        onClick={() => toggleImportanceOf(note.id)}>Set {note.important?'':'not '}important</button>
    </li>
  )
}
export default Note