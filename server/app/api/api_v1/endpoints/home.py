from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse

router = APIRouter()


@router.get("/")
def read_products():
    return JSONResponse(content={'hello': "world"})
