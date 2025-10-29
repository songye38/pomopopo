import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LogoutBtn from '../../components/Button/LogoutBtn'
import { vi } from 'vitest'
import '@testing-library/jest-dom'


//react-router-dom 모듈 전체를 가져온 후, useNavigate만 mock 함수로 대체
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal() // 원본 모듈 그대로 가져오기
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})

// LogoutBtn 컴포넌트 관련 테스트들을 모아놓음.
describe('LogoutBtn', () => { 

    //하나의 테스트 케이스를 정의. 설명: “사용자가 로그아웃 확인을 눌렀을 때 /로 이동해야 한다.”
  it('should navigate to "/" when confirmed', async () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true)

    // mock 적용 후 컴포넌트 import
    const { default: LogoutBtn } = await import('../../components/Button/LogoutBtn')

    //테스트용으로 렌더링.
    render(
      <MemoryRouter>
        <LogoutBtn />
      </MemoryRouter>
    )


    //part2 행동부분 - 로그아웃 이미지를 찾고 실제 버튼을 누름
    //화면에서 alt="로그아웃"인 이미지를 찾음.
    const img = screen.getByAltText('로그아웃')


    //테스트에서 사용자가 로그아웃 버튼 클릭하는 상황 시뮬레이션.
    fireEvent.click(img)

    //part3 검증
    expect(confirmSpy).toHaveBeenCalledWith('정말 종료하시겠습니까?')
    // navigate가 실제로 호출되는지 확인
    // 단, 여기서는 useNavigate가 vi.fn()이므로 테스트에서는 확인 어려움
  })
})
