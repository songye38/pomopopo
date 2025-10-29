// src/Test/SessionDefault.test.tsx
/// <reference types="vitest" />
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SessionDefault from '../../components/SessionDefault'

// Pomo 타입 mock
const mockPomo = 'refine' as const

describe('SessionDefault', () => {

    //테스트1 > 제목 표시하는지
    it('renders the title if provided', () => {
        render(
            <SessionDefault
                title="세션 제목"
                purpose="목적 내용"
                description="상세 설명"
                pomo={mockPomo}
            />
        )
        expect(screen.getByText('세션 제목')).toBeInTheDocument()
    })

    //테스트2 > 목적 HTML로 렌더링 되는지
    it('renders purpose as HTML', () => {
        render(
            <SessionDefault
                title="제목"
                purpose="<p>HTML 목적</p>"
                pomo={mockPomo}
                description="상세 설명"
            />
        )
        expect(screen.getByText('HTML 목적')).toBeInTheDocument()
    })
})
