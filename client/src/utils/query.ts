import {
	useQuery,
	UseQueryResult,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { getApuUrl } from "./url";
import { useNavigate } from "react-router";
import { useAuth } from "../useAuth";

interface User {
	id: number;
	email: string;
	username: string;
	image: string;
	token: string;
}

interface RegisterData {
	email: string;
	password: string;
	username: string;
	image: File | null;
}

interface LoginData {
	email: string;
	password: string;
}

interface LoginResponse {
	message: string;
	user: User;
}

const fetchData = async (url: string): Promise<any> => {
	try {
		const response = await axios.get(getApuUrl(url), {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError && error.response?.status === 404) {
			return null;
		}
		throw error;
	}
};

export const useFetchData = (url: string): UseQueryResult<any, Error> => {
	return useQuery({
		queryKey: [url],
		queryFn: () => fetchData(url),
		retry: false,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

const register = async (userData: FormData): Promise<User> => {
	try {
		const { data } = await axios.post(getApuUrl("/register"), userData, {
			withCredentials: true,
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		console.log(userData);
		return data;
	} catch (error) {
		throw error instanceof AxiosError
			? new Error(error.response?.data?.error || "Registration failed")
			: error;
	}
};

const loginUser = async (userData: LoginData): Promise<LoginResponse> => {
	try {
		const { data } = await axios.post<LoginResponse>(
			getApuUrl("/login"),
			userData,
			{
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return data;
	} catch (error) {
		throw error instanceof AxiosError
			? new Error(error.response?.data?.error || "Login failed")
			: error;
	}
};

const logout = async () => {
	try {
		const { data } = await axios.post(
			getApuUrl("/api/users/logout"),
			{},
			{ withCredentials: true }
		);
		return data;
	} catch (error) {
		throw error instanceof AxiosError
			? new Error(error.response?.data?.error || "Logout unsuccessful")
			: error;
	}
};

export const useLogoutMutation = () => {
	const navigate = useNavigate();
	const { logout: logoutContext } = useAuth();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			logoutContext();
			queryClient.clear();
			navigate("/");
		},
		onError: (error: Error) => {
			console.error("Logout error:", error);
			navigate("/account");
		},
	});
};

export const useRegisterMutation = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: register,
		onSuccess: () => {
			navigate("/login");
		},
		onError: (error: Error) => {
			console.error("Registration error:", error);
			navigate("/register");
		},
	});
};

export const useLoginMutation = () => {
	const navigate = useNavigate();
	const { login } = useAuth();

	return useMutation({
		mutationFn: loginUser,
		onSuccess: (data: LoginResponse) => {
			if (data.user) {
				login(data.user);
			}
			navigate("/fyp");
		},
		onError: (error: Error) => {
			console.error("Login error:", error);
		},
	});
};
