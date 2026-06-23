import { useState } from "react";
import { Camera, Loader2 } from "lucide-react";

interface ProfileImageProps {
  currentPhoto?: string | null;
  onUpload?: (file: File) => void;
  disabled?: boolean;
  isUploading?: boolean;
}

const ProfileImage = ({
  currentPhoto,
  onUpload,
  disabled = false,
  isUploading = false,
}: ProfileImageProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onUpload?.(file);
    }
  };

  const displaySrc = preview || currentPhoto || null;

  return (
    <div className="flex w-full flex-col items-center md:w-70">
      <h1 className="font-Regular mb-4 text-[16px]">الصورة الشخصية</h1>
      <div className="relative h-45 w-45 rounded-full border border-gray-300 bg-gray-500">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="profileImage"
          disabled={disabled || isUploading}
          onChange={handleImageChange}
        />

        <label
          htmlFor={disabled || isUploading ? undefined : "profileImage"}
          className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-full ${disabled || isUploading ? "cursor-default" : "cursor-pointer"}`}
        >
          {displaySrc ? (
            <>
              <img
                src={displaySrc}
                alt="الصورة الشخصية"
                className="h-full w-full object-cover"
              />
              {isUploading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Loader2 className="h-10 w-10 animate-spin text-white" />
                </div>
              ) : (
                <div
                  className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-300 ${disabled ? "opacity-0" : "opacity-0 hover:opacity-100"}`}
                >
                  <div className="rounded-full border-4 border-white bg-black/20 p-2">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              {isUploading ? (
                <Loader2 className="h-10 w-10 animate-spin text-white" />
              ) : (
                <div className="rounded-full border-4 border-[#FFFFFF] p-2">
                  <Camera className="h-10 w-10 text-white" />
                </div>
              )}
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

export default ProfileImage;
