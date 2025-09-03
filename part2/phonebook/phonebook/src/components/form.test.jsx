import { render, screen } from '@testing-library/react'
import PersonForm from './PersonForm'
import userEvent from '@testing-library/user-event'

test('create person calls onSubmi', async () => {
  const createPerson = vi.fn()
  const user = userEvent.setup()

  render(<PersonForm onSubmit={createPerson} />)
  
  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('add')

  await user.type(inputs[0], 'Component testing is done with react-testing-library')
  await user.type(inputs[1], '123456789')
  await user.click(sendButton)

  expect(createPerson).toHaveBeenCalledTimes(1)
  const event = createPerson.mock.calls[0][0]
  expect(event).toBeDefined()
  expect(typeof event.preventDefault).toBe('function')

})