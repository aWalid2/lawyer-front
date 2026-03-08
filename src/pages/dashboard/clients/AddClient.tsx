import FormDetails from "../../../features/clients/components/addclient/form/FormDetails";

function AddClient() {
  return (
    <div className="space-y-6  pt-6   ">
      <div className=" overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-gray-400 shadow-2xl">
        <FormDetails />
      </div>
    </div>
  );
}

export default AddClient;
