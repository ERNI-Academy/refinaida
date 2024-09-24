import { createMemoryRouter } from "react-router-dom";
import { Root } from "./root";
import NewFeaturePage from "@/pages/new-feature-page";
import RefineFeaturePage from "@/pages/refine-feature-page";

export const router = createMemoryRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <NewFeaturePage />,
      },
      {
        path: "/refine",
        element: <RefineFeaturePage />,
      },
    ],
  },
]);
