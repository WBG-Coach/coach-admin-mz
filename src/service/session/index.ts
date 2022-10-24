import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { ApplicationWithRelation } from "../../store/type";

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
    updateSession: builder.mutation<void, Partial<ApplicationWithRelation>>({
      query: (body) => ({
        method: "PUT",
        url: "/api/questionnaire-applications",
        body,
      }),
    }),
    getSessions: builder.mutation<
      ApplicationWithRelation[],
      { teacher_project_id: number }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/questionnaire-applications/search",
        body,
      }),
    }),
    createSessions: builder.mutation<
      void,
      { question_id: number; questionnaire_id: number; order?: number }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/questionnaire-questions",
        body,
      }),
    }),
  }),
});

export const {
  useCreateSessionsMutation,
  useGetSessionsMutation,
  useUpdateSessionMutation,
} = api;
