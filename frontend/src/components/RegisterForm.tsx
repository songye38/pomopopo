import { useState } from "react";
import styles from '../styles/AuthForm.module.css';
import { registerUser } from "../api/auth";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const user = await registerUser({ name, email, password });
      console.log("회원가입 성공:", user);
      setSuccess("회원가입 성공! 환영합니다 🎉");
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

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <button type="submit" className={styles.submitBtn}>
          회원가입
        </button>
      </form>
    </div>
  );
}
