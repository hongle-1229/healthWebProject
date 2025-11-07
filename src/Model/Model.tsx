import React, { useState } from "react";
import ThreeScene from "./ThreeScene";
import SymptomsPanel from "./SymptomsPanel";
import BodyPartInfo from "./BodyPartInfo";
import AnalysisResult from "./AnalysisResult";
import "../style/Model.css";

const Model: React.FC = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<string[]>([]);
  const [isAnalyzed, setIsAnalyzed] = useState(false); // 👉 Thêm

  const handleAddSymptom = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleRemoveSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
  };

  const handleClearAll = () => {
    setSelectedSymptoms([]);
    setAnalysisResult([]);
    setIsAnalyzed(false); // 👉 Reset trạng thái
  };

  const handleAnalyze = () => {
    const recommendations = [
      "🩺 Nghỉ ngơi và theo dõi tình trạng sức khỏe.",
      "💧 Uống đủ nước và duy trì chế độ ăn lành mạnh.",
      "⚠️ Nếu triệu chứng nặng hơn, hãy đến cơ sở y tế gần nhất.",
      "🚶‍♂️ Tránh hoạt động gắng sức trong thời gian mệt mỏi.",
      "🕒 Nghỉ ngơi hợp lý và giữ tinh thần thoải mái."
    ];
    setAnalysisResult(recommendations.slice(0, 3));
    setIsAnalyzed(true); // 👉 Đánh dấu đã bấm phân tích
  };

  return (
    <div className="diagnosis-container">
      {/* Cột trái */}
      <div className="symptoms-panel">
        <SymptomsPanel
          symptoms={selectedSymptoms}
          onRemove={handleRemoveSymptom}
          onClear={handleClearAll}
          onAnalyze={handleAnalyze}
        />
      </div>

      {/* Cột giữa */}
      <div className="model-view">
        <h2 className="title">Hệ Thống Tư Vấn Sức Khỏe Qua Các Triệu Chứng</h2>
        <p className="subtitle">
          Chọn vùng cơ thể, chọn các triệu chứng và nhận khuyến nghị sức khỏe
        </p>
        <ThreeScene onSelectBodyPart={setSelectedBodyPart} />
      </div>

      {/* Cột phải */}
      <div className="body-info">
        <BodyPartInfo
          selectedBodyPart={selectedBodyPart}
          onAddSymptom={handleAddSymptom}
        />
        <AnalysisResult results={analysisResult} isAnalyzed={isAnalyzed} />
      </div>
    </div>
  );
};

export default Model;