import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPomodoroSummary, savePomodoroFeedback } from "../api/logs";
import styles from "../styles/PomodoroSummaryPage.module.css";
import type { PomodoroSummary } from "../api/logs";

export default function PomodoroSummaryPage() {
  const { logId } = useParams<{ logId: string }>();
  const navigate = useNavigate();

  const [summary, setSummary] = useState<PomodoroSummary | null>(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number>(3);

  useEffect(() => {
    const fetchSummary = async () => {
      if (!logId) return;
      const res = await getPomodoroSummary(logId);
      setSummary(res);
      if (res.comment) setComment(res.comment);
      if (res.rating) setRating(res.rating);
    };
    fetchSummary();
  }, [logId]);

  const handleSaveFeedback = async () => {
    if (!logId) return;
    await savePomodoroFeedback(logId, comment, rating);
    alert("💬 회고 피드백이 저장되었어!");
    navigate("/");
  };

  // 💡 회고 없이 바로 메인으로 가는 함수
  const handleSkipFeedback = () => {
    if (confirm("회고를 작성하지 않고 메인으로 돌아갈까?")) {
      navigate("/");
    }
  };

  if (!summary) return <div>불러오는 중...</div>;

  return (
    <div className={styles.container}>
      <h2>오늘의 집중 회고 🎯</h2>

      <div className={styles.stats}>
        <p>총 집중 세션: {summary.total_sessions}회</p>
        <p>총 집중 시간: {summary.total_minutes}분</p>
        <p>평균 집중률: {summary.focus_rate}%</p>
      </div>

      <div className={styles.ratingSection}>
        <label>오늘의 만족도 🌟</label>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? styles.filledStar : styles.emptyStar}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <textarea
        className={styles.commentBox}
        placeholder="오늘의 집중은 어땠어?"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className={styles.buttonGroup}> {/* 💡 버튼 묶음 */}
        <button className={styles.saveBtn} onClick={handleSaveFeedback}>
          회고 저장하기
        </button>
        <button className={styles.skipBtn} onClick={handleSkipFeedback}>
          건너뛰기
        </button>
      </div>
    </div>
  );
}
