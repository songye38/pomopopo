import styles from '../styles/AuthForm.module.css'
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className={styles.pageContainer}>
      <RegisterForm />
    </div>
  );
}
