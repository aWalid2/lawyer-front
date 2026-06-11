import { Formik, Form } from "formik";
import type { FormValues } from "../addclient/types/addClientT";
import { validationSchema } from "../addclient/components/ValidationSchema";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import PageLayout from "@/shared/components/PageLayout";
import { useAddClient } from "./api/hooks/useAddClient";
import { BasicClientInfo } from "./components/BasicClientInfo";
import { ContractDetails } from "./components/ContractDetails";
import { AuthorizationAndNotes } from "./components/AuthorizationAndNotes";
import { ClientAccountCreation } from "./components/ClientAccountCreation";
import { SubmitButton } from "@/shared/components/SubmitButton";
import { formatPhoneNumber } from "@/shared/utils/validators";

const FormDetails = () => {
  const { mutate, isPending } = useAddClient();

  const initialValues: FormValues = {
    first_name: "",
    email: "",
    password: "",
    authorization_photo: null,
    nationality: "",
    country: "",
    address: "",
    ssn: "",
    phone: "",
    countryCode: "+965",
    has_contract: false,
    add_clients: false,
    client_type: "individual",
    notes: "",
    contracts: [],
    confirmation_password: "",
    user_status: "",
  };

  const handleSubmit = (values: FormValues) => {
    const countryCode = values.countryCode || "+965";
    const formattedPhone =
      formatPhoneNumber(values.phone, countryCode) ?? values.phone;

    const dataToSend = {
      first_name: values.first_name,
      email: values.email,
      nationality: values.nationality,
      address: values.address,
      ssn: values.ssn,
      country: values.country,
      phone: formattedPhone,
      countryCode: countryCode,
      notes: values.notes,
      has_contract: values.has_contract,
      contracts: values.has_contract ? values.contracts : [],
      add_clients: values.add_clients,
      ...(values.add_clients
        ? {
            password: values.password,
            confirmation_password: values.confirmation_password,
          }
        : {}),
      authorization_photo: values.authorization_photo,
      client_type: values.client_type,
      user_status: values.user_status,
    };

    mutate(dataToSend);
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {() => (
        <PageLayout>
          <div className="flex items-center gap-2 pb-8">
            <HeaderTitle title="إضافة موكل جديد" />
          </div>
          <div className="rounded-xl border border-gray-300 p-4">
            <Form>
              <BasicClientInfo />
              <ContractDetails />
              <AuthorizationAndNotes />
              <ClientAccountCreation />

              <div className="w-full pt-8">
                <SubmitButton
                  isPending={isPending}
                  loadingText="جاري الاضافة..."
                  className="mt-6"
                >
                  إضافة الموكل
                </SubmitButton>
              </div>
            </Form>
          </div>
        </PageLayout>
      )}
    </Formik>
  );
};

export default FormDetails;
