import React from "react";
import PageLayout from "@/components/shared/components/PageLayout";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";

const Sessions: React.FC = () => {
  return (
    <PageLayout innerPage>
      <div className="flex items-center justify-between mb-6">
        <HeaderTitle title="إدارة الجلسات" />
      </div>
      <div className="text-secondary text-right">محتوى إدارة الجلسات</div>
    </PageLayout>
  );
};

export default Sessions;
