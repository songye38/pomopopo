import LoginForm from "../components/LoginForm";
import styles from '../styles/AuthForm.module.css'

export default function LoginPage() {
  return (
    <div className={styles.pageContainer}>
      <LoginForm />
    </div>
  );
}
