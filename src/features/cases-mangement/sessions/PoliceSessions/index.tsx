
import PoliceStationsession from "./components/PoliceStationSessions";
import PoliceStationInfo from "./components/PoliceStationInfo";
function PoliceSessions() {
  return (
    <div className="w-full ">
      <div >
        <PoliceStationInfo />
        <PoliceStationsession />
      </div>
    </div>
  );
}

export default PoliceSessions;