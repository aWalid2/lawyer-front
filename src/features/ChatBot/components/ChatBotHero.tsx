import { Bot, Scale, Sparkles } from "lucide-react";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";

const cards = [
  {
    icon: Sparkles,
    iconClassName: "text-[#B7791F]",
    label: "صياغات سريعة",
  },
  {
    icon: Scale,
    iconClassName: "text-[#1E5B7A]",
    label: "ملخصات قانونية",
  },
  {
    icon: Bot,
    iconClassName: "text-[#3F6C51]",
    label: "نسخ مباشر من الرد",
  },
];

export const ChatBotHero = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="space-y-2">
        <HeaderTitle innerPage title="المساعد الذكي" />
        <p className="max-w-2xl text-sm leading-7 text-[#6E7B88]">
          استخدم المساعد لصياغة الرسائل، تلخيص الملفات، تجهيز نقاط الجلسات، أو
          كتابة مسودات أولية يمكنك نسخها مباشرة من المحادثة.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {cards.map(({ icon: Icon, iconClassName, label }) => (
          <div
            key={label}
            className="rounded-2xl border border-[#E8E1D5] bg-[#FCFAF6] px-4 py-3 text-right"
          >
            <Icon className={`mb-2 h-4 w-4 ${iconClassName}`} />
            <p className="text-xs text-[#8B7A62]">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
