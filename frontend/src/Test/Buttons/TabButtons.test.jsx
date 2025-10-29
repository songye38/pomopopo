/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { TabButtons } from '../../components/Button/TabButtons'
import styles from '../../styles/TabButtons.module.css'

describe('TabButtons', () => {
  const tabs = ['탭1', '탭2', '탭3']

  it('renders all tabs', () => {
    render(<TabButtons activeTab="탭1" onTabChange={() => {}} tabs={tabs} />)

    tabs.forEach((tab) => {
      expect(screen.getByText(tab)).toBeInTheDocument()
    })
  })

  it('applies active class to the active tab', () => {
    render(<TabButtons activeTab="탭2" onTabChange={() => {}} tabs={tabs} />)
    const activeBtn = screen.getByText('탭2')
    expect(activeBtn).toHaveClass(styles.active)
  })

  it('calls onTabChange with correct tab on click', () => {
    const onTabChange = vi.fn()
    render(<TabButtons activeTab="탭1" onTabChange={onTabChange} tabs={tabs} />)

    const tabBtn = screen.getByText('탭3')
    fireEvent.click(tabBtn)
    expect(onTabChange).toHaveBeenCalledWith('탭3')
  })
})
