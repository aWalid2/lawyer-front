import React from "react";
import { Link } from "react-router-dom";
import { HeaderActionButton } from "../../../../../../shared/components/Header/HeaderActionButton";

export const NewCaseButton: React.FC = () => {
  return (
    <HeaderActionButton
      asChild
      variant="primary"
      label="قضية جديدة"
      icon={<span className="text-xl">+</span>}
      iconPosition="right"
      className="h-12.5 flex-1 rounded-[12px] px-8 md:flex-none"
    >
      <Link to="/dashboard/case-management/new" />
    </HeaderActionButton>
  );
};
