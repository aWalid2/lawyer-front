import { Formik, Form } from "formik";
import { useState } from "react";
import type { FormValues } from "./types";
import { validationSchema } from "./ValidationSchema";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import PageLayout from "@/shared/components/PageLayout";

// استيراد المكونات
import OfficeInfo from "./components/OfficeInfo";
import ServicesSection from "./components/ServicesSection";
import TeamSection from "./components/TeamSection";
import ContactInfo from "./components/ContactInfo"; // إضافة import جديد
import FormActions from "./components/FormActions";

// ثوابت الكلاسات
export const CLASSES = {
  uploadContainer:
    "border border-gray-300 border-dashed border-2 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition",
  uploadBox: "w-[120px] h-[100px] md:w-[150px] md:h-[125px]",
  uploadText:
    "text-[10px] md:text-sm text-gray-400 flex flex-col gap-1 md:gap-4",
  formSection: "border border-gray-300 p-3 md:p-4 rounded-xl mt-4 md:mt-8",
  sectionTitle: "text-sm md:text-base lg:text-lg",
  submitButton:
    "w-full flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-white font-cairo rounded-[12px] transition-all whitespace-nowrap w-[120px] md:w-[241px] h-[40px] md:h-[50px] justify-center relative overflow-hidden text-sm md:text-base",
  label: "block text-sm md:text-base text-right mb-2 font-medium text-gray-700",
  input:
    "w-full mt-2 md:mt-4 border rounded-md p-2 text-[14px] md:text-[16px] text-[#B5B5B5] bg-[#FBFBFB] resize-none text-right",
  addButton:
    "mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors",
  serviceItem:
    "bg-[#FBFBFB] p-3 rounded-lg border border-gray-200 w-[308px] h-[50px] flex flex-wrap ",
  serviceName: "text-sm font-medium text-gray-700",
  serviceDelete: "text-red-500 hover:text-red-700 cursor-pointer text-sm",
  modalOverlay:
    "fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50",
  modalContent: "bg-white rounded-xl p-6 w-[90%] max-w-md",
  modalTitle: "text-lg font-semibold mb-4 text-center",
  modalInput: "w-full border border-gray-300 rounded-lg p-2 mb-4 text-right",
  modalButtons: "flex gap-3 justify-center",
  modalButton: "px-6 py-2 rounded-lg text-white transition-colors",
  teamCard:
    "bg-[#FBFBFB] p-4 rounded-lg border border-gray-200 w-full sm:w-[400px]",
  teamName: "text-sm font-medium text-gray-700",
  teamRole: "text-xs text-gray-500",
  teamDescription: "text-xs text-gray-600 mt-2 line-clamp-2",
  fieldLabel: "block text-sm text-gray-600 mb-1 text-right font-medium",
};

const About = () => {
  // حالة الخدمات
  const [services, setServices] = useState<string[]>([
    "الاستشارات القانونية",
    "صياغة العقود",
    "التقاضي أمام المحاكم",
  ]);

  // القيم الابتدائية (تم تحديثها لتشمل معلومات التواصل)
  const initialValues: FormValues = {
    officeLogo: null,
    officeName: "تك لو لإدارة مكاتب المحاماة",
    notes:
      "تأسس مكتب الدولي للمحاماة والاستشارات القانونية في دولة الكويت بهدف تقديم خدمات قانونية متميزة على أعلى مستوى من الاحترافية والمهنية. يتميز مكتبنا بفريق من المحامين الكويتيين ذوي الخبرة الواسعة في مختلف المجالات القانونية، مما يجعلنا قادرين على تقديم حلول قانونية شاملة ومتكاملة لعملائنا.\n\nيلتزم المكتب بتطبيق أعلى معايير السرية والنزاهة والشفافية في جميع تعاملاته، مع التركيز على تحقيق أفضل النتائج لعملائنا من خلال الفهم العميق لاحتياجاتهم وتقديم الاستشارات القانونية المناسبة وفقًا للقوانين الكويتية في الوقت المناسب.",
    vision:
      "نسعى لأن نكون المكتب القانوني الأول والأكثر ثقة في دولة الكويت، من خلال تقديم خدمات قانونية متميزة تجمع بين الخبرة المهنية العالية والتقنيات الحديثة، مع الحفاظ على القيم الأخلاقية والمهنية التي تميزنا، والمساهمة في تطوير البيئة القانونية الكويتية.",
    message:
      "تقديم خدمات قانونية متكاملة وفعالة تلبي احتياجات عملائنا وتحمي مصالحهم في إطار القوانين الكويتية، من خلال الاعتماد على فريق من المحامين الكويتيين المؤهلين والمتخصصين في مختلف المجالات القانونية، واستخدام أحدث التقنيات والأساليب المبتكرة في العمل القانوني.",
    teamMembers: [
      {
        name: "أحمد محمد",
        role: "محامي استشاري",
        description: "خبرة 15 سنة في مجال القانون التجاري والتحكيم الدولي",
      },
      {
        name: "سارة عبدالله",
        role: "محامية",
        description: "متخصصة في قضايا الأحوال الشخصية والعقود",
      },
    ],
    contactInfo: {
      // إضافة معلومات التواصل الافتراضية
      email: "info@lawfirm.com",
      phone: "+965 1234 5678",
      address: "الكويت - مدينة الكويت - برج التجارة - الطابق 15",
      workingHours: "السبت - الخميس: 9:00 ص - 6:00 م | الجمعة: مغلق",
    },
  };

  return (
    <>
      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form Values:", values);
          console.log("Services:", services);
        }}
      >
        {({ values, setFieldValue }) => (
          <PageLayout>
            <HeaderTitle innerPage title="عن المكتب" />

            <div className={CLASSES.formSection}>
              <Form className="space-y-4 md:space-y-6">
                {/* المكونات الخمسة (تمت إضافة ContactInfo) */}
                <OfficeInfo values={values} setFieldValue={setFieldValue} />
                <ServicesSection
                  services={services}
                  setServices={setServices}
                />
                <TeamSection />
                <ContactInfo /> {/* إضافة مكون معلومات التواصل هنا */}
                <FormActions />
              </Form>
            </div>
          </PageLayout>
        )}
      </Formik>
    </>
  );
};

export default About;
