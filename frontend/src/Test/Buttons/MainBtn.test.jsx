// src/Test/MainBtn.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

// useNavigate mock
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('MainBtn', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })


  //버튼에 “시작하기” 텍스트가 보이는지 확인
  it('renders the correct label for "start" variant', async () => {
    const { MainBtn } = await import('../../components/Button/MainBtn') // ✅ named export
    render(
      <MemoryRouter>
        <MainBtn variant="start" />
      </MemoryRouter>
    )

    expect(screen.getByText('시작하기')).toBeInTheDocument()
  })


    //버튼에 “저장하기” 텍스트가 보이는지 확인
  it('renders the correct label for "save" variant', async () => {
    const { MainBtn } = await import('../../components/Button/MainBtn')
    render(
      <MemoryRouter>
        <MainBtn variant="save" />
      </MemoryRouter>
    )

    expect(screen.getByText('저장하기')).toBeInTheDocument()
  })


  // 시작하기 버튼을 눌렀을 때 /make 경로로 navigate가 호출되는지 확인
  it('calls navigate when "start" variant is clicked', async () => {
    const { MainBtn } = await import('../../components/Button/MainBtn')
    render(
      <MemoryRouter>
        <MainBtn variant="start" />
      </MemoryRouter>
    )

    const btn = screen.getByText('시작하기')
    fireEvent.click(btn)

    expect(mockNavigate).toHaveBeenCalledWith('/make')
  })

  it('calls externalOnClick when provided', async () => {
    const externalClick = vi.fn()
    const { MainBtn } = await import('../../components/Button/MainBtn')

    render(
      <MemoryRouter>
        <MainBtn variant="save" onClick={externalClick} />
      </MemoryRouter>
    )

    const btn = screen.getByText('저장하기')
    fireEvent.click(btn)

    expect(externalClick).toHaveBeenCalled()
  })

  it('does not throw when "finish" variant is clicked', async () => {
    const { MainBtn } = await import('../../components/Button/MainBtn')

    render(
      <MemoryRouter>
        <MainBtn variant="finish" />
      </MemoryRouter>
    )

    const btn = screen.getByText('완료')
    fireEvent.click(btn)
    // 클릭 시 에러 없이 동작하면 OK
  })
})
