// src/Test/DragDropPage.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { DragDropPage } from '../../pages/DragDropPage'
import type { SessionContent,SavedSession } from '../../types/types'
import type { Pomo } from '../../types/types'


interface SessionExpandedProps {
  session: SessionContent;
  title?: string;
  description: string;
  pomo: Pomo;
  backgroundColor?: string;
  time: string;
  onRemove: (session: SessionContent) => void;
  onUpdate: (updatedSession: SessionContent) => void;
}


// ✅ 모듈 모킹
const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actualModule = (await importOriginal()) as Record<string, unknown> // ⚡ 타입 단언
  return {
    ...actualModule,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: 'test-id' }),
  }
})

// 서버 저장 모킹
const mockSaveSessionToServer = vi.fn()
vi.mock('../../api/sessions', () => ({
  saveSessionToServer: (data: SavedSession) => mockSaveSessionToServer(data)
}))



// TimeSelector, SessionExpanded 등 필요시 간단히 mock
vi.mock('../../components/SessionExpanded', () => ({
  default: ({ title, description, onRemove, onUpdate, session }: SessionExpandedProps) => (
    <div data-testid="session-expanded">
      <span>{title}</span>
      <textarea
        value={description}
        onChange={(e) =>
          onUpdate({
            ...session,           // 기존 세션 내용 유지
            guide: e.target.value // guide만 변경
          })
        }
      />
      <button
        onClick={() => onRemove(session)} // 그대로 전체 session 전달
      >
        Remove
      </button>
    </div>
  )
}));



vi.mock('../../components/SessionDefault', () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="session-default">{title}</div>
  )
}))

vi.mock('../../components/Button/StartPomoBtn', () => ({
  StartPomoBtn: ({ onClick }: { onClick?: () => void }) => (
    <button onClick={onClick}>Start Pomo</button>
  )
}))


vi.mock('../../components/Button/MainBtn', () => ({
  MainBtn: ({ onClick }: { onClick?: () => void }) => (
    <button onClick={onClick}>Save</button>
  )
}))



// ✅ 테스트 시나리오
describe('DragDropPage Integration', () => {
  const mockSessions: SessionContent[] = [
    { id: 1, name: 'Session1', guide: 'Guide1', pomo: 'refine', target: 'T1', effect: 'E1', time: '25', type_id: 1 },
    { id: 2, name: 'Session2', guide: 'Guide2', pomo: 'random', target: 'T2', effect: 'E2', time: '30', type_id: 2 },
  ]

  beforeEach(() => {
    mockNavigate.mockClear()
    mockSaveSessionToServer.mockClear()
  })


  //테스트 시나리오1 > 드래그 가능한 세션들이 렌더링 되고, 드롭존에 드롭이 가능한가?
  it('renders draggable sessions and allows dropping', async () => {
    render(
      <MemoryRouter>
        <DragDropPage sessions={mockSessions} />
      </MemoryRouter>
    )

    // 기존 세션 렌더링 확인
    expect(screen.getByText('Session1')).toBeInTheDocument()
    expect(screen.getByText('Session2')).toBeInTheDocument()

    // DropZone 내부 초기 상태
    expect(screen.queryAllByTestId('session-expanded')).toHaveLength(0)
  })


  // 테스트 시나리오2 > 저장 버튼 클릭 시 세션이 서버에 저장되는가?
  it('saves sessions when Save button clicked', async () => {
    mockSaveSessionToServer.mockResolvedValue({ id: 'new-id' })

    render(
      <MemoryRouter>
        <DragDropPage sessions={mockSessions} />
      </MemoryRouter>
    )

    const saveBtn = screen.getByText('Save')
    fireEvent.click(saveBtn)

    await waitFor(() => {
      expect(mockSaveSessionToServer).toHaveBeenCalled()
    })
  })

  // 테스트 시나리오3 > Start Pomo 버튼 클릭 시 네비게이트가 호출되는가?
  it('starts pomo when Start Pomo clicked', async () => {
    mockSaveSessionToServer.mockResolvedValue({ id: 'new-id' })

    render(
      <MemoryRouter>
        <DragDropPage sessions={mockSessions} />
      </MemoryRouter>
    )

    const startBtn = screen.getByText('Start Pomo')
    fireEvent.click(startBtn)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/pomo/new-id')
    })
  })
})
