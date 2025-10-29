// src/Test/StartPomoBtn.test.tsx
// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { StartPomoBtn } from '../../components/Button/StartPomoBtn'

describe('StartPomoBtn', () => {
  it('renders with default label', () => {
    render(<StartPomoBtn />)
    expect(screen.getByText('시작하기')).toBeInTheDocument()
  })

  it('renders with custom label if provided', () => {
    render(<StartPomoBtn label="커스텀 시작" />)
    expect(screen.getByText('커스텀 시작')).toBeInTheDocument()
  })

  it('calls external onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<StartPomoBtn onClick={handleClick} />)

    const btn = screen.getByText('시작하기')
    fireEvent.click(btn)

    expect(handleClick).toHaveBeenCalled()
  })

  // it('changes background color on hover', () => {
  //   render(<StartPomoBtn />)

  //   const btn = screen.getByText('시작하기')
  //   const wrapper = btn.parentElement as HTMLElement

  //   // 초기 색상은 hex → 브라우저에서 rgb로 변환
  //   expect(wrapper).toHaveStyle({ background: 'rgb(229, 56, 45)' })

  //   // hover 시작
  //   fireEvent.mouseEnter(wrapper)
  //   expect(wrapper).toHaveStyle({ background: 'rgba(229, 56, 45, 0.3)' })

  //   // hover 종료
  //   fireEvent.mouseLeave(wrapper)
  //   expect(wrapper).toHaveStyle({ background: 'rgb(229, 56, 45)' })
  // })
})
