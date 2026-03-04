
export const ButtonSubmit = () => {
  return (
    <button
      className=" w-full flex items-center gap-2 px-6 py-3 text-white font-cairo rounded-[12px] transition-all mt-6 mb-6    whitespace-nowrap  h-[50px] justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #E3C086 0%, #CBA462 100%)",
      }}
    >
      <span className="relative z-10">تأكيد التعديل</span>
      <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity bg-black"></div>
    </button>
  );
};
