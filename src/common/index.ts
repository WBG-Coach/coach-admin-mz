export const MenuItems = [
  {
    icon: "home-alt",
    label: "dashboard",
    route: "/",
  },
  {
    icon: "box",
    label: "projects",
    route: "/projects",
  },
  {
    icon: "puzzle-piece",
    label: "competencies",
    route: "/competencies",
  },
  {
    label: "questionnaire",
    subItems: [
      {
        icon: "clipboard-notes",
        label: "observation",
        route: "/observation-questionnaire",
      },
      {
        icon: "comments",
        label: "feedback",
        route: "/feedbacks-questionnaire",
      },
      {
        icon: "clipboard-notes",
        label: "documentation",
        route: "/documentations-questionnaire",
      },
    ],
  },
  {
    label: "school",
    subItems: [
      {
        icon: "university",
        label: "units",
        route: "/schools",
      },
      {
        icon: "user",
        label: "coaches",
        route: "/coaches",
      },
      {
        icon: "user-circle",
        label: "teachers",
        route: "/teachers",
      },
      {
        icon: "notes",
        label: "sessions",
        route: "/sessions",
      },

      {
        icon: "setting",
        label: "settings",
        route: "/settings",
      },
    ],
  },
  {
    lasts: [
      {
        icon: "signout",
        label: "logout",
      },
    ],
  },
];
