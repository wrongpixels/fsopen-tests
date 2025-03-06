import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note.jsx'

const note = {
  content: 'Component testing is done with test-library/react',
  important: true
}

test('renders content', () => {
  render(<Note note={note} />)
  const element = screen.getByText(note.content)
  screen.debug(element)

})

test('renders with class', () => {
  const {container} = render(<Note note={note} ></Note>)
  const foundNote = container.querySelector('.note')
  expect(foundNote).toHaveTextContent(note.content)
})

test('can click on a button', async ()  => {
  const mockHandler = vi.fn()
  render(<Note note={note} toggleImportanceOf={mockHandler} ></Note>)
  const user = userEvent.setup()
  const button = screen.getByText('Set important')
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)
})