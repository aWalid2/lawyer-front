import React from "react";
import { Link } from "react-router-dom";
import { HeaderActionButton } from "../../../../../../components/shared/components/HeaderActionButton";

export const NewCaseButton: React.FC = () => {
  return (
    <HeaderActionButton
      asChild
      variant="primary"
      label="قضية جديدة"
      icon={<span className="text-xl">+</span>}
      iconPosition="right"
      className="flex-1 md:flex-none px-8 h-12.5 rounded-[12px]"
    >
      <Link to="/dashboard/case-management/new" />
    </HeaderActionButton>
  );
};
