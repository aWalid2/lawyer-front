import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ImagePreviewCardProps {
  src?: string | null;
  alt: string;
  label?: string;
  title?: string;
  emptyText?: string;
  containerClassName?: string;
  imageClassName?: string;
}

export const ImagePreviewCard: React.FC<ImagePreviewCardProps> = ({
  src,
  alt,
  label,
  title,
  emptyText = "لا توجد صورة",
  containerClassName = "mt-4 h-28 w-28 max-md:w-full",
  imageClassName = "h-full w-full object-cover",
}) => {
  const frameClassName = `rounded-main overflow-hidden border border-[#E8E8E8] bg-gray-200 transition-colors hover:border-primary ${containerClassName}`;
  const mediaContainerClassName = `${frameClassName} block shrink-0 p-0 text-right transition-opacity hover:opacity-90`;

  if (!src) {
    return (
      <div>
        {label && <h4>{label}</h4>}
        <div className={frameClassName}>
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            {emptyText}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {label && <h4>{label}</h4>}
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className={mediaContainerClassName}
            aria-label={title ?? alt}
          >
            <img src={src} alt={alt} className={`block ${imageClassName}`} />
          </button>
        </DialogTrigger>
        <DialogContent className="w-auto max-w-[95vw] border-none bg-transparent p-0 shadow-none sm:max-w-[95vw]">
          <DialogTitle className="sr-only">{title ?? alt}</DialogTitle>
          <div className="rounded-main flex max-h-[95vh] max-w-[95vw] items-center justify-center overflow-hidden bg-white p-3">
            <img
              src={src}
              alt={alt}
              className="h-auto max-h-[90vh] w-auto max-w-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
