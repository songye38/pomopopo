import React from "react";
import styles from '../styles/ServiceDescModal.module.css'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
        <h2 className={styles.title}>Pomopopo</h2>
        <p className={styles.tagline}>
          디자이너를 위한 뽀모도로, 즐겁게 창작하는 나만의 루틴
        </p>
        <p className={styles.description}>
          Pomopopo는 당신만의 창작 루틴을 만들고 기록할 수 있는 뽀모도로 기반
          웹 서비스입니다. 각 세션은 집중과 휴식의 리듬을 유지하며, 창작 과정을
          즐겁게 만들어 줍니다.
        </p>
      </div>
    </div>
  );
};

export default ServiceModal;
