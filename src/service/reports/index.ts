import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { format } from "date-fns";
import { RootState } from "../../store";
import {
  CompetenceBySchoolReport,
  CompetenceEvolutionsReport,
  CompetencesReport,
  DashboardReport,
  ProductiveFeedbackReport,
  SchoolEvolutionsReport,
  SessionByYearReport,
  SessionReport,
  TeacherCompetencesReport,
  TeacherEvolutionReport,
} from "../../store/type";

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
    getReportDashboard: builder.mutation<
      DashboardReport,
      { start_date: Date; end_date: Date; project_id: number }
    >({
      query: ({ end_date, start_date, project_id }) => ({
        method: "POST",
        url: "/api/reports/dashboard",
        body: {
          project_id,
          start_date: format(start_date, "yyyy-MM-dd"),
          end_date: format(end_date, "yyyy-MM-dd"),
        },
      }),
    }),
    getReportCompetences: builder.mutation<
      CompetencesReport,
      { start_date: Date; end_date: Date; project_id: number }
    >({
      query: ({ end_date, start_date, project_id }) => ({
        method: "POST",
        url: "/api/reports/competences",
        body: {
          project_id,
          start_date: format(start_date, "yyyy-MM-dd"),
          end_date: format(end_date, "yyyy-MM-dd"),
        },
      }),
    }),
    getReportCompetenceEvolutions: builder.mutation<
      CompetenceEvolutionsReport,
      { year: number; project_id: number }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/reports/competence-evolutions",
        body,
      }),
    }),
    getReportSchoolEvolutions: builder.mutation<
      SchoolEvolutionsReport,
      { year: number; project_id: number }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/reports/competences-by-school-from-year",
        body,
      }),
    }),
    getReportCompetenciesBySchool: builder.mutation<
      CompetenceBySchoolReport,
      { school_id: number; project_id: number }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/reports/competences-by-school",
        body,
      }),
    }),
    getReportSessionPerSchool: builder.mutation<
      SessionReport,
      { start_date: Date; end_date: Date; project_id: number }
    >({
      query: ({ start_date, end_date, project_id }) => ({
        method: "POST",
        url: "/api/reports/sessions-by-school",
        body: {
          project_id,
          start_date: format(start_date, "yyyy-MM-dd"),
          end_date: format(end_date, "yyyy-MM-dd"),
        },
      }),
    }),
    getReportSessionPerTeacher: builder.mutation<
      SessionReport,
      { start_date: Date; end_date: Date; project_id: number }
    >({
      query: ({ start_date, end_date, project_id }) => ({
        method: "POST",
        url: "/api/reports/sessions-by-teacher",
        body: {
          project_id,
          start_date: format(start_date, "yyyy-MM-dd"),
          end_date: format(end_date, "yyyy-MM-dd"),
        },
      }),
    }),
    getReportSessionPerCoach: builder.mutation<
      SessionReport,
      { start_date: Date; end_date: Date; project_id: number }
    >({
      query: ({ start_date, end_date, project_id }) => ({
        method: "POST",
        url: "/api/reports/sessions-by-coach",
        body: {
          project_id,
          start_date: format(start_date, "yyyy-MM-dd"),
          end_date: format(end_date, "yyyy-MM-dd"),
        },
      }),
    }),
    getReportSessionByYear: builder.mutation<
      SessionByYearReport,
      { year: number; project_id: number }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/reports/sessions-by-year",
        body,
      }),
    }),
    getSessionsQuantity: builder.mutation<
      { sessions_qty: number; pending_feedback_sessions_qty: number },
      { start_date: Date; end_date: Date; project_id: number }
    >({
      query: ({ end_date, project_id, start_date }) => ({
        method: "POST",
        url: "/api/reports/sessions-qty-by-project",
        body: {
          project_id,
          start_date: format(start_date, "yyyy-MM-dd"),
          end_date: format(end_date, "yyyy-MM-dd"),
        },
      }),
    }),
    getTeacherCompetences: builder.mutation<
      TeacherCompetencesReport,
      { teacher_id: number }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/reports/teacher-competences",
        body,
      }),
    }),
    getTeacherEvolution: builder.mutation<
      TeacherEvolutionReport,
      { project_id: number }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/reports/teachers-with-perfect-last-session",
        body,
      }),
    }),
    getProductiveFeedback: builder.mutation<
      ProductiveFeedbackReport,
      { project_id: number }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/reports/improvement-by-teacher",
        body,
      }),
    }),
  }),
});

export const {
  useGetSessionsQuantityMutation,
  useGetReportDashboardMutation,
  useGetReportSessionPerCoachMutation,
  useGetReportSessionPerSchoolMutation,
  useGetReportSessionPerTeacherMutation,
  useGetReportCompetenciesBySchoolMutation,
  useGetReportCompetenceEvolutionsMutation,
  useGetReportSchoolEvolutionsMutation,
  useGetReportCompetencesMutation,
  useGetReportSessionByYearMutation,
  useGetTeacherCompetencesMutation,
  useGetProductiveFeedbackMutation,
  useGetTeacherEvolutionMutation,
} = api;
