type Option = {
  value: string;
  label: string;
};

export const getOptionLabel = (
  value: string | undefined,
  options: Option[],
) => {
  return options.find((option) => option.value === value)?.label || value;
};

export type { Option };