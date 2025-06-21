import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface Question {
  QuizID: number;
  Question: string;
  ImageQuestion: string | null;
  OptionA: string;
  OptionB: string;
  OptionC: string;
  OptionD: string;
  CorrectAnswer: string;
}

interface OptionButtonProps {
  text: string;
  idx: number;
  onSelect: (idx: number) => void;
  disabled: boolean;
  selected: number | null;
  correctIndex: number;
}

const correctStyle = {
  border: "2px solid #00c853",
  backgroundColor: "#b9f6ca"
};
const wrongStyle = {
  border: "2px solid #d50000",
  backgroundColor: "#ff8a80"
};

const OptionButton = ({ text, idx, onSelect, disabled, selected, correctIndex }: OptionButtonProps) => {
  const [isHover, setIsHover] = useState(false);

  let style = {
    width: "100%",
    margin: "12px 0",
    padding: 18,
    fontSize: 18,
    borderRadius: 12,
    border: "none",
    background: isHover ? "#e3f2fd" : "#f5f5f5",
    boxShadow: isHover ? "0 4px 16px #b3e5fc" : "0 2px 8px #ececec",
    cursor: disabled ? "default" : "pointer",
    transition: "transform 0.2s, box-shadow 0.2s"
  };

  if (selected !== null) {
    if (idx === correctIndex) style = { ...style, ...correctStyle };
    else if (selected === idx) style = { ...style, ...wrongStyle };
  }

  return (
    <button
      onClick={() => onSelect(idx)}
      disabled={disabled}
      style={style}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {String.fromCharCode(65 + idx)}. {text}
    </button>
  );
};

const QuizDemo = () => {
  const { testId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/quiz/all_quizz?testId=${testId}`)
      .then(res => setQuestions(res.data))
      .catch(err => console.error("Lỗi lấy câu hỏi: ", err));
  }, [testId]);

  if (questions.length === 0) return <p>Đang tải câu hỏi...</p>;

  const q = questions[currentIndex];
  const options = [q.OptionA, q.OptionB, q.OptionC, q.OptionD];
  const correctIndex = "ABCD".indexOf(q.CorrectAnswer);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;

    if (idx === correctIndex) setScore(score + 1);
    setSelected(idx);

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "linear-gradient(120deg, #e3f2fd 0%, #b2dfdb 100%)", padding: 24 }}>
        <h1 style={{ fontSize: 48, color: "#00c853" }}>🎉 Hoàn thành!</h1>
        <p style={{ fontSize: 24, margin: "24px 0" }}>
          Bạn đúng {score} / {questions.length} câu
        </p>
        <div style={{display: "flex"}}>
          <button className="restart" onClick={restartQuiz} style={{ background: "#1976d2", color: "#fff", fontSize: 20, padding: "14px 32px", borderRadius: 10, border: "none", cursor: "pointer" }}>
          Làm lại
        </button>
        <button onClick={()=> navigate("/first_aid")} className="back" style={{marginLeft: "40px", background: "#012040", color: "#fff", fontSize: 20, padding: "14px 32px", borderRadius: 10, border: "none", cursor: "pointer" }}>
          Trở về
        </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(120deg, #e3f2fd 0%, #b2dfdb 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ height: 12, background: "#e0e0e0", borderRadius: 8, width: "100%", maxWidth: 600, marginBottom: 24, overflow: "hidden" }}>
        <div style={{ width: `${((currentIndex) / questions.length) * 100}%`, height: "100%", background: "linear-gradient(90deg, #42a5f5, #00e676)", borderRadius: 8, transition: "width 0.4s" }} />
      </div>

      <div style={{ width: "100%", maxWidth: 600, background: "#fff", borderRadius: 18, boxShadow: "0 4px 24px #e0e0e0", padding: 32 }}>
        {q.ImageQuestion && (
          <img src={q.ImageQuestion} alt="Hình minh họa" style={{ maxWidth: "100%", borderRadius: 12, marginBottom: 24 }} />
        )}
        <h2 style={{ marginBottom: 24, color: "#1976d2" }}>{q.Question}</h2>
        {options.map((opt, idx) => (
          <OptionButton
            key={idx}
            text={opt}
            idx={idx}
            onSelect={handleSelect}
            disabled={selected !== null}
            selected={selected}
            correctIndex={correctIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizDemo;
