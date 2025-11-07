import React from "react";

interface Props {
  results: string[];
  isAnalyzed: boolean;
}

const AnalysisResult: React.FC<Props> = ({ results, isAnalyzed }) => {
  if (!isAnalyzed) return null; // 👉 Ẩn toàn bộ khi chưa bấm phân tích

  return (
    <div className="card analysis-card">
      <h3>Kết Quả & Khuyến Nghị</h3>
      {results.length === 0 ? (
        <p className="empty">Chưa có kết quả phân tích</p>
      ) : (
        <ul className="recommend-list">
          {results.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AnalysisResult;