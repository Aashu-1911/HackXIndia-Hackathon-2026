import os
import joblib
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

# Initialize FastAPI app
app = FastAPI(title="HackX Outbreak Prediction API")

# Global variables for model and scaler
model = None
scaler = None

class PredictionRequest(BaseModel):
    features: List[float]

@app.on_event("startup")
def load_artifacts():
    """Load model and scaler on startup"""
    global model, scaler
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(current_dir, 'outbreak_model.pkl')
        scaler_path = os.path.join(current_dir, 'scaler.pkl')

        if not os.path.exists(model_path) or not os.path.exists(scaler_path):
            raise FileNotFoundError("Model or scaler file not found")

        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)
        print("Model and scaler loaded successfully")
    except Exception as e:
        print(f"Error loading artifacts: {str(e)}")
        # We don't raise here to allow the app to start, but health check might indicate issues
        # Ideally, we should probably fail startup if artifacts are critical.

@app.get("/")
def health_check():
    """Health check endpoint"""
    return {
        "status": "active",
        "service": "Outbreak Prediction API",
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None
    }

@app.post("/predict")
def predict(request: PredictionRequest):
    """
    Make a prediction based on input features.
    
    Expected input:
    {
        "features": [f1, f2, f3, ...]
    }
    """
    if model is None or scaler is None:
        raise HTTPException(status_code=503, detail="Model service not ready")

    try:
        # Convert list to numpy array and reshape for single sample
        # The scaler usually expects a 2D array
        input_data = np.array(request.features).reshape(1, -1)
        
        # Scale the features
        stats_scaled = scaler.transform(input_data)
        
        # Make prediction
        prediction = model.predict(stats_scaled)
        
        # Convert prediction to native Python type (int/float)
        # Assuming classification (0 or 1) or regression
        result = prediction[0]
        if hasattr(result, 'item'):
            result = result.item()

        return {
            "prediction": result,
            "status": "success"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
