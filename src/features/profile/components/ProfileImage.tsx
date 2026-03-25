import { useState } from "react";
import { Camera } from "lucide-react";

interface ProfileImageProps {
    onImageChange?: (file: File | null) => void;
}

const ProfileImage = ({ onImageChange }: ProfileImageProps) => {
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImage(file);
            onImageChange?.(file);
        }
    };

    return (
        <div className="w-full md:w-[280px] flex flex-col items-center">
            <h1 className="text-[16px] font-Regular mb-4">الصورة الشخصية</h1>
            <div className="relative border border-gray-300 rounded-full bg-gray-500 w-[180px] h-[180px] group">
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="profileImage"
                    onChange={handleImageChange}
                />

                <label
                    htmlFor="profileImage"
                    className="cursor-pointer w-full h-full flex flex-col items-center justify-center relative rounded-full overflow-hidden"
                >
                    {profileImage ? (
                        <>
                            <img
                                src={URL.createObjectURL(profileImage)}
                                alt="الصورة الشخصية"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <div className="p-2 border-4 border-white rounded-full bg-black/20">
                                    <Camera className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center flex flex-col items-center justify-center">
                            <div className="p-2 border-4 border-[#FFFFFF] rounded-full">
                                <Camera className="w-10 h-10 text-white" />
                            </div>
                        </div>
                    )}
                </label>
            </div>
        </div>
    );
};

export default ProfileImage;