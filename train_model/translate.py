import pandas as pd
from deep_translator import GoogleTranslator
import os

def translate_text(text):
    if pd.isna(text):
        return text
    try:
        return GoogleTranslator(source='en', target='vi').translate(text)
    except:
        return text

def translate_csv(input_file, output_file, columns=None):
    print(f"🔄 Đang dịch file: {input_file}")
    df = pd.read_csv(input_file)

    if columns is None:
        columns = df.columns  # dịch tất cả cột

    for col in columns:
        print(f"  ➤ Đang dịch cột: {col}")
        df[col] = df[col].astype(str).apply(translate_text)

    df.to_csv(output_file, index=False, encoding="utf-8-sig")
    print(f"✅ Đã dịch xong → lưu tại: {output_file}\n")

# ===============================
#  Dịch từng file dataset
# ===============================

# translate_csv(
#     "data/symptom_description.csv",
#     "data_vi/symptom_description_vi.csv"
# )

# translate_csv(
#     "data/symptom_precaution.csv",
#     "data_vi/symptom_precaution_vi.csv"
# )

# translate_csv(
#     "data/symptom_severity.csv",
#     "data_vi/symptom_severity_vi.csv"
# )

translate_csv(
    "data/dataset.csv",
    "data_vi/dataset_vi.csv"
)