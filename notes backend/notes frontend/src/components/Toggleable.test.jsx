import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggleable from './Toggleable.jsx'


describe ('<Toggleable />', () => {

  let activeContainer
  beforeEach(() => {
    activeContainer = render(
      <Toggleable labelVisible="hide..." labelInvisible="show..." >
        <div className="testDiv">
                    toggleable content
        </div>
      </Toggleable>
    ).container
  })

  test('renders all its children', async () => await screen.findAllByText('toggleable content'))

  test('renders all its children with get', () => screen.getAllByText('toggleable content'))

  test('at start, the children are not displayed', () => {
    const div = activeContainer.querySelector('.toggleableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('if we hit the button, they are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)
    const div = activeContainer.querySelector('.toggleableContent')
    expect(div).not.toHaveStyle('display: none')
  })
  test('if we hit and re-hit, we go back to invisible', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)
    await user.click(button)
    const div = activeContainer.querySelector('.toggleableContent')
    expect(div).toHaveStyle('display: none')

  })
})