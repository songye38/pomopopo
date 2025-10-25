import { useState, useEffect, type ReactNode } from "react";
import Api from "../api/Api"; // axios 인스턴스
import { AuthContext } from "./AuthContext";
import { logoutUser } from "../api/auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(() => {
    return sessionStorage.getItem("userName");
  });

  const login = (userName: string) => {
    setUser(userName);
    sessionStorage.setItem("userName", userName);
  };

  const logout = async () => {
    try {
      await logoutUser(); // ✅ 서버에도 로그아웃 요청
    } catch (err) {
      console.error("서버 로그아웃 실패 (무시 가능):", err);
    } finally {
      setUser(null);
      sessionStorage.removeItem("userName");
    }
  };

  // 자동 로그인 / 상태 복원
  useEffect(() => {
    if (!user) {
      Api.get("/users/me")
        .then((res) => {
          setUser(res.data.name);
          sessionStorage.setItem("userName", res.data.name);
        })
        .catch(() => {
          setUser(null);
          sessionStorage.removeItem("userName");
        });
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
