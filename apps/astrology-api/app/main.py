from datetime import datetime
from enum import Enum
from typing import Literal

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field


class BirthTimeCertainty(str, Enum):
    official_recorded = "official_recorded"
    family_reported = "family_reported"
    approximate = "approximate"
    rectified = "rectified"
    unknown = "unknown"


class NatalRequest(BaseModel):
    profile_id: str
    birth_date: str
    birth_time: str | None = None
    birth_time_certainty: BirthTimeCertainty
    latitude: float | None = Field(default=None, ge=-90, le=90)
    longitude: float | None = Field(default=None, ge=-180, le=180)
    iana_time_zone: str
    resolved_utc: datetime | None = None
    house_system: str
    zodiac_mode: Literal["tropical", "sidereal"] = "tropical"


class CalculationUnavailable(BaseModel):
    status: Literal["provider_required"] = "provider_required"
    message: str
    missing: list[str]


app = FastAPI(
    title="Dream Logic Astrology API",
    version="0.1.0",
    description="Deterministic astrology calculation boundary for Dream Logic."
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "dream-logic-astrology-api"}


@app.post("/charts/natal", response_model=CalculationUnavailable)
def calculate_natal_chart(payload: NatalRequest) -> CalculationUnavailable:
    if payload.birth_time_certainty == BirthTimeCertainty.unknown:
        raise HTTPException(
            status_code=422,
            detail="Birth time is unknown; houses, Ascendant, Midheaven and time-dependent claims must be omitted."
        )

    return CalculationUnavailable(
        message=(
            "A licensed ephemeris provider is required before Dream Logic can return natal placements. "
            "This endpoint refuses to fabricate chart data."
        ),
        missing=["SWISS_EPHEMERIS_PATH", "EPHEMERIS_LICENSE_CONFIRMATION"]
    )
