import { useState } from "react";
import styles from '../styles/AuthForm.module.css'

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("회원가입 시도:", { name, email, password });
    // TODO: 회원가입 로직 연결 (API 등)
  };

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.title}>회원가입</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          placeholder="이름을 입력하세요"
          required
        />

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
          회원가입
        </button>
      </form>
    </div>
  );
}
