
import { ExpertsSessionBox } from "./components/ExpertsSessionBox";
import { HeaderExpertsSessionInfo } from "./components/HeaderExpertsSessionInfo";



export const ExpertsSessionInfo = () => {

  return (
    <>
      <div className="border border-gray-300 p-6 rounded-xl mb-6">
        <HeaderExpertsSessionInfo />
        <div className="grid md:grid-cols-2 gap-6">
          <ExpertsSessionBox
            label="مكتب الخبراء / الخبير"
            text={"المكتب العربي للاستشارات الهندسية"}
          />

          <ExpertsSessionBox
            label="موضوع الخبرة"
            text={"مراجعة الاعمال الانشائية"}
          />

          <ExpertsSessionBox
            label="الرأي النهائي للخبير"
            text={"التقرير النهائي "}
          />
          <ExpertsSessionBox
            label="تاريخ إيداع التقرير"
            text={"2026-04-20"}
          />

          <ExpertsSessionBox
            label="الحالة"
            text={"تم الإيداع"}
          />


        </div>

      </div>
    </>
  );
};