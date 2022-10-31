import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { User } from "../../store/type";

type Prepare = {
  prepareHeaders?: (
    headers: Headers,
    api: Pick<BaseQueryApi, "getState" | "endpoint" | "type" | "forced">
  ) => MaybePromise<Headers>;
};

const prepareHeaders: Prepare["prepareHeaders"] = (headers, { getState }) => {
  const token = (getState() as RootState)?.auth?.api_token;
  if (token) {
    headers.set("accept", `application/json`);
    headers.set("authorization", `Bearer ${token}`);
  }
  return headers;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    getCoaches: builder.mutation<User[], { project_id?: number }>({
      query: ({ project_id }) => ({
        method: "POST",
        url: "/api/users/search",
        body: {
          profile_id: 2,
          project_id,
        },
      }),
    }),
    getTeachers: builder.mutation<User[], { project_id?: number }>({
      query: ({ project_id }) => ({
        method: "POST",
        url: "/api/users/search",
        body: {
          profile_id: 3,
          project_id,
        },
      }),
    }),
    createCoach: builder.mutation<
      User,
      {
        project_id: number;
        name?: string;
        email: string;
        last_name?: string;
        image_url?: string;
      }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/createCoach",
        body: body,
      }),
    }),
    createTeacher: builder.mutation<
      User,
      {
        project_id: number;
        name: string;
        last_name: string;
        school_id: number;
        subject: string;
        image_url?: string;
      }
    >({
      query: ({
        project_id,
        last_name,
        name,
        school_id,
        subject,
        image_url,
      }) => ({
        method: "POST",
        url: "/api/createTeacher",
        body: {
          project_id,
          last_name,
          name,
          school_id,
          subject,
          image_url,
        },
      }),
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        method: "PUT",
        url: "/api/users",
        body,
      }),
    }),
    updatePassword: builder.mutation<
      void,
      { old_password: string; new_password: string }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/changePassword",
        body,
      }),
    }),
  }),
});

export const {
  useGetCoachesMutation,
  useGetTeachersMutation,
  useCreateTeacherMutation,
  useUpdateUserMutation,
  useCreateCoachMutation,
  useUpdatePasswordMutation,
} = api;
