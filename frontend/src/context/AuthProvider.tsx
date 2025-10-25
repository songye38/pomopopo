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

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const res = await Api.get("/users/me");
        setUser(res.data.name);
        sessionStorage.setItem("userName", res.data.name);
      } catch {
        setUser(null);
        sessionStorage.removeItem("userName");
      }
    };

    restoreUser();
  }, []); // ✅ 빈 배열 → 마운트 시 1회만 실행

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
