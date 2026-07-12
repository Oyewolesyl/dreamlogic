# Dream Logic Astrology API

This FastAPI service is the deterministic chart calculation boundary. It intentionally refuses to fabricate placements until a licensed ephemeris provider is configured.

Run locally:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Production must pin provider versions and store calculation settings with every chart snapshot.
