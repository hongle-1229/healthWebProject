import React, { useMemo, useState, useEffect } from "react";

interface SymptomMetaItem {
  weight?: number;
  description?: string;
}

interface BodyPartInfoProps {
  bodyPart?: string | null; // Vùng cơ thể đang chọn
  features: string[]; // Danh sách triệu chứng từ backend
  symptomMeta?: Record<string, SymptomMetaItem>; // Thông tin weight/description
  hotspotRegions?: string[]; // Các vùng cơ thể nổi bật
  hotspotMap?: Record<string, string[]>; // Map vùng cơ thể -> danh sách triệu chứng
  onSelectSymptom: (symptom: string) => void; // Callback khi chọn triệu chứng
}

const BodyPartInfo: React.FC<BodyPartInfoProps> = ({
  bodyPart,
  features,
  symptomMeta = {},
  hotspotRegions = [],
  hotspotMap = {},
  onSelectSymptom,
}) => {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  // Chỉ lấy symptom thuộc vùng được chọn, nếu không chọn vùng thì hiển thị tất cả
  const allKeys = useMemo(() => {
    if (bodyPart && hotspotMap[bodyPart]) {
      return hotspotMap[bodyPart].sort();
    }
    return [...features].sort();
  }, [features, bodyPart, hotspotMap]);

  // Format dữ liệu triệu chứng
  const formatted = useMemo(
    () =>
      allKeys.map((k) => ({
        key: k,
        label: k.replace(/_/g, " "),
        meta: {
          weight: symptomMeta[k]?.weight || 0,
          description: symptomMeta[k]?.description || "",
        },
      })),
    [allKeys, symptomMeta]
  );

  // Lọc theo query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return formatted.filter((item) => item.label.toLowerCase().includes(q));
  }, [formatted, query]);

  // Reset số lượng hiển thị khi query thay đổi
  useEffect(() => {
    setVisibleCount(10);
  }, [query]);

  return (
    <div className="body-info-card card">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="part-name">
            {bodyPart
              ? `Các triệu chứng liên quan đến: ${bodyPart}`
              : "Danh sách các triệu chứng"}
          </h3>
          <p className="description small">
            {bodyPart
              ? `Triệu chứng được lọc theo vùng: ${bodyPart}`
              : hotspotRegions.length > 0
              ? `Các vùng cơ thể nổi bật: ${hotspotRegions.join(", ")}`
              : "Bạn có thể tìm kiếm triệu chứng hoặc chọn từ danh sách."}
          </p>
        </div>
        <span className="small muted">{filtered.length} mục</span>
      </div>

      {/* Search box */}
      <input
        className="symptom-search"
        placeholder="Tìm triệu chứng..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Loading / Empty */}
      {features.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p className="font-medium">Đang tải dữ liệu triệu chứng...</p>
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-10">Không tìm thấy triệu chứng phù hợp.</p>
      ) : (
        <ul className="symptom-options grid gap-3 max-h-[28rem] overflow-y-auto mt-3">
          {filtered.slice(0, visibleCount).map((item) => (
            <li
              key={item.key}
              className="symptom-option p-3 cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => onSelectSymptom(item.key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectSymptom(item.key);
                }
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-gray-800 font-medium">{item.label}</div>
                  {item.meta.description && (
                    <div className="symptom-desc small muted">{item.meta.description}</div>
                  )}
                </div>
                {item.meta.weight !== undefined && (
                  <span className="symptom-tag">
                    {item.meta.weight >= 7
                      ? "Cao"
                      : item.meta.weight >= 4
                      ? "Trung bình"
                      : "Thấp"}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Load more */}
      {filtered.length > visibleCount && (
        <div className="mt-3 flex justify-center">
          <button className="btn" onClick={() => setVisibleCount((v) => v + 10)}>
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default BodyPartInfo;
