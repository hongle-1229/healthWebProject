import React, { useState, useEffect } from "react";
import ThreeScene from "./ThreeScene";
import BodyPartInfo from "./BodyPartInfo";
import SymptomsPanel from "./SymptomsPanel";
import AnalysisResult from "./AnalysisResult";
import { getModelFeatures, predictApi } from "../../train_model/modelApi";
import bodyPartSymptoms from "../../train_model/data/bodyPartSymptoms";
import "../style/Model.css";

// Kiểu dữ liệu trả về từ API cho features
interface ModelData {
  features: string[];
  symptom_meta?: Record<string, { weight?: number; description?: string }>;
  hotspot_regions?: string[];
  hotspot_map?: Record<string, string[]>;
}

// Kiểu dữ liệu phân tích (AnalysisItem) theo backend mới
export interface AnalysisItem {
  topic: string;
  related: string;
  match_score: number;
  description: string;
  advice: string[];
  warning_level: "low" | "medium" | "high";
}

// Kiểu dữ liệu triệu chứng tập trung
export interface SymptomFocusItem {
  symptom: string;
  weight: number;
  note: string;
}

const Model: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [modelData, setModelData] = useState<ModelData>({
    features: [],
    symptom_meta: {},
    hotspot_regions: [],
    hotspot_map: {},
  });
  const [analysis, setAnalysis] = useState<AnalysisItem[]>([]);
  const [symptomFocus, setSymptomFocus] = useState<SymptomFocusItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Lấy dữ liệu feature từ backend
  useEffect(() => {
    getModelFeatures().then((data) => {
      setModelData({
        features: data.features || [],
        symptom_meta: data.symptom_meta || {},
        hotspot_regions: data.hotspot_regions || [],
        hotspot_map: data.hotspot_map || {},
      });
    });
  }, []);

  // Xử lý phân tích
  const handleAnalyze = async () => {
    if (!symptoms.length) return alert("Chọn triệu chứng trước khi phân tích");
    setLoading(true);
    try {
      const data = await predictApi(symptoms);
      setAnalysis(data.analysis || []);
      setSymptomFocus(data.symptom_focus || []);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSymptoms([]);
    setSelectedPart(null);
    setAnalysis([]);
    setSymptomFocus([]);
  };

  return (
    <div className="diagnosis-layout">
      {/* Left: Selected Symptoms */}
      <aside className="left-col">
        <SymptomsPanel
          symptoms={symptoms}
          onRemove={(s) => setSymptoms(symptoms.filter((x) => x !== s))}
          onClear={handleClear}
          onAnalyze={handleAnalyze}
        />
      </aside>

      {/* Center: 3D Model */}
      <main className="center-col">
        <h1 style={{marginTop:"100px", textAlign:"center", color:"#b21111ff", fontWeight:"500"}}>Hệ thống tư vấn sức khỏe thông qua việc lựa chọn các triệu chứng trên cơ thể</h1>
        <p style={{textAlign:"center", color:"#363636ff"}}>(Mọi thông tin đều mang tính tham khảo, không thay thế chẩn đoán của bác sĩ)</p>
        <ThreeScene
          onSelectBodyPart={(part) => {
            // CHỈ set selectedPart để BodyPartInfo hiển thị triệu chứng tương ứng
            setSelectedPart(part);
            // **KHÔNG** setSymptoms ở đây — tránh auto thêm vào left panel
          }}
        />
      </main>

      {/* Right: Symptoms by Body Part + Analysis */}
      <aside className="right-col">
        <BodyPartInfo
          bodyPart={selectedPart}
          features={modelData.features} // bắt buộc
          symptomMeta={modelData.symptom_meta} // optional
          hotspotRegions={modelData.hotspot_regions} // optional
          hotspotMap={bodyPartSymptoms} // dùng file data bodyPartSymptoms
          onSelectSymptom={(s) =>
            setSymptoms((prev) => (prev.includes(s) ? prev : [...prev, s]))
          }
        />

        {loading && <p>Đang phân tích...</p>}

      </aside>

      {analysis.length > 0 && (
          <AnalysisResult analysis={analysis} symptom_focus={symptomFocus} />
        )}
    </div>
  );
};

export default Model;
