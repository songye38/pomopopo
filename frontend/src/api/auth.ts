export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserOut {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

const API_BASE = "https://api.pomopopo.com/users"; // FastAPI 서버 주소

// ✅ 회원가입
export async function registerUser(payload: RegisterPayload): Promise<UserOut> {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "회원가입 실패");
  }

  return res.json();
}

// ✅ 로그인
export async function loginUser(payload: LoginPayload): Promise<UserOut> {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include", // ✅ 쿠키 전송/수신 필수
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "로그인 실패");
  }

  return res.json(); // UserOut 반환
}
