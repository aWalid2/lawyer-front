import ProsecutionInfo from "./components/ProsecutionInfo";
import ProsecutionSessionsGroup from "./components/ProsecutionSessionsGroup";

function Prosecution() {
  return (
    <div className="space-y-6">
      <ProsecutionInfo />
      <ProsecutionSessionsGroup />
    </div>
  );
}

export default Prosecution;
