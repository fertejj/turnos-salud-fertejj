// src/shared/ui/__tests__/PrimaryButton.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PrimaryButton from '../button/PrimaryButton'
import { vi } from 'vitest'


describe('PrimaryButton', () => {
  it('renders the button with text', () => {
    render(<PrimaryButton onClick={() => {}}>Click me</PrimaryButton>)
    expect(screen.getByText(/click me/i)).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<PrimaryButton onClick={handleClick}>Click</PrimaryButton>)

    await userEvent.click(screen.getByText(/click/i))
    expect(handleClick).toHaveBeenCalled()
  })
})
