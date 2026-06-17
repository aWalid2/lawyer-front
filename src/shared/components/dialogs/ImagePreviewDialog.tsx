import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ImagePreviewDialogProps {
  src: string;
  alt: string;
  title?: string;
  trigger: ReactNode;
  contentClassName?: string;
  imageClassName?: string;
}

export const ImagePreviewDialog: React.FC<ImagePreviewDialogProps> = ({
  src,
  alt,
  title = "معاينة الصورة",
  trigger,
  contentClassName = "w-auto max-w-[95vw] border-none bg-transparent p-0 shadow-none sm:max-w-[95vw]",
  imageClassName = "h-auto max-h-[90vh] w-auto max-w-full object-contain",
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={contentClassName}>
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="rounded-main flex max-h-[95vh] max-w-[95vw] items-center justify-center overflow-hidden bg-white p-3">
          <img src={src} alt={alt} className={imageClassName} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
