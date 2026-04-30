import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";

const FilesButton = ({ handleOpenFile }: { handleOpenFile: () => void }) => {
  return (
    <div className="flex gap-3">
      <Button
        onClick={handleOpenFile}
        className="bg-[#CBA462] text-white hover:bg-[#b8924e]"
      >
        <Eye className="ml-2 h-4 w-4" />
        فتح الملف
      </Button>
      <Button
        onClick={handleOpenFile}
        variant="outline"
        className="border-[#CBA462] text-[#CBA462] hover:bg-[#F4EADA]"
      >
        <Download className="ml-2 h-4 w-4" />
        تحميل الملف
      </Button>
    </div>
  );
};

export default FilesButton;
