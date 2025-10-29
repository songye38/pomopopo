// src/Test/DefaultPomoSection.test.tsx
// <reference types="vitest" />


import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import DefaultPomoSection from '../../components/DefaultPomoSection'

describe('DefaultPomoSection', () => {
  const defaultPomos = [
    "refine", "random", "reverse", "emotion", "explore",
    "story", "echo", "escape", "repeat", "empty"
  ]

  it('renders all default pomos', () => {
    render(<DefaultPomoSection />)
    
    defaultPomos.forEach((name) => {
      const img = screen.getByAltText(name)
      expect(img).toBeInTheDocument()
    })
  })

  it('calls onSelect with correct name when clicked', () => {
    const onSelect = vi.fn()
    render(<DefaultPomoSection onSelect={onSelect} />)

    const card = screen.getByAltText('random') // 예시로 'random' 선택
    fireEvent.click(card)

    expect(onSelect).toHaveBeenCalledWith('random')
  })
})
