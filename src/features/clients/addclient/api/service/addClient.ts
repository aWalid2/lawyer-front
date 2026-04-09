// import api from "@/lib/api";

// export const addClients = async (formData: FormData) => {
  
//   try {
//     const { data } = await api.post("/users/client", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return data;
//   } catch (error: any) {
//     throw error;
//   }
// };

// features/clients/api/service/addClients.ts
// features/clients/api/service/addClients.ts
import api from "@/lib/api";

export const addClients = async (data: any) => {
    console.log("=== Service Start ===");
    console.log("data:", data);
    
    const formData = new FormData();
    
    // Basic fields
    formData.append("first_name", data.first_name);
    formData.append("email", data.email);
    formData.append("nationality", data.nationality);
    formData.append("address", data.address);
    formData.append("ssn", data.ssn);
    formData.append("country", data.country);
    formData.append("phone", data.phone);
    formData.append("profile[client_type]", data.client_type);
    formData.append("profile[notes]", data.notes);
    
    // Contract fields
    if (data.has_contract) {
        if (data.contract_start_date) {
            formData.append("profile[contract][start_date]", data.contract_start_date);
        }
        if (data.contract_value) {
            formData.append("profile[contract][contract_value]", data.contract_value);
        }
        if (data.contract_duration) {
            formData.append("profile[contract][contract_duration]", data.contract_duration);
        }
    }
    
    // Account fields
    if (data.add_clients && data.password) {
        formData.append("password", data.password);
        if (data.confirmation_password) {
            formData.append("profile[account][confirmation_password]", data.confirmation_password);
        }
    }
    
    // Files - handle contract_photo
    if (data.contract_file instanceof FileList) {
        if (data.contract_file.length > 0) {
            formData.append("contract_photo", data.contract_file[0]);
        }
    } else if (data.contract_file instanceof File) {
        formData.append("contract_photo", data.contract_file);
    }
    
    // Files - handle authorization_photo
    if (data.authorization_photo instanceof FileList) {
        if (data.authorization_photo.length > 0) {
            formData.append("authorization_photo", data.authorization_photo[0]);
        }
    } else if (data.authorization_photo instanceof File) {
        formData.append("authorization_photo", data.authorization_photo);
    }
    
    // Print FormData
    console.log("=== FormData ===");
    for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
            console.log(`${pair[0]}: File(${pair[1].name}, ${pair[1].size} bytes)`);
        } else {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
    }
    
    try {
        const response = await api.post("/users/client", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Response:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("API Error:", error.response?.data);
        console.error("Error status:", error.response?.status);
        throw error;
    }
};