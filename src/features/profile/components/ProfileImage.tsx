import { useState } from "react";
import { Camera } from "lucide-react";

interface ProfileImageProps {
  onImageChange?: (file: File | null) => void;
  disabled?: boolean;
}

const ProfileImage = ({
  onImageChange,
  disabled = false,
}: ProfileImageProps) => {
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      onImageChange?.(file);
    }
  };

  return (
    <div className="flex w-full flex-col items-center md:w-70">
      <h1 className="font-Regular mb-4 text-[16px]">الصورة الشخصية</h1>
      <div className="relative h-45 w-45 rounded-full border border-gray-300 bg-gray-500">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="profileImage"
          disabled={disabled}
          onChange={handleImageChange}
        />

        <label
          htmlFor={disabled ? undefined : "profileImage"}
          className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-full ${disabled ? "cursor-default" : "cursor-pointer"}`}
        >
          {profileImage ? (
            <>
              <img
                src={URL.createObjectURL(profileImage)}
                alt="الصورة الشخصية"
                className="h-full w-full object-cover"
              />
              <div
                className={`bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-300 ${disabled ? "opacity-0" : "opacity-0 hover:opacity-100"}`}
              >
                <div className="rounded-full border-4 border-white bg-black/20 p-2">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="rounded-full border-4 border-[#FFFFFF] p-2">
                <Camera className="h-10 w-10 text-white" />
              </div>
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

export default ProfileImage;
