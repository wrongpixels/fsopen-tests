import NewNoteForm from './NewNoteForm.jsx'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('<NewNoteForm /> updates and calls submit', async () => {
    const createNoteFunction = vi.fn()
    const toggleVisibility = vi.fn()
    const user = userEvent.setup()
    const { container } = render(<NewNoteForm
        toggleVisibility={toggleVisibility}
        createNote={createNoteFunction}
    /> )
    const textBox = screen.getAllByRole('textbox').find(t => t.id === 'note-input')
    const textBox1 = container.querySelector('#note-input')
    const textBox2 = screen.getByPlaceholderText('enter note')
    const sendButton = screen.getByText('Add')
    await user.type(textBox, 'Ahhhh')
    await user.click(sendButton)
    expect(createNoteFunction.mock.calls).toHaveLength(1)

})