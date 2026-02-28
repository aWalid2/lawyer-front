import { Form, Formik } from "formik";
import { useState } from "react";

import type { FormValues } from "../../../../../table/componnents/typesClients";
import FirstDetails from "./components/FirstDetails";
import FourDetails from "./components/FourDetails";
import { validationSchema } from "../ValidationSchema";

const FormDetails = () => {
  const validationSchem = validationSchema;

  const [hasContract, setHasContract] = useState(false);

  const initialValues: FormValues = {
    firstName: "",
    secondName: "",
    countryCode: "+20",
    phone: "",
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchem}
      onSubmit={() => {}}
    >
      <div className="border border-[#E8E8E8] p-4 rounded-xl ">
        <Form>
          <FirstDetails />
          <FourDetails />
        </Form>
        <div className="w-full pt-8">
          <button
            className=" w-full flex items-center gap-2 px-6 py-3 text-white font-cairo rounded-[12px] transition-all whitespace-nowrap  h-[50px] justify-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #E3C086 0%, #CBA462 100%)",
            }}
          >
            <span className="relative z-10">إضافة الموكل</span>
            <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity bg-black"></div>
          </button>
        </div>
      </div>
    </Formik>
  );
};

export default FormDetails;
