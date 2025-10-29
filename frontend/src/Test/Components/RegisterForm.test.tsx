// src/Test/RegisterForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import RegisterForm from '../../components/RegisterForm'
import type { RegisterPayload } from '../../api/auth'

// -------------------
// Mock registerUser
// -------------------
const mockRegisterUser = vi.fn()

vi.mock('../../api/auth', () => ({
  registerUser: (payload: RegisterPayload) => mockRegisterUser(payload)
}))


// -------------------
// Tests
// -------------------
describe('RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })


  //테스트 시나리오1 > 이름, 이메일, 비밀번호 입력창과 제출 버튼 렌더링 <기본적인 렌더링이 되는가?>
  it('renders all input fields and submit button', () => {
    render(<RegisterForm />)

    expect(screen.getByPlaceholderText('이름을 입력하세요')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('이메일을 입력하세요')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('비밀번호를 입력하세요')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /회원가입/i })).toBeInTheDocument()
  })

  // 테스트 시나리오2 > 회원가입 성공 시 성공 메시지 표시
  it('shows success message on successful registration', async () => {
    mockRegisterUser.mockResolvedValue({ name: '송이' })

    render(<RegisterForm />)

    fireEvent.change(screen.getByPlaceholderText('이름을 입력하세요'), { target: { value: '송이' } })
    fireEvent.change(screen.getByPlaceholderText('이메일을 입력하세요'), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByPlaceholderText('비밀번호를 입력하세요'), { target: { value: '123456' } })

    fireEvent.click(screen.getByRole('button', { name: /회원가입/i }))

    await waitFor(() => {
      expect(mockRegisterUser).toHaveBeenCalledWith({
        name: '송이',
        email: 'test@test.com',
        password: '123456'
      })
      expect(screen.getByText('회원가입 성공! 환영합니다 🎉')).toBeInTheDocument()
    })
  })

  // 테스트 시나리오3 > 회원가입 실패 시 에러 메시지 표시
  it('shows error message when registration fails', async () => {
    mockRegisterUser.mockRejectedValue(new Error('이미 가입된 이메일입니다'))

    render(<RegisterForm />)

    fireEvent.change(screen.getByPlaceholderText('이름을 입력하세요'), { target: { value: '송이' } })
    fireEvent.change(screen.getByPlaceholderText('이메일을 입력하세요'), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByPlaceholderText('비밀번호를 입력하세요'), { target: { value: '123456' } })

    fireEvent.click(screen.getByRole('button', { name: /회원가입/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('이미 가입된 이메일입니다')
      expect(mockRegisterUser).toHaveBeenCalled()
    })
  })

    // 테스트 시나리오4 > 회원가입 실패 시 에러 메시지 표시 (잘못된 비밀번호)
  it('shows error message when registration fails', async () => {
    mockRegisterUser.mockRejectedValue(new Error('잘못된 비밀번호입니다.'))

    render(<RegisterForm />)

    fireEvent.change(screen.getByPlaceholderText('이름을 입력하세요'), { target: { value: '송이' } })
    fireEvent.change(screen.getByPlaceholderText('이메일을 입력하세요'), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByPlaceholderText('비밀번호를 입력하세요'), { target: { value: '123456' } })

    fireEvent.click(screen.getByRole('button', { name: /회원가입/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('잘못된 비밀번호입니다.')
      expect(mockRegisterUser).toHaveBeenCalled()
    })
  })
})
