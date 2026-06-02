import type { ContractFormValues } from "../../types/addContract";

export const buildContractFormData = (values: ContractFormValues) => {
  const formData = new FormData();

  formData.append("start_date", values.start_date);
  formData.append("contract_value", values.contract_value);
  formData.append("contract_duration", values.contract_duration);

  if (values.file instanceof FileList) {
    if (values.file.length > 0) {
      formData.append("file", values.file[0]);
    }
  } else if (values.file instanceof File) {
    formData.append("file", values.file);
  }

  return formData;
};