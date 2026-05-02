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
      className="shadow-primary group flex flex-col items-start gap-4 rounded-xl bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-white/30"
    >
      <div className="bg-primary/10 text-primary flex h-15 w-15 items-center justify-center rounded-full font-bold dark:bg-white/20">
        <SettingsLawIcon className="dark:text-secondary" />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full flex-col items-start gap-3">
          <h3 className="text-primary-text text-lg font-semibold">{title}</h3>
          <p className="font-regular text-paragraph text-sm">{description}</p>
        </div>
        <div className="text-primary flex items-center justify-end">
          <ArrowLeftIcon className="dark:text-secondary transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default SettingsCard;
