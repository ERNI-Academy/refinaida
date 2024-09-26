import { Suspense } from "react";
import { createMemoryRouter } from "react-router-dom";

import Spinner from "@/components/ui/spinner/spinner";
import { BacklogFeaturePage, NewFeaturePage, RefineFeaturePage } from "@/pages";

import { Root } from "./root";

export const routes = {
  default: "/",
  refineFeature: "/refine-feature",
  backlogFeature: "/backlog-feature",
};

export const router = createMemoryRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: routes.default,
        element: (
          <Suspense fallback={<Spinner />}>
            <NewFeaturePage />
          </Suspense>
        ),
      },
      {
        path: routes.refineFeature,
        element: (
          <Suspense fallback={<Spinner />}>
            <RefineFeaturePage />
          </Suspense>
        ),
      },
      {
        path: routes.backlogFeature,
        element: (
          <Suspense fallback={<Spinner />}>
            <BacklogFeaturePage />
          </Suspense>
        ),
      },
    ],
  },
]);
