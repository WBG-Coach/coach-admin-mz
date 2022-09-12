import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { format } from "date-fns";
import { RootState } from "../store";
import {
  Competence,
  CompetenceBySchoolReport,
  CompetenceEvolutionsReport,
  CompetencesReport,
  DashboardReport,
  Project,
  Questionnaire,
  School,
  SessionByYearReport,
  SessionReport,
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
    getCompetencies: builder.mutation<Competence[], { project_id: number }>({
      query: () => ({
        method: "POST",
        url: "/api/competencies/search",
      }),
    }),
    getQuestionnaires: builder.mutation<
      Questionnaire[],
      { type: "OBSERVATION" | "FEEDBACK"; project_id: number }
    >({
      query: ({ type }) => ({
        method: "POST",
        url: "/api/questionnaires/search",
        body: { type },
      }),
    }),
    getSchools: builder.mutation<School[], { project_id: number }>({
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
    getCoaches: builder.mutation<User[], { project_id: number }>({
      query: ({ project_id }) => ({
        method: "POST",
        url: "/api/users/search",
        body: {
          profile_id: 2,
          project_id,
        },
      }),
    }),
    getTeachers: builder.mutation<User[], { project_id: number }>({
      query: ({ project_id }) => ({
        method: "POST",
        url: "/api/users/search",
        body: {
          profile_id: 3,
          project_id,
        },
      }),
    }),
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
  }),
});

export const {
  useLoginMutation,
  useGetSchoolsMutation,
  useGetCoachesMutation,
  useGetTeachersMutation,
  useGetProjectsMutation,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useCreateSchoolsMutation,
  useUpdateSchoolsMutation,
  useGetCompetenciesMutation,
  useGetQuestionnairesMutation,
  useGetSessionsQuantityMutation,
  useGetReportDashboardMutation,
  useGetReportSessionPerCoachMutation,
  useGetReportSessionPerSchoolMutation,
  useGetReportSessionPerTeacherMutation,
  useGetReportCompetenciesBySchoolMutation,
  useGetReportCompetenceEvolutionsMutation,
  useGetReportCompetencesMutation,
  useGetReportSessionByYearMutation,
} = api;
