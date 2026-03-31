import type { FormValues } from "../types/typseCase";

 export const initialValues: FormValues= {
    caseStatusReceived: "", 
    // حقول القضية الأساسية
    caseStatus: "pending",           
    caseTitle: "",                   
    clientName: "",                  
    caseType: "",                    
    clientType: "individual",        
    // حقول المخفر والتحقيق
    policeStation: "",               
    numberInPoliceStation: "",       
    dateInPoliceStation: "",         
    investigatorName: "",            
    investigativeAuthority: "",      
    dateInProsecution: "",           
    dateInOffice: "",                
    //  بيانات الموكل في الخصم
    firstName: "",                   
    secondName: "",                  
    countryCode: "+20",              
    phone: "",                       
    civilId: "",                     
    nationality: "",                 
    country: "",                     
    address: "",                     
    email: "",                       
    // النيابه 
    prosecution: "",                  
    numberInprosecution: "",          
    dateInprosecution: "",           
    // بيانات العقد
    contractStartDate: "",           
    contractValue: "",               
    contractDuration: "",            
    contractImage: null,             
    // التوكيل
    powerOfAttorneyImage: null,      
    // ملاحظات
    notes: "",                       
  };
