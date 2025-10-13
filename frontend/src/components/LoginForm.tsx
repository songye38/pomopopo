import { useState } from "react";
import styles from '../styles/AuthForm.module.css'

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("로그인 시도:", { email, password });
    // TODO: 로그인 로직 연결 (API 등)
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
