import { createMemoryRouter } from "react-router-dom";
import { Root } from "./root";
import NewFeaturePage from "@/pages/new-feature-page";
import RefineFeaturePage from "@/pages/refine-feature-page";

export const routes = {
  default: "/",
  refine: "/refine",
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
        path: routes.refine,
        element: <RefineFeaturePage />,
      },
    ],
  },
]);
