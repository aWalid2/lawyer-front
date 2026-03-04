import React from "react";
import { FormDistinctionDialog } from "./components/FormDistinctionDialog";

export const HeaderDistinctionSessionsInfo = () => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-2 w-full pb-6">
            <h2 className="text-xl font-semibold text-secondary font-cairo whitespace-nowrap self-start md:self-center">
                بيانات التمييز
            </h2>
            <FormDistinctionDialog />
        </div>
    );
};
