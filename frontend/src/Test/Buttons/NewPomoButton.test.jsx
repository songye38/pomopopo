// src/Test/NewPomoButton.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import NewPomoButton from '../../components/Button/NewPomoButton'

// useNavigate mock
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// uuid mock
vi.mock('uuid', () => ({
  v4: () => 'test-uuid',
}))

describe('NewPomoButton', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })


  //test case1 > 버튼이 기본 라벨로 렌더링 되는지 확인
  it('renders the button with default label', () => {
    render(
      <MemoryRouter>
        <NewPomoButton />
      </MemoryRouter>
    )

    expect(screen.getByText('새로운 뽀모도로 만들기')).toBeInTheDocument()
  })

  //test case2 > 버튼 클릭 시 /make/생성된-uuid 경로로 navigate가 호출되는지 확인
  it('calls navigate with generated uuid on click', () => {
    render(
      <MemoryRouter>
        <NewPomoButton />
      </MemoryRouter>
    )

    const btn = screen.getByText('새로운 뽀모도로 만들기')
    fireEvent.click(btn)

    expect(mockNavigate).toHaveBeenCalledWith('/make/test-uuid')
  })

  //test case3 > 커스텀 라벨로 렌더링 되는지 확인
  it('renders with custom label if provided', () => {
    render(
      <MemoryRouter>
        <NewPomoButton label="커스텀 버튼" />
      </MemoryRouter>
    )

    expect(screen.getByText('커스텀 버튼')).toBeInTheDocument()
  })
})
