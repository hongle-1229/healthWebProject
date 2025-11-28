const BASE_URL = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

// Kiểu dữ liệu trả về từ API
export type FeaturesResponse = {
  features: string[];
  symptom_meta?: Record<string, { weight?: number; description?: string }>;
  hotspot_regions?: string[];
  hotspot_map?: Record<string, string[]>;
};

// Kiểu dữ liệu mới tương thích FE AnalysisResult
export type AnalysisItem = {
  topic: string;
  related: string;
  match_score: number;
  description: string;
  advice: string[];
  warning_level: "low" | "medium" | "high";
};

export type SymptomFocusItem = {
  symptom: string;
  weight: number;
  note: string;
};

export type PredictResponse = {
  analysis: AnalysisItem[];
  symptom_focus: SymptomFocusItem[];
};

// Lấy danh sách feature và meta
export async function getModelFeatures(): Promise<FeaturesResponse> {
  const res = await fetch(`${BASE_URL}/model/features`);
  if (!res.ok) {
    throw new Error("Failed to fetch model features");
  }
  const data = await res.json();
  return data;
}

// Gọi API dự đoán
export async function predictApi(symptoms: string[]): Promise<PredictResponse> {
  const res = await fetch(`${BASE_URL}/model/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symptoms }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch predictions");
  }

  const data: PredictResponse = await res.json();
  return data;
}
