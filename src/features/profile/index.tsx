import { useMemo, useState } from "react";
import { useAuth } from "@/shared/context/AuthContext";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import PageLayout from "@/shared/components/PageLayout";
import Loading from "@/shared/Loading";
import ProfileForm from "./components/ProfileForm";
import ProfileImage from "./components/ProfileImage";
import { useUpdateUserProfile } from "./api/hooks/useUpdateUserProfile";
import { useUserProfile } from "./api/hooks/useUserProfile";
import type {
  UpdateProfilePayload,
  UserProfileResponse,
} from "./types/profileT";

type ProfileFormValues = {
  firstName: string;
  email: string;
  phoneNumber: string;
  civilId: string;
  nationality: string;
  address: string;
  password: string;
};

const defaultFormValues: ProfileFormValues = {
  firstName: "",
  email: "",
  phoneNumber: "",
  civilId: "",
  nationality: "",
  address: "",
  password: "",
};

const phoneCodes = [
  "+971",
  "+966",
  "+974",
  "+973",
  "+968",
  "+965",
  "+962",
  "+961",
  "+20",
];

const splitName = (firstName: string | null, lastName: string | null) => {
  const safeFirstName = firstName?.trim() ?? "";
  const safeLastName = lastName?.trim() ?? "";

  if (safeLastName || !safeFirstName.includes(" ")) {
    return {
      firstName: safeFirstName,
      lastName: safeLastName,
    };
  }

  const [firstPart, ...rest] = safeFirstName.split(/\s+/);

  return {
    firstName: firstPart ?? "",
    lastName: rest.join(" "),
  };
};

const splitPhone = (phone: string | null) => {
  if (!phone) {
    return {
      phoneNumber: "",
    };
  }

  const matchedCode = phoneCodes.find((code) => phone.startsWith(code));

  if (!matchedCode) {
    return {
      phoneNumber: phone,
    };
  }

  return {
    countryCode: matchedCode,
    phoneNumber: phone.slice(matchedCode.length),
  };
};

const mapUserToFormValues = (
  user: UserProfileResponse | undefined,
): ProfileFormValues => {
  if (!user) {
    return defaultFormValues;
  }

  const name = splitName(user.first_name, user.last_name);
  const phone = splitPhone(user.phone);


  
  return {
    firstName: name.firstName,
    email: user.email ?? "",
    phoneNumber: phone.phoneNumber,
    civilId: user.ssn ?? "",
    nationality: user.nationality ?? "",
    address: user.address ?? "",
    password: user?.password ?? "",
  };
};

const ProfileUser = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const rawUserId = user?.id ?? user?.["sub"];

  const parseUserId = (value: unknown): number => {
    const id =
      typeof value === "string" || typeof value === "number"
        ? Number(value)
        : NaN;
    return Number.isFinite(id) ? id : 2;
  };

  const effectiveUserId = parseUserId(rawUserId);

  const { data, isLoading, isError } = useUserProfile(effectiveUserId);
  const updateProfileMutation = useUpdateUserProfile(effectiveUserId);

  const initialValues = useMemo(() => mapUserToFormValues(data), [data]);

  const handleSubmit = async (values: ProfileFormValues) => {
    const payload: UpdateProfilePayload = {
      first_name: values.firstName.trim(),
      email: values.email.trim(),
      phone: `${values.phoneNumber.trim()}`,
      nationality: values.nationality.trim(),
      ssn: values.civilId.trim(),
      address: values.address.trim(),
    };

    if (values.password.trim()) {
      payload.password = values.password.trim();
    }

    try {
      await updateProfileMutation.mutateAsync(payload);
      setIsEditing(false);
    } catch {
      // Errors are handled inside the hook.
    }
  };

  const handleImageChange = () => {};

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PageLayout>
      <HeaderTitle title="المعلومات الشخصية" />

      {isError && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          تعذر تحميل بيانات المستخدم.
        </div>
      )}

      <div className="mt-10 rounded-lg border border-[#E8E8E8] p-6">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="order-1 md:order-2">
            <ProfileImage
              disabled={!isEditing}
              onImageChange={handleImageChange}
            />
          </div>

          <div className="order-2 flex-1 md:order-1">
            <ProfileForm
              initialValues={initialValues}
              isEditing={isEditing}
              isSubmitting={updateProfileMutation.isPending}
              onSubmit={handleSubmit}
              onStartEdit={() => setIsEditing(true)}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfileUser;
