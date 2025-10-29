// src/Test/LoginForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import LoginForm from '../../components/LoginForm'
import type { LoginPayload } from '../../api/auth'

// -------------------
// Mock useAuth
// -------------------
const mockLogin = vi.fn()
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({ login: mockLogin })
}))

// -------------------
// Mock useNavigate
// -------------------
const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}))

// -------------------
// Mock loginUser
// -------------------
const mockLoginUser = vi.fn()

vi.mock('../../api/auth', () => ({
  loginUser: (credentials: LoginPayload) => mockLoginUser(credentials)
}))

// -------------------
// Tests
// -------------------
describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 테스트 시나리오1 > 이메일, 비밀번호 입력창과 제출 버튼 렌더링 <기본적인 렌더링이 되는가?>
  it('renders email, password inputs and submit button', () => {
    render(<LoginForm />)

    expect(screen.getByPlaceholderText('이메일을 입력하세요')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('비밀번호를 입력하세요')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument()
  })

  // 테스트 시나리오2 > 로그인 성공 시 navigate 호출
  it('calls loginUser and login on successful submit', async () => {
    mockLoginUser.mockResolvedValue({ name: '송이' })

    render(<LoginForm />)

    fireEvent.change(screen.getByPlaceholderText('이메일을 입력하세요'), {
      target: { value: 'test@test.com' }
    })
    fireEvent.change(screen.getByPlaceholderText('비밀번호를 입력하세요'), {
      target: { value: '123456' }
    })

    fireEvent.click(screen.getByRole('button', { name: /로그인/i }))

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith({ email: 'test@test.com', password: '123456' })
      expect(mockLogin).toHaveBeenCalledWith('송이')
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })


  // 테스트 시나리오3 > 로그인 실패 시 에러 메시지 표시
  it('shows error message when loginUser throws', async () => {
    mockLoginUser.mockRejectedValue(new Error('잘못된 이메일 또는 비밀번호'))

    render(<LoginForm />)

    fireEvent.change(screen.getByPlaceholderText('이메일을 입력하세요'), {
      target: { value: 'wrong@test.com' }
    })
    fireEvent.change(screen.getByPlaceholderText('비밀번호를 입력하세요'), {
      target: { value: 'wrongpass' }
    })

    fireEvent.click(screen.getByRole('button', { name: /로그인/i }))

    await waitFor(() => {
      expect(screen.getByText('잘못된 이메일 또는 비밀번호')).toBeInTheDocument()
      expect(mockLogin).not.toHaveBeenCalled()
      expect(mockNavigate).not.toHaveBeenCalled()
    })
  })
})
