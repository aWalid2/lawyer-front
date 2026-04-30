import PoliceStationsession from "./components/PoliceStationSessions";
import PoliceStationInfo from "./components/PoliceStationInfo";
function PoliceSessions() {
  return (
    <div className="space-y-6">
      <PoliceStationInfo />
      <PoliceStationsession />
    </div>
  );
}

export default PoliceSessions;
