export type User = {
  id?: number;
  name?: string;
  email?: string;
  last_name?: string;
  password?: string;
  profile_id?: number;
  created_at?: Date;
  updated_at?: Date;
  image_url?: string;
  school_id?: number;
  subject?: string;
  answers?: Answer[];
  api_token?: string;
  project?: Project;
};

export type Project = {
  id: number;
  image_url: string;
  name: string;
  country: string;
  primary_color: string;
};

export type School = {
  id?: number;
  name: string;
  image_url?: string;
  address?: string;
  project_id?: number;
  application_date?: string;
  city?: string;
  country?: string;
  district?: string;
  state?: string;
  town?: string;
  village?: string;
  created_at?: Date;
  updated_at?: Date;
  users?: { user: User }[];
};

export type Questionnaire = {
  id: number;
  title: string;
  type: "FEEDBACK" | "OBSERVATION";
  created_at: Date;
  updated_at: Date;
};

export type Note = {
  id: number;
  text: string;
  created_at: Date;
  updated_at: Date;
  questionnaire_application_id: number;
};

export type Application = {
  id: number;
  name?: string;
  status: "PENDING_FEEDBACK" | "PENDING_RESPONSE" | "PENDING_MEET" | "DONE";
  questionnaire_id: number;
  feedback_questionnaire_id: number;
  coach_id: number;
  teacher_id: number;
  created_at: Date;
  updated_at: Date;
  school_id: number;
  teacher: User;
  order?: number;
  notes: Note[];
  application_date: Date;
  questionnaire: Questionnaire;
};

export type ApplicationWithRelation = Application & {
  feedback_questionnaire: Feedback;
  teacher: User;
  coach: User;
  school: School;
};

export type Option = {
  id: number;
  question?: Question;
  question_id: number;
  selected_color: string | null;
  selected_icon: string | null;
  content_guide_id?: number;
  text: string;
};

export type Competence = {
  id: number;
  title: string;
  subtitle: string;
  matrix_id: number;
  description: string;
  content_guide_id?: number;
};

export type Question = {
  id: number;
  type: string;
  competency_id: number;
  created_at: Date;
  updated_at: Date;
  text: string;
  options: Option[];
  competence: Competence;
  last_answers?: Answer[];
};

export type QuestionnaireQuestion = {
  id: number;
  created_at: Date;
  updated_at: Date;
  question_id: number;
  questionnaire_id: number;
  questionnaire?: Questionnaire;
  competence?: Competence;
  question: Question;
};

export type Answer = {
  id?: number;
  questionnaire_question_id: number;
  notes?: string;
  option_id: number;
  option?: Option;
  files?: { url: string }[];
};

export type AnswerQuestionnaire = {
  questionnaire_application_id: number;
  latitude: number;
  longitude: number;
  answers: Answer[];
};

export type AnswerFile = {
  url: string;
  name: string;
};

export type Feedback = {
  id?: number;
  latitude?: number;
  longitude?: number;
  questionnaire_application_id?: number;
  questionnaire_application?: Application;
  competence_id?: number;
  competence?: Competence;
  answer_id: number;
  feedback_answers: {
    notes: string;
    questionnaire_question_id: number;
    questionnaire_question?: { question: Question };
  }[];
};

export type ContentGuide = {
  id: number;
  text: string;
};

export type Count = {
  quantity: number;
};

export type DashboardReport = {
  schools_qty: number;
  coaches_qty: number;
  teachers_qty: number;
  questionnaire_applications_qty: number;

  teacher_most_sessions: {
    user: User;
    quantity: number;
  };

  coach_most_sessions: {
    user: User;
    quantity: number;
  };

  competencies: {
    name: string;
    quantity: number;
  }[];
};

export type CompetencesReport = {
  name: string;
  yes: number;
  no: number;
  feedback_qty: number;
  total: number;
}[];

export type SchoolEvolutionsReport = {
  school: string;
  data: number[];
}[];

export type CompetenceEvolutionsReport = {
  name: string;
  data: {
    percentYes: number;
    percentNo: number;
    yes: number;
    no: number;
    total: number;
  }[];
}[];
export type CompetenceBySchoolReport = {
  name: string;
  yes: number;
  no: number;
  total: number;
  feedbacks_quantity: number;
}[];

export type SessionReport = {
  school?: School;
  teacher?: User;
  coach?: User;

  sessions_qty: number;
  yes_qty: number;
  no_qty: number;
  feedback_qty: number;
}[];

export type SessionByYearReport = {
  feedback_qty: number;
  sessions_qty: number;
}[];

export type TeacherCompetencesReport = {
  headers: Array<{
    order: 1;
  } | null>;
  data: {
    subtitle?: string;
    type?: "Y" | "N" | "Y_F" | "N_F";
  }[][];
};

export type TeacherEvolutionReport = {
  teachers_qty: number;
  perfect_last_sessions_qty: number;
};

export type ProductiveFeedbackReport = {
  sessions_qty: number;
  improvement_qty: number;
};
