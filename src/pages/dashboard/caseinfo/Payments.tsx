import React from "react";
import PageLayout from "@/shared/components/PageLayout";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";
import PaymentsCaseFeature from "@/features/cases-mangement/Payments";

const Payments: React.FC = () => {
  return (
    <PageLayout innerPage>
      <div className="mb-6 flex items-center justify-between">
        <HeaderTitle title="المدفوعات" />
      </div>
      <PaymentsCaseFeature />
    </PageLayout>
  );
};

export default Payments;
