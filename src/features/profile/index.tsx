import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import PageLayout from "@/components/shared/components/PageLayout";
import ProfileForm from "./components/ProfileForm";
import ProfileImage from "./components/ProfileImage";

const ProfileUser = () => {
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        countryCode: "+966",
        civilId: "",
        country: "",
        nationality: "",
        address: "",
        password: "",
    };

    const handleSubmit = (values: any) => {
        console.log("Form Values:", values);
    };

    const handleImageChange = (file: File | null) => {
        console.log("Profile Image:", file);
    };

    return (
        <PageLayout>
            <HeaderTitle title="المعلومات الشخصية" />

            <div className="border border-[#E8E8E8] rounded-lg mt-10 p-6">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* الصورة تظهر أولاً في الموبايل */}
                    <div className="order-1 md:order-2">
                        <ProfileImage onImageChange={handleImageChange} />
                    </div>
                    
                    {/* الفورم يظهر ثانياً في الموبايل */}
                    <div className="order-2 md:order-1 flex-1">
                        <ProfileForm
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default ProfileUser;