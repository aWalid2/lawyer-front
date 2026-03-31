import { useFormikContext } from "formik";

interface ButtonSubmitProps {
  label?: string;
}

export const ButtonSubmit: React.FC<ButtonSubmitProps> = ({
  label = "تأكيد التعديل",
}) => {
  const formik = useFormikContext();
  return (
    <button
      type="submit"
      disabled={formik.isSubmitting}
      className=" w-full flex items-center gap-2 px-6 py-3 text-white font-cairo rounded-[12px] transition-all mt-6    whitespace-nowrap  h-[50px] justify-center relative overflow-hidden hover:opacity-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        background: "linear-gradient(135deg, #E3C086 0%, #CBA462 100%)",
      }}
    >
      <span className="relative z-10">{label}</span>
      <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity bg-black"></div>
    </button>
  );
};
