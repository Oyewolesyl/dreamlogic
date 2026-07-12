import { AppShell } from "../../components/AppShell";

export default function OnboardingPage() {
  return (
    <AppShell>
      <p className="eyebrow">Adaptive onboarding</p>
      <h1 className="headline">Create a verified birth profile.</h1>
      <form className="onboarding-form">
        <label className="field">
          <span>Name</span>
          <input name="name" placeholder="Profile name" />
        </label>
        <label className="field">
          <span>Birth date</span>
          <input name="birthDate" type="date" />
        </label>
        <label className="field">
          <span>Birth time</span>
          <input name="birthTime" type="time" />
        </label>
        <label className="field">
          <span>Birth-time certainty</span>
          <select name="birthTimeCertainty">
            <option value="official_recorded">Official recorded time</option>
            <option value="family_reported">Family-reported time</option>
            <option value="approximate">Approximate</option>
            <option value="rectified">Rectified</option>
            <option value="unknown">Unknown</option>
          </select>
        </label>
        <label className="field">
          <span>Birth location</span>
          <input name="location" placeholder="City, region, country" />
        </label>
        <label className="field">
          <span>House system</span>
          <select name="houseSystem">
            <option value="placidus">Placidus</option>
            <option value="whole_sign">Whole Sign</option>
            <option value="equal">Equal</option>
            <option value="porphyry">Porphyry</option>
            <option value="regiomontanus">Regiomontanus</option>
            <option value="campanus">Campanus</option>
            <option value="koch">Koch</option>
            <option value="alcabitius">Alcabitius</option>
            <option value="morinus">Morinus</option>
            <option value="vehlow">Vehlow</option>
          </select>
        </label>
        <button className="button" type="button">Resolve time and continue</button>
      </form>
    </AppShell>
  );
}
