import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import React from "react";
import { useParams } from "react-router-dom";
import { JopInfoCard } from "./components/JopInfoCard";
import { PersonalInfo } from "./components/PersonalInfo";

export const EmployeeDetails: React.FC = () => {
    const { employeeId } = useParams<{ employeeId: string }>();


    const employeeData = {
        id: employeeId || "unknown",
        name: "محمد علي",
        phone: "073972983",
        job: "سكرتير",
        email: "mohamed.ali@example.com",
        joinDate: "01/01/2024",
        status: "نشط",
    };

    return (
        <div className="space-y-6">


            <HeaderTitle title={`تفاصيل الموظف: ${employeeData.name}`} />


            <div className="grid grid-cols-1 gap-y-6 ">
                <PersonalInfo employeeData={employeeData} />

                <JopInfoCard employeeData={employeeData} />

            </div>

        </div>
    );
};
