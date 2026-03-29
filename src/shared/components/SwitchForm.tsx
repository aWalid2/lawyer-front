import React from "react";
import { useField } from "formik";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SwitchFormProps {
  name: string;
  label: string;
  className?: string;
}

export const SwitchForm: React.FC<SwitchFormProps> = ({
  name,
  label,
  className,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div className={cn("flex items-center justify-between py-2", className)}>
      <Label htmlFor={name} className="text-base font-bold text-[#334155]">
        {label}
      </Label>
      <Switch
        id={name}
        checked={field.value}
        onCheckedChange={(checked) => helpers.setValue(checked)}
      />
      {meta.touched && meta.error && (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      )}
    </div>
  );
};
