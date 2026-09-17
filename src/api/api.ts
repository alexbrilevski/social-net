import axios from "axios";
import type { User } from "../models/user";
import type { ProfileType } from "../models/profile";

const axiosInstance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "07a6853a-00ae-46be-89bd-7635822fedbc",
  },
});

type APIResponseData<T = {}> = {
  data: T,
  resultCode: number,
  messages: Array<string>,
};

type UsersResponseData = {
  items: User[],
  totalCount: number,
  error: string,
};

export const usersAPI = {
  getUsers(currentPage: number = 1, pageSize: number = 10) {
    return axiosInstance
      .get<UsersResponseData>(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data);
  },
};

type ProfileResponseData = ProfileType;

export const profileAPI = {
  getUserProfile(userId: string) {
    return axiosInstance
      .get<ProfileResponseData>(`profile/${userId}`)
      .then(response => response.data);
  },
  getUserStatus(userId: string) {
    return axiosInstance
      .get<string>(`profile/status/${userId}`)
      .then(response => response.data);
  },
  updateUserStatus(status: string) {
    return axiosInstance
      .put<APIResponseData>("profile/status", { status })
      .then(response => response.data);
  },
};

type AuthResponseData = {
    id: number,
    email: string,
    login: string,
  };

export const authAPI = {
  me() {
    return axiosInstance
      .get<APIResponseData<AuthResponseData>>("auth/me")
      .then(response => response.data);
  },
};

export const followAPI = {
  follow(userId: number) {
    return axiosInstance
      .post<APIResponseData>(`follow/${userId}`, {})
      .then(response => response.data);
  },
  unfollow(userId: number) {
    return axiosInstance
      .delete<APIResponseData>(`follow/${userId}`)
      .then(response => response.data);
  },
};
