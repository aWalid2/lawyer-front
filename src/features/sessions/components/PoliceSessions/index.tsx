
import AddPoliceStationsession from "./AddPoliceStationsession";
import FormPoliceSessions from "./FormPoliceSessions";
function PoliceSessions() {
  return (
    <div className="w-full ">
      <div >
        <FormPoliceSessions />
        <AddPoliceStationsession />
      </div>
    </div>
  );
}

export default PoliceSessions;