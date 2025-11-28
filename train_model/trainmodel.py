import os, json
import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.naive_bayes import MultinomialNB
import joblib

print("=== TRAIN START ===")

BASE = os.getcwd()

DATA_DIR_CANDIDATES = [
    os.path.join(BASE, "data"),
    os.path.join(BASE, "src", "data"),
    "/mnt/data",
    BASE
]

DATA_DIR = next((d for d in DATA_DIR_CANDIDATES if os.path.isdir(d)), DATA_DIR_CANDIDATES[0])
OUT_DIR = os.path.join(BASE, "models")
os.makedirs(OUT_DIR, exist_ok=True)

print("Using DATA:", DATA_DIR)
print("Output:", OUT_DIR)

# Load CSVs
file_symptom = os.path.join(DATA_DIR, "dataset_vietnamese.csv")
file_desc = os.path.join(DATA_DIR, "symptom_Description.csv")
file_prec = os.path.join(DATA_DIR, "symptom_precaution.csv")
file_weight = os.path.join(DATA_DIR, "Symptom_severity.csv")

df_sym = pd.read_csv(file_symptom)
df_desc = pd.read_csv(file_desc)
df_prec = pd.read_csv(file_prec)
df_weight = pd.read_csv(file_weight)

# Build symptom list
symptom_cols = [c for c in df_sym.columns if c.startswith("Symptom")]
df_sym["all_symptoms"] = df_sym[symptom_cols].values.tolist()
df_sym["all_symptoms"] = df_sym["all_symptoms"].apply(lambda row: [s for s in row if isinstance(s, str)])

# Create symptom binarizer
mlb = MultiLabelBinarizer()
X = mlb.fit_transform(df_sym["all_symptoms"])
y = df_sym["Disease"]

# Train Naive Bayes
model = MultinomialNB()
model.fit(X, y)

# Save model
joblib.dump(model, os.path.join(OUT_DIR, "nb_model.pkl"))

# Save features
with open(os.path.join(OUT_DIR, "features.json"), "w", encoding="utf-8") as f:
    json.dump(mlb.classes_.tolist(), f, ensure_ascii=False)

# Save disease -> description
desc_map = dict(zip(df_desc["Disease"], df_desc["Description"]))
with open(os.path.join(OUT_DIR, "description.json"), "w", encoding="utf-8") as f:
    json.dump(desc_map, f, ensure_ascii=False)

# Save disease -> precautions
prec_map = {}
for _, row in df_prec.iterrows():
    disease = row["Disease"]
    precs = [row[c] for c in df_prec.columns if c != "Disease" and isinstance(row[c], str)]
    prec_map[disease] = precs

with open(os.path.join(OUT_DIR, "precautions.json"), "w", encoding="utf-8") as f:
    json.dump(prec_map, f, ensure_ascii=False)

# Save symptom weight
weight_map = dict(zip(df_weight["Symptom"], df_weight["weight"]))
with open(os.path.join(OUT_DIR, "symptom_weight.json"), "w", encoding="utf-8") as f:
    json.dump(weight_map, f, ensure_ascii=False)

print("=== TRAIN DONE ===")