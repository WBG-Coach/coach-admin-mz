import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { format } from "date-fns";
import { RootState } from "../store";
import {
  Competence,
  CompetenceEvolutionsReport,
  DashboardReport,
  Questionnaire,
  School,
  User,
} from "../store/type";

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
    login: builder.mutation<User, { email: string; password: string }>({
      query: (body) => ({
        method: "POST",
        url: "/api/authAdmin",
        body,
      }),
    }),
    getCompetencies: builder.mutation<Competence[], void>({
      query: () => ({
        method: "POST",
        url: "/api/competencies/search",
      }),
    }),
    getQuestionnaires: builder.mutation<
      Questionnaire[],
      "OBSERVATION" | "FEEDBACK"
    >({
      query: (type) => ({
        method: "POST",
        url: "/api/questionnaires/search",
        body: { type },
      }),
    }),
    getSchools: builder.mutation<School[], void>({
      query: () => ({
        method: "POST",
        url: "/api/schools/search",
        body: {},
      }),
    }),
    getCoaches: builder.mutation<User[], void>({
      query: () => ({
        method: "POST",
        url: "/api/users/search",
        body: {
          profile_id: 2,
        },
      }),
    }),
    getTeachers: builder.mutation<User[], void>({
      query: () => ({
        method: "POST",
        url: "/api/users/search",
        body: {
          profile_id: 3,
        },
      }),
    }),
    getReportDashboard: builder.mutation<
      DashboardReport,
      { start_date: Date; end_date: Date }
    >({
      query: ({ end_date, start_date }) => ({
        method: "POST",
        url: "/api/reports/dashboard",
        body: {
          start_date: format(start_date, "yyyy-MM-dd"),
          end_date: format(end_date, "yyyy-MM-dd"),
        },
      }),
    }),
    getReportCompetenceEvolutions: builder.mutation<
      CompetenceEvolutionsReport,
      number
    >({
      query: (year) => ({
        method: "POST",
        url: "/api/reports/competence_evolutions",
        body: { year },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetCompetenciesMutation,
  useGetQuestionnairesMutation,
  useGetSchoolsMutation,
  useGetCoachesMutation,
  useGetTeachersMutation,
  useGetReportDashboardMutation,
  useGetReportCompetenceEvolutionsMutation,
} = api;
