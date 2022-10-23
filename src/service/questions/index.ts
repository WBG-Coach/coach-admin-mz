import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import {
  Questionnaire,
  QuestionnaireQuestion,
  Question,
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
    getQuestions: builder.mutation<
      { questions: QuestionnaireQuestion[]; questionnaire: Questionnaire },
      { questionnaire_id: number }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/questionnaire-questions/search",
        body,
      }),
    }),
    createQuestion: builder.mutation<
      string,
      { competency_id: number; text: string; type: string }
    >({
      query: (questionnaire) => ({
        method: "POST",
        url: "/api/questions",
        body: { ...questionnaire },
      }),
    }),
    updateQuestion: builder.mutation<void, Partial<Question>>({
      query: (question) => ({
        method: "PUT",
        url: "/api/questions",
        body: { question },
      }),
    }),
  }),
});

export const {
  useGetQuestionsMutation,
  useUpdateQuestionMutation,
  useCreateQuestionMutation,
} = api;
