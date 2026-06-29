import type { ContractFormValues } from "../../types/addContract";

export const buildContractFormData = (values: ContractFormValues) => {
  const formData = new FormData();

  formData.append("start_date", values.start_date);
  formData.append("contract_value", values.contract_value);
  formData.append("contract_duration", values.hasFixedDuration ? values.contract_duration : "");
  formData.append("related_cases", values.hasFixedCases ? values.contract_cases : "");
  if (values.contract_title) {
    formData.append("contract_title", values.contract_title);
  }

  if (values.file instanceof FileList) {
    if (values.file.length > 0) {
      formData.append("file", values.file[0]);
    }
  } else if (values.file instanceof File) {
    formData.append("file", values.file);
  }

  return formData;
};