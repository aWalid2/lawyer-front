import { useMemo, useState } from "react";
import type { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import PageLayout from "@/shared/components/PageLayout";
import Loading from "@/shared/Loading";
import { useAuth } from "@/shared/context/AuthContext";
import api from "@/lib/api";
import { toast } from "sonner";
import ProfileForm from "./components/ProfileForm";
import ProfileImage from "./components/ProfileImage";

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  civilId: string;
  country: string;
  nationality: string;
  address: string;
  password: string;
};

type UserProfileResponse = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  email: string | null;
  nationality: string | null;
  country: string | null;
  ssn: string | null;
  address: string | null;
  photo: string | null;
};

type UpdateProfilePayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  nationality: string;
  country: string;
  ssn: string;
  address: string;
  password?: string;
};

const defaultFormValues: ProfileFormValues = {
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
      countryCode: defaultFormValues.countryCode,
      phoneNumber: "",
    };
  }

  const matchedCode = phoneCodes.find((code) => phone.startsWith(code));

  if (!matchedCode) {
    return {
      countryCode: defaultFormValues.countryCode,
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
    lastName: name.lastName,
    email: user.email ?? "",
    phoneNumber: phone.phoneNumber,
    countryCode: phone.countryCode,
    civilId: user.ssn ?? "",
    country: user.country ?? "",
    nationality: user.nationality ?? "",
    address: user.address ?? "",
    password: "",
  };
};

const ProfileUser = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const rawUserId = user?.id ?? user?.["sub"];
  const userId =
    typeof rawUserId === "string" || typeof rawUserId === "number"
      ? Number(rawUserId)
      : null;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile-user", userId],
    queryFn: async () => {
      const response = await api.get<UserProfileResponse>(`/users/${userId}`);
      return response.data;
    },
    enabled: Number.isFinite(userId),
    retry: 1,
  });

  const initialValues = useMemo(() => mapUserToFormValues(data), [data]);

  const updateProfileMutation = useMutation({
    mutationFn: async (values: ProfileFormValues) => {
      if (!Number.isFinite(userId)) {
        throw new Error("معرف المستخدم غير صالح");
      }

      const payload: UpdateProfilePayload = {
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim(),
        email: values.email.trim(),
        phone: `${values.countryCode}${values.phoneNumber.trim()}`,
        nationality: values.nationality.trim(),
        country: values.country.trim(),
        ssn: values.civilId.trim(),
        address: values.address.trim(),
      };

      if (values.password.trim()) {
        payload.password = values.password.trim();
      }

      const response = await api.patch(`/users/${userId}`, payload);
      return response.data;
    },
    onSuccess: async (response) => {
      toast.success(response?.message || "تم تحديث البيانات بنجاح");
      setIsEditing(false);
      await queryClient.invalidateQueries({
        queryKey: ["profile-user", userId],
      });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(
        error.response?.data?.message || "حدث خطأ أثناء تحديث البيانات",
      );
    },
  });

  const handleSubmit = async (values: ProfileFormValues) => {
    await updateProfileMutation.mutateAsync(values);
  };

  const handleImageChange = (file: File | null) => {
    console.log("Profile Image:", file);
  };

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
