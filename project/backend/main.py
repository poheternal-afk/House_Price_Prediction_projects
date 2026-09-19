import asyncio
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()


def predict_price(area: float, bedrooms:int, location:str = "others") -> float:
    base_price = 500000000
    area_base_price = 15000000
    single_bedroom_price = 50000000
    location_multiplier = {
        "hanoi": 1.3,
        "hcmc": 1.25
    }
    if location.lower() in location_multiplier:
        return round((base_price + (area * area_base_price) + (bedrooms * single_bedroom_price)) * location_multiplier.get(location.lower(), 1), 2)
    elif location.lower() not in location_multiplier:
        return round((base_price + (area * area_base_price) + (bedrooms * single_bedroom_price)), 2)


@app.get("/predict")
def predict_endpoint(area: float, bedrooms: int, location: str = "others"):
    price = predict_price(area=area, bedrooms=bedrooms, location=location)
    return {
        "area": area,
        "bedrooms": bedrooms,
        "location": location,
        "predicted_price": price
    }

app.mount("/static", StaticFiles(directory="../frontend"), name="static")