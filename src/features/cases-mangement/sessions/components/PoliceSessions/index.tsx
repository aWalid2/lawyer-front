
import PoliceStationsession from "./components/PoliceStationSessions";
import FormPoliceSessions from "./components/FormPoliceSessions";
function PoliceSessions() {
  return (
    <div className="w-full ">
      <div >
        <FormPoliceSessions />
        <PoliceStationsession />
      </div>
    </div>
  );
}

export default PoliceSessions;