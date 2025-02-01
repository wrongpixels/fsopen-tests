const Note = (props) => {
    const toggleImportanceOf = (note) => {
        props.toggleImportanceOf();
    }
    return(
        <li className='note'>
            {props.note.content}
            <button style={{marginLeft: 10}} onClick={()=>toggleImportanceOf(props.note)}>Set {props.note.important?'':'not'} important</button>
        </li>
    )
}
export default Note