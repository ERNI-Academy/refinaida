import { lazy } from "react";

export const NewFeaturePage = lazy(
  () => import("@/pages/new-feature-page/new-feature-page")
);
export const RefineFeaturePage = lazy(
  () => import("@/pages/refine-feature-page/refine-feature-page")
);
export const BacklogFeaturePage = lazy(
  () => import("@/pages/backlog-feature-page/backlog-feature-page")
);
