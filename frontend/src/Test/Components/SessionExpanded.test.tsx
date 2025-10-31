// src/Test/SessionExpanded.test.tsx
// <reference types="vitest" />


import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import SessionExpanded from '../../components/SessionExpanded'
import type { Pomo } from '../../types/types'

const mockPomo: Pomo = 'refine'

const mockSession = {
    id: 1,
    guide: '기본 가이드',
    time: '25',
    name: '기본이름',
    pomo: mockPomo,   // Pomo 타입과 일치
    type_id: 1
}

vi.mock('../../components/TimeSelector', () => ({
  default: (props: { time: number; onChange: (value: number) => void }) => {
    const { time, onChange } = props
    return (
      <input
        data-testid="mock-time"
        value={time}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    )
  }
}))

describe('SessionExpanded', () => {
    let onRemove: ReturnType<typeof vi.fn>
    let onUpdate: ReturnType<typeof vi.fn>

    beforeEach(() => {
        onRemove = vi.fn()
        onUpdate = vi.fn()
    })

    //테스트 시나리오1 > 제목, 설명 렌더링 되는지
    it('renders the title and description', () => {
        render(
            <SessionExpanded
                session={mockSession}
                title="세션 제목"
                description="기본 설명"
                pomo={mockPomo}
                time="25"
                onRemove={onRemove}
                onUpdate={onUpdate}
            />
        )

        expect(screen.getByText('세션 제목')).toBeInTheDocument()
        expect(screen.getByDisplayValue('기본 설명')).toBeInTheDocument()
    })

    //테스트 시나리오2 > 제거 버튼 클릭시 onRemove 호출되는지
    it('calls onRemove when remove button is clicked', () => {
        render(
            <SessionExpanded
                session={mockSession}
                title="세션 제목"
                description="기본 설명"
                pomo={mockPomo}
                time="25"
                onRemove={onRemove}
                onUpdate={onUpdate}
            />
        )

        const removeBtn = screen.getByText('×')
        fireEvent.click(removeBtn)

        expect(onRemove).toHaveBeenCalledWith(mockSession)
    })

    //테스트 시나리오3 > 설명 변경시 onUpdate 호출되는지
    it('updates description when textarea changes', () => {
        render(
            <SessionExpanded
                session={mockSession}
                title="세션 제목"
                description="기본 설명"
                pomo={mockPomo}
                time="25"
                onRemove={onRemove}
                onUpdate={onUpdate}
            />
        )

        const textarea = screen.getByDisplayValue('기본 설명')
        fireEvent.change(textarea, { target: { value: '새로운 설명' } })

        expect(onUpdate).toHaveBeenCalledWith({ ...mockSession, guide: '새로운 설명' })
    })

    //테스트 시나리오4 > 시간 변경시 onUpdate 호출되는지
    it('updates time when TimeSelector changes', () => {
        render(
            <SessionExpanded
                session={mockSession}
                title="세션 제목"
                description="기본 설명"
                pomo={mockPomo}
                time="25"
                onRemove={onRemove}
                onUpdate={onUpdate}
            />
        )

        const timeInput = screen.getByTestId('mock-time')
        fireEvent.change(timeInput, { target: { value: '30' } })
        expect(onUpdate).toHaveBeenCalledWith({ ...mockSession, time: '30' })
    })
})
