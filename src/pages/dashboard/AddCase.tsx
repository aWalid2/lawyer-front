import FormCase from "@/features/cases-mangement/mainCase/AddCase/FormCase";
function AddCase() {
  return (
    <div className="space-y-6  pt-6   ">
      <div className=" overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-gray-400 shadow-2xl">
        < FormCase />
      </div>
    </div>
  );
}

export default AddCase;
