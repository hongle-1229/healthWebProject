import os
import json
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import joblib
from scipy.sparse import csr_matrix

# ==========================
# PATH
# ==========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")

NB_MODEL = os.path.join(MODEL_DIR, "nb_model.pkl")
FEATURES_JSON = os.path.join(MODEL_DIR, "features.json")
DESCRIPTION_JSON = os.path.join(MODEL_DIR, "description.json")
PRECAUTIONS_JSON = os.path.join(MODEL_DIR, "precautions.json")
SYMPTOM_WEIGHT_JSON = os.path.join(MODEL_DIR, "symptom_weight.json")

# ==========================
# LOAD MODEL & DATA
# ==========================
clf = joblib.load(NB_MODEL)

with open(FEATURES_JSON, "r", encoding="utf-8") as f:
    features = json.load(f)

with open(DESCRIPTION_JSON, "r", encoding="utf-8") as f:
    disease_description = json.load(f)

with open(PRECAUTIONS_JSON, "r", encoding="utf-8") as f:
    disease_precautions = json.load(f)

with open(SYMPTOM_WEIGHT_JSON, "r", encoding="utf-8") as f:
    symptom_weight = json.load(f)

# ==========================
# FASTAPI INIT
# ==========================
app = FastAPI(title="Health Insight API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# INPUT MODEL
# ==========================
class PredictIn(BaseModel):
    symptoms: List[str]
    topK: int = 5

# ==========================
# GET FEATURES
# ==========================
@app.get("/api/model/features")
def get_features():
    return {
        "features": features,
        "symptom_meta": symptom_weight
    }

# ==========================
# BUILD FEATURE VECTOR
# ==========================
def build_feature_vector(symptoms: List[str]):
    x = np.zeros(len(features))
    for s in symptoms:
        if s in features:
            idx = features.index(s)
            x[idx] = 1
    return csr_matrix([x])

# ==========================
# PREDICT / ANALYZE
# ==========================
@app.post("/api/model/predict")
def predict(body: PredictIn):
    symptoms = body.symptoms
    topK = body.topK

    # Build feature vector
    x = build_feature_vector(symptoms)

    # Predict probabilities
    probs = clf.predict_proba(x)[0]
    classes = clf.classes_

    # Top K related
    idxs = np.argsort(probs)[::-1][:topK]

    analysis = []
    for idx in idxs:
        disease = classes[idx]
        p = float(probs[idx])
        if p >= 0.6:
            warning = "high"
        elif p >= 0.3:
            warning = "medium"
        else:
            warning = "low"

        analysis.append({
            "topic": disease,  # Hoặc map sang nhóm: hô hấp, tiêu hóa,...
            "related": disease,
            "match_score": round(p, 2),
            "description": disease_description.get(disease, ""),
            "advice": disease_precautions.get(disease, []),
            "warning_level": warning
        })

    # Symptom focus
    symptom_focus = []
    for s in symptoms:
        w = symptom_weight.get(s, 0)
        if w >= 7:
            note = "Triệu chứng nặng, cần chú ý"
        elif w >= 4:
            note = "Triệu chứng trung bình, theo dõi"
        else:
            note = "Triệu chứng nhẹ, theo dõi tại nhà"
        symptom_focus.append({
            "symptom": s,
            "weight": w,
            "note": note
        })

    return {"analysis": analysis, "symptom_focus": symptom_focus}

# ==========================
# RUN UVICORN
# ==========================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)