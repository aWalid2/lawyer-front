export default function ImageFormDetails() {
  return (
    <div className="pt-14">
      <div className="flex flex-col gap-7">
        <h1>صورة التوكيل</h1>

        <div className="flex ">
          <div className="w-[150px] h-[125px] border border-gray-300 border-dashed border-2 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition">
            <p className="text-sm text-gray-400 flex flex-col gap-2">
              انقر هنا لتحميل
              <span>الصوره او سحبها</span>
              <span> وإفلاتها</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
