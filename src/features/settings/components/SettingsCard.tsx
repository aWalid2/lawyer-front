import { Link } from "react-router-dom";
import { SettingsLawIcon } from "@/shared/icons/SettingsLaw";
import { ArrowLeftIcon } from "@/shared/icons/ArrowLeft";

interface SettingsCardProps {
  title: string;
  description: string;
  href: string;
}

const SettingsCard = ({ title, description, href }: SettingsCardProps) => {
  return (
    <Link
      to={href}
      className="shadow-primary group flex flex-col items-start gap-4 rounded-xl bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-15 w-15 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
        <SettingsLawIcon />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full flex-col items-start gap-3">

          <h3 className="text-lg font-semibold text-primary-text">{title}</h3>
          <p className="text-sm font-regular text-paragraph">{description}</p>
        </div>
        <div className="flex items-center justify-end text-primary">
          <ArrowLeftIcon className=" transition-transform group-hover:translate-x-[4px]" />
        </div>
      </div>
    </Link>
  );
};

export default SettingsCard;
