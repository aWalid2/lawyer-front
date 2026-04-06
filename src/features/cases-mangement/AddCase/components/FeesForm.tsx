
import { FeesRadio } from "./FeesRadio";

export function FeesForm() {

  return (
    <div className="mt-10 space-y-6">
      <div className="text-sm font-medium text-gray-700 mb-5">هل الاتعاب رقم أم نسبة من الأرباح أم تابعة للعقد ؟</div>
      <FeesRadio />
    </div>
  );
}