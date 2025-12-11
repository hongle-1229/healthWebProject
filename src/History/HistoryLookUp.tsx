import { useEffect, useState } from "react";
import { Table, Card, Tag } from "antd";
import axios from "axios";

interface DiseaseResult {
    related: string;
    topic: string;
    match_score: number;
    description: string;
    advice: string[];
    warning_level: "Thấp" | "Trung bình" | "Cao";
}

interface HighlightedSymptom {
    symptom: string;
    weight: number;
}

interface LookupHistory {
    LookupID: number;
    SelectedSymptoms: string[];
    Results: DiseaseResult[];
    HighlightedSymptoms: HighlightedSymptom[];
    CreatedAt: string;
}

const HistoryLookUp = () => {
    const [rows, setRows] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const rawUser = localStorage.getItem("user");
    const user = rawUser ? JSON.parse(rawUser) : null;
    const userID = user?.id;

    useEffect(() => {
        if (!userID) return;

        setLoading(true);

        axios
            .get(`http://localhost:5000/api/history/get_lookup/${userID}`)
            .then((res) => {
                const flatRows: any[] = [];

                res.data.forEach((lookup: any) => {
                    const SelectedSymptoms = JSON.parse(lookup.SelectedSymptoms || "[]");
                    const Results = JSON.parse(lookup.Results || "[]");

                    Results.forEach((d: DiseaseResult, index: number) => {
                        flatRows.push({
                            key: `${lookup.LookupID}-${index}`,
                            LookupID: index === 0 ? lookup.LookupID : "",

                            Symptoms:
                                index === 0
                                    ? SelectedSymptoms.map((s: any, i: number) => (
                                        <Tag key={i} color="geekblue">
                                            {s.symptom} (w={s.weight})
                                        </Tag>
                                    ))
                                    : "",

                            Disease: d.related,
                            Probability: `${(Number(d.match_score ?? 0) * 100).toFixed(1)}%`,
                            Warning: (
                                <Tag
                                    color={
                                        d.warning_level === "Cao"
                                            ? "red"
                                            : d.warning_level === "Trung bình"
                                                ? "orange"
                                                : "green"
                                    }
                                >
                                    {d.warning_level}
                                </Tag>
                            ),
                            Description: d.description,
                            Advice: d.advice.join(", "),

                            Time: index === 0 ? new Date(lookup.CreatedAt).toLocaleString("vi-VN") : "",
                        });
                    });
                });

                setRows(flatRows);
            })
            .finally(() => setLoading(false));
    }, [userID]);

    const columns = [
        { title: "ID", dataIndex: "LookupID", width: 70 },
        { title: "Triệu chứng đã chọn", dataIndex: "Symptoms", width: 250 },
        { title: "Bệnh dự đoán", dataIndex: "Disease", width: 180 },
        { title: "Xác suất liên quan", dataIndex: "Probability", width: 140 },
        { title: "Mức độ cảnh báo", dataIndex: "Warning", width: 150 },
        { title: "Mô tả", dataIndex: "Description", width: 250 },
        { title: "Khuyến nghị", dataIndex: "Advice", width: 250 },
        { title: "Thời gian", dataIndex: "Time", width: 180 },
    ];

    return (
        <Card
            title="🔍 Lịch sử tra cứu"
            style={{
                width: "95%",
                maxWidth: 1400,
                margin: "40px auto",
                marginTop: "100px",
            }}
        >
            <Table
                columns={columns}
                dataSource={rows}
                loading={loading}
                bordered
                pagination={{ pageSize: 10 }}
            />
        </Card>
    );
};

export default HistoryLookUp;
