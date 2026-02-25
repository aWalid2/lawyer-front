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
        </div>
      </div>
    </Formik>
  );
};

export default FormDetails;