import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

const API_BASE = "https://api.pomopopo.com/users";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(() => {
    return sessionStorage.getItem("userName");
  });

  const isLocal = window.location.hostname.includes("localhost");

  const login = (userName: string, token?: string) => {
    setUser(userName);
    sessionStorage.setItem("userName", userName);
    if (isLocal && token) {
      sessionStorage.setItem("access_token", token);
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("userName");
    if (isLocal) sessionStorage.removeItem("access_token");
  };

  useEffect(() => {
    // 배포 환경에서만 서버 호출
    if (!user && !isLocal) {
      fetch(`${API_BASE}/me`, {
        credentials: "include", // 쿠키 전송
      })
        .then(async (res) => {
          if (!res.ok) throw new Error("인증 실패");
          const data = await res.json();
          setUser(data.name);
          sessionStorage.setItem("userName", data.name);
        })
        .catch(() => {
          setUser(null);
          sessionStorage.removeItem("userName");
        });
    }

    // 로컬 환경에서 토큰이 있으면 자동 로그인
    if (!user && isLocal) {
      const token = sessionStorage.getItem("access_token");
      if (token) {
        fetch(`${API_BASE}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then(async (res) => {
            if (!res.ok) throw new Error("인증 실패");
            const data = await res.json();
            setUser(data.name);
            sessionStorage.setItem("userName", data.name);
          })
          .catch(() => {
            setUser(null);
            sessionStorage.removeItem("userName");
            sessionStorage.removeItem("access_token");
          });
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
