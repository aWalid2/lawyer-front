import type { FormValues } from "./typseCase";

 export const initialValues: FormValues= {
    caseStatusReceived: "", 
    // حقول القضية الأساسية
    caseStatus: "pending",           // وضع القضية عند الاستلام
    caseTitle: "",                   // عنوان القضية
    clientName: "",                  // اسم الموكل
    caseType: "",                    // نوع القضية (تحت الرفع/الادعاء العام/النيابة)
    clientType: "individual",        // صفة الموكل
    // حقول المخفر والتحقيق
    policeStation: "",               // المخفر التابع له القضية
    numberInPoliceStation: "",       // رقم القضية في المخفر
    dateInPoliceStation: "",         // تاريخ ورود القضية في المخفر
    investigatorName: "",            // اسم المحقق
    investigativeAuthority: "",      // جهة التحقيق
    dateInProsecution: "",           // تاريخ تسجيل القضية في الادعاء العام
    dateInOffice: "",                // تاريخ ورود القضية في المكتب
    //  بيانات الموكل في الخصم
    firstName: "",                   // الاسم الأول
    secondName: "",                  // الاسم الثاني
    countryCode: "+20",              // كود الدولة
    phone: "",                       // رقم الهاتف
    civilId: "",                     // الرقم القومي
    nationality: "",                 // الجنسية
    country: "",                     // الدولة
    address: "",                     // العنوان
    email: "",                       // البريد الإلكتروني
    // النيابه 
    prosecution: "",                  // عنوان النيابة
    numberInprosecution: "",          // رقم القضية في النيابة
    dateInprosecution: "",           // تاريخ القضيه في النيابة
    // بيانات العقد
    contractStartDate: "",           // تاريخ بداية العقد
    contractValue: "",               // قيمة العقد
    contractDuration: "",            // مدة العقد
    contractImage: null,             // صورة العقد
    // التوكيل
    powerOfAttorneyImage: null,      // صورة التوكيل
    // ملاحظات
    notes: "",                       // ملاحظات
  };
