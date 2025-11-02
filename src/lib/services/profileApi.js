import { apiClient } from "../apiClient";

function getAuthHeaders() {
	if (typeof window === "undefined") return {};
	const token = localStorage.getItem("accessToken");
	return token ? { Authorization: `Bearer ${token}` } : {};
}

export const getUserProfile = () =>
	apiClient.get("/profile/user", { headers: getAuthHeaders() });

export const updateUserProfile = (data) =>
	apiClient.patch("/profile/user", data, { headers: getAuthHeaders() });

export const getDashboardData = () =>
	apiClient.get("/profile/dashboard", { headers: getAuthHeaders() });

export const uploadResume = (formData) =>
	apiClient.post("/profile/resume", formData, { headers: getAuthHeaders() });

export function compileLatex(latex){
	return apiClient.post(
		"/compile",
		latex,
		{
			headers: { ...getAuthHeaders(), "Content-Type": "text/plain" },
			responseType: "blob",
		}
	);
}

export const enhanceResume = (payload) =>
	apiClient.post("/profile/resume/enhance", payload, { headers: getAuthHeaders() });

export const getResumeSource = () =>
	apiClient.get("/profile/resume/source", { headers: getAuthHeaders(), responseType: "text" });
