import { useMemo } from "react";

import { useBacklogFeatureStore } from "@/stores/use-backlog-feature-store";

const useGetDetailRefinedFeature = () => {
  const { refinedBacklog, currentCodeRefinedStorie } = useBacklogFeatureStore();

  const detailRefinedBacklog = useMemo(
    () => refinedBacklog.find((rb) => rb.code === currentCodeRefinedStorie),
    [currentCodeRefinedStorie, refinedBacklog]
  );

  return { detailRefinedBacklog };
};

export default useGetDetailRefinedFeature;
