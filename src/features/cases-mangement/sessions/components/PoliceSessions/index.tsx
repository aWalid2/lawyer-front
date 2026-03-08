
import AddPoliceStationsession from "./components/AddPoliceStationsession";
import FormPoliceSessions from "./components/FormPoliceSessions";
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