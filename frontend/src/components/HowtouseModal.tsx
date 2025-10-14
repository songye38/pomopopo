import React from "react";
import styles from '../styles/HowToUseModal.module.css'

interface HowToUseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowToUseModal: React.FC<HowToUseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
        <h2 className={styles.title}>Pomopopo 사용 방법</h2>
        <ol className={styles.steps}>
          <li>
            <strong>루틴 선택</strong>: 메인 화면에서 원하는 세션 모드를 선택하세요.
          </li>
          <li>
            <strong>세션 시작</strong>: 집중/휴식 타이머를 확인하고 세션을 시작합니다.
          </li>
          <li>
            <strong>진행 중 기록</strong>: 타이머와 함께 작업하며, 필요한 경우 잠시 일시정지할 수 있습니다.
          </li>
          <li>
            <strong>세션 종료</strong>: 완료 후 기록이 저장됩니다. 나중에 루틴을 확인하거나 반복할 수 있습니다.
          </li>
          <li>
            <strong>나만의 루틴 만들기</strong>: MyRoutine에서 자신만의 뽀모도로 루틴을 만들고 저장하세요.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default HowToUseModal;
