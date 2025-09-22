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

