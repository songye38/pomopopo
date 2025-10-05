# pomopopo


frontend/
├─ src/
│  ├─ components/         # 공용 UI 컴포넌트
│  │   ├─ Button.tsx
│  │   ├─ Timer.tsx
│  │   └─ RoutineCard.tsx
│  │
│  ├─ pages/              # 라우팅되는 주요 화면
│  │   ├─ Home.tsx        # 루틴 선택 + 시작
│  │   ├─ Session.tsx     # 타이머 진행
│  │   ├─ History.tsx     # 기록 확인
│  │   └─ MyRoutine.tsx   # 루틴 생성/관리
│  │
│  ├─ types/              # 타입 정의
│  │   ├─ Routine.ts
│  │   └─ Session.ts
│  │
│  ├─ hooks/              # 커스텀 훅 (예: useTimer, useLocalStorage)
│  │   └─ useTimer.ts
│  │
│  ├─ utils/              # 유틸 함수
│  │   └─ storage.ts      # localStorage 저장/불러오기
│  │
│  ├─ styles/             # 전역 스타일
│  │   └─ globals.css
│  │
│  ├─ App.tsx             # 라우터 + 기본 레이아웃
│  └─ main.tsx            # 엔트리 포인트
│
├─ index.html
├─ package.json
└─ tsconfig.json
