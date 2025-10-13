import { useState } from "react";
import styles from '../styles/AuthForm.module.css'
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth(); // AuthProvider에서 상태 가져오기
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const user = await loginUser({ email, password });
      console.log("에러방지용",error);
      login(user.name);       // AuthProvider 상태 업데이트
      console.log("set use name",user.name)
      navigate("/");          // 로그인 후 홈으로 이동
    } catch (err: unknown) {
      console.error("회원가입 실패:", err);

      // err가 Error 타입인지 체크 후 메시지 사용
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.title}>로그인</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          placeholder="이메일을 입력하세요"
          required
        />

        <label className={styles.label}>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="비밀번호를 입력하세요"
          required
        />

        <button type="submit" className={styles.submitBtn}>
          로그인
        </button>
      </form>
    </div>
  );
}
