import FormCase from "@/features/cases-mangement/AddCase";
function AddCase() {
  return (
    <div className="w-full pt-6">
      <div className="bg-white rounded-2xl shadow-primary p-4 md:p-6 overflow-x-auto border-none">
        <FormCase />
      </div>
    </div>
  );
}

export default AddCase;
