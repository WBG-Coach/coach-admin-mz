import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { School } from "../../store/type";

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
    getSchools: builder.mutation<School[], { project_id?: number }>({
      query: (body) => ({
        method: "POST",
        url: "/api/schools/search",
        body,
      }),
    }),
    createSchools: builder.mutation<
      School[],
      Partial<School> & { project_id: number }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/schools",
        body,
      }),
    }),
    updateSchools: builder.mutation<
      School[],
      Partial<School> & { project_id: number }
    >({
      query: (body) => ({
        method: "PUT",
        url: "/api/schools",
        body,
      }),
    }),
  }),
});

export const {
  useCreateSchoolsMutation,
  useGetSchoolsMutation,
  useUpdateSchoolsMutation,
} = api;
