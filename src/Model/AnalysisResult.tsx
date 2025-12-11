  import axios from "axios";
  import React, { useEffect,useRef } from "react";


  interface AnalysisItem {
    topic: string;
    related: string;
    match_score: number;
    description: string;
    advice: string[];
    warning_level: "Thấp" | "Trung bình" | "Cao";
  }

  interface SymptomFocusItem {
    symptom: string;
    weight: number;
    note: string;
  }

  interface Props {
    analysis: AnalysisItem[];
    symptom_focus: SymptomFocusItem[];
    selectedSymptoms: string[];
  }


  const AnalysisResult: React.FC<Props> = ({ analysis, symptom_focus, selectedSymptoms }) => {
    const hasSaved = useRef(false);

    useEffect(() => {
      if (hasSaved.current) return; // đã lưu rồi → không chạy nữa
      hasSaved.current = true;

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user) return;

      axios.post("http://localhost:5000/api/history/save_lookup", {
        UserID: user.id,
        SelectedSymptoms: symptom_focus,
        Results: analysis,
        HighlightedSymptoms: symptom_focus
      })
        .then(() => console.log("Saved lookup history"))
        .catch((err) => console.error("Save lookup failed: ", err));

      console.log("User:", user);
    }, []);

    return (
      <div className="result analysis-card ">
        <h1 className="text-lg font-semibold" style={{ textAlign: "center" }}>Kết quả phân tích và tư vấn ban đầu</h1>

        {/* Các lưu ý cảnh báo */}
        <div className="space-y-1">
          <h4 className="font-semibold text-gray-800 mb-1" style={{ backgroundColor: "#f77777ff", color: "white", padding: "5px", borderRadius: "8px" }}>
            Lưu ý: Kết quả này chỉ mang tính tham khảo, không thay thế cho việc khám hoặc chẩn đoán y tế của bác sĩ.
          </h4>
          <h4 className="font-semibold text-gray-800 mb-1" style={{ backgroundColor: "#f77777ff", color: "white", padding: "5px", borderRadius: "8px" }}>
            Nếu triệu chứng nghiêm trọng, hãy liên hệ cơ sở y tế gần nhất.
          </h4>
          <h4 className="font-semibold text-gray-800 mb-1" style={{ backgroundColor: "#f77777ff", color: "white", padding: "5px", borderRadius: "8px" }}>
            Web dựa trên dữ liệu y tế tổng hợp, kết quả có thể không chính xác 100%.
          </h4>
        </div>

        {/* Phân tích nhóm vấn đề */}
        <div>
          <h2 className="font-bold text-lg mb-2">Nhóm vấn đề liên quan</h2>
          <ul className="space-y-2">
            {analysis.map((a, i) => (
              <li key={i} className="p-2 border rounded">
                <div>
                  <b>{a.related}</b> ({a.topic})
                </div>
                <div>Xác suất liên quan: {Number((a.match_score ?? 0)*100).toFixed(1)}%</div>
                <div>Mức độ cảnh báo: {a.warning_level}</div>
                {a.description && <div className="text-sm text-gray-600">Mô tả: {a.description}</div>}
                {a.advice.length > 0 && (
                  <div className="text-sm text-gray-700 mt-1">
                    <b>Khuyến nghị:</b>
                    <ul className="list-disc ml-5">
                      {a.advice.map((ad, idx) => (
                        <li key={idx}>{ad}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Symptom focus */}
        <div>
          <h2 className="font-bold text-lg mb-2">Triệu chứng nổi bật</h2>
          <ul className="space-y-2">
            {symptom_focus.map((s, i) => (
              <li key={i} className="p-2 border rounded">
                <div>{s.symptom}</div>
                <div>Trọng số: {s.weight}</div>
                <div className="text-sm text-gray-600">{s.note}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  export default AnalysisResult;
