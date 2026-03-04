import React from "react";
import { FormAppealDialog } from "./components/FormAppealDialog";

export const HeaderAppealSessionsInfo = () => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-2 w-full pb-6">
            <h2 className="text-xl font-semibold text-secondary font-cairo whitespace-nowrap self-start md:self-center">
                بيانات الاستئناف
            </h2>
            <FormAppealDialog />
        </div>
    );
};
