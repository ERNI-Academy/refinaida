import { createMemoryRouter } from "react-router-dom";
import { Root } from "./root";
import NewFeaturePage from "@/pages/new-feature-page";
import RefineFeaturePage from "@/pages/refine-feature-page";
import BacklogFeature from "@/features/backlog-feature/backlog-feature";

export const routes = {
  default: "/",
  refineFeature: "/refineFeature",
  backlogFeature: "/backlogFeature",
};

export const router = createMemoryRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: routes.default,
        element: <NewFeaturePage />,
      },
      {
        path: routes.refineFeature,
        element: <RefineFeaturePage />,
      },
      {
        path: routes.backlogFeature,
        element: <BacklogFeature />,
      },
    ],
  },
]);
