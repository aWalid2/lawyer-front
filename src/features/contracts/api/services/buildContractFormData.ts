import type { ContractFormValues } from "../../types";

export const buildContractFormData = (values: ContractFormValues) => {
  const formData = new FormData();

  formData.append("start_date", values.startDate);
  formData.append("contract_value", values.contractValue);
  formData.append("contract_duration", values.contractDuration);

  if (values.file instanceof FileList) {
    if (values.file.length > 0) {
      formData.append("file", values.file[0]);
    }
  } else if (values.file instanceof File) {
    formData.append("file", values.file);
  }

  return formData;
};