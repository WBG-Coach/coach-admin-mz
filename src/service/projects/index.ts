import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { Project } from "../../store/type";

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
    getProjects: builder.mutation<Project[], void>({
      query: () => ({
        method: "POST",
        url: "/api/projects/search",
        body: {},
      }),
    }),
    createProject: builder.mutation<void, Partial<Project>>({
      query: (body) => ({
        method: "POST",
        url: "/api/projects",
        body,
      }),
    }),
    updateProject: builder.mutation<void, Partial<Project>>({
      query: (body) => ({
        method: "PUT",
        url: "/api/projects",
        body,
      }),
    }),
  }),
});

export const {
  useGetProjectsMutation,
  useCreateProjectMutation,
  useUpdateProjectMutation,
} = api;
