import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { Questionnaire } from "../../store/type";

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
    getQuestionnaires: builder.mutation<
      Questionnaire[],
      { type: "OBSERVATION" | "FEEDBACK" | "DOCUMENTATION"; project_id: number }
    >({
      query: ({ type }) => ({
        method: "POST",
        url: "/api/questionnaires/search",
        body: { type },
      }),
    }),
    createObservationQuestionnaire: builder.mutation<
      Questionnaire,
      Partial<Questionnaire> & { project_id: number }
    >({
      query: (questionnaire) => ({
        method: "POST",
        url: "/api/questionnaires",
        body: { ...questionnaire, type: "OBSERVATION" },
      }),
    }),
    updateObservationQuestionnaire: builder.mutation<
      Questionnaire,
      Partial<Questionnaire> & { project_id: number }
    >({
      query: (questionnaire) => ({
        method: "PUT",
        url: "/api/questionnaires",
        body: { ...questionnaire, type: "OBSERVATION" },
      }),
    }),
    createFeedbackQuestionnaire: builder.mutation<
      Questionnaire,
      Partial<Questionnaire> & { project_id: number }
    >({
      query: (questionnaire) => ({
        method: "POST",
        url: "/api/questionnaires",
        body: { ...questionnaire, type: "FEEDBACK" },
      }),
    }),
    updateFeedbackQuestionnaire: builder.mutation<
      Questionnaire,
      Partial<Questionnaire> & { project_id: number }
    >({
      query: (questionnaire) => ({
        method: "PUT",
        url: "/api/questionnaires",
        body: { ...questionnaire, type: "FEEDBACK" },
      }),
    }),
    createDocumentationQuestionnaire: builder.mutation<
      Questionnaire,
      Partial<Questionnaire> & { project_id: number }
    >({
      query: (questionnaire) => ({
        method: "POST",
        url: "/api/questionnaires",
        body: { ...questionnaire, type: "DOCUMENTATION" },
      }),
    }),
    updateDocumentationQuestionnaire: builder.mutation<
      Questionnaire,
      Partial<Questionnaire> & { project_id: number }
    >({
      query: (questionnaire) => ({
        method: "PUT",
        url: "/api/questionnaires",
        body: { ...questionnaire, type: "DOCUMENTATION" },
      }),
    }),
  }),
});

export const {
  useCreateDocumentationQuestionnaireMutation,
  useCreateFeedbackQuestionnaireMutation,
  useCreateObservationQuestionnaireMutation,
  useGetQuestionnairesMutation,
  useUpdateDocumentationQuestionnaireMutation,
  useUpdateFeedbackQuestionnaireMutation,
  useUpdateObservationQuestionnaireMutation,
} = api;
