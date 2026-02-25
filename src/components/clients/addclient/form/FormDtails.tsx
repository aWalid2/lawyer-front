import { Formik, Form } from "formik";
import { useState } from "react";

import type { FormValues } from "../../types";
import { validationSchema } from "./ValidationSchema";
import FirstDetails from "./FormDetails/FirstDetails";
import SecondDetails from "./FormDetails/SecondDetails";
import ThirdDetails from "./FormDetails/ThirdDetails";
import { Switch } from "@/components/ui/switch";
import AddContract from "./Add Contract/AddContract";
import FourDetails from "./FormDetails/FourDetails";
import FiveDetails from "./FormDetails/FiveDetails";
import arrow from "../../../../../public/images/arrow.svg";


const FormDetails = () => {
  const validationSchem = validationSchema;

  const [hasContract, setHasContract] = useState(false);
  const [addClients, setAddClients] = useState(false);


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
      onSubmit={() => { }}
    >
      <div className="p-6 shadow-gray-400 shadow-2xl  ">
        <div className="flex  items-center gap-2 pb-8  ">
          <img src={arrow} />
          <h1 className="text-xl font-cairo ">إضافة موكل جديد</h1>
        </div>
        <div className="border border-gray-300 p-4 rounded-xl ">
          <Form>
            <FirstDetails />
            <SecondDetails />
            <ThirdDetails />

            <div className="flex justify-between pt-16 items-center">
              <h1 className="text-sm font-medium p-6">هل لديك عقد</h1>

              <Switch
                checked={hasContract}
                onCheckedChange={setHasContract}
              />
            </div>
            {hasContract &&
              <AddContract />}

            <FourDetails />

            <div className="flex justify-between pt-12 items-center">
              <h1 className="text-sm font-medium ">إنشاء حساب للموكل؟</h1>

              <Switch
                checked={addClients}
                onCheckedChange={setAddClients}
              />
            </div>
            {addClients &&
              <FiveDetails />}
          </Form>
          <div className="w-full pt-8" >
            <button
              className=" w-full flex items-center gap-2 px-6 py-3 text-white font-cairo rounded-[12px] transition-all whitespace-nowrap w-[137px] h-[50px] justify-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #E3C086 0%, #CBA462 100%)",
              }}
            >
              <span className="relative z-10">إضافة الموكل</span>
              <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity bg-black"></div>
            </button>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default FormDetails;