from fastapi import FastAPI, File, UploadFile, Form
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from .files import file_adder
from .model import Inference
from fastapi import HTTPException

app = FastAPI()

# ✅ CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"msg": "Server is running"}

@app.post("/api/model")
async def inference(prompt: str = Form(...), files: List[UploadFile] = File(...)):
    res = await file_adder(files)
    model_res = await Inference(res, prompt)
    return {"msg": "Model Inference is completed", "res": model_res["msg"]}
    

