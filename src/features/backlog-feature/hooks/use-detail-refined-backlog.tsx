import { useMemo } from "react";

import { useBacklogFeatureStore } from "@/stores/use-backlog-feature-store";

const useGetDetailRefinedFeature = () => {
  const { refinedBacklog, currentCodeRefinedStory } = useBacklogFeatureStore();

  const detailRefinedBacklog = useMemo(
    () => refinedBacklog.find((rb) => rb.code === currentCodeRefinedStory),
    [currentCodeRefinedStory, refinedBacklog]
  );

  return { detailRefinedBacklog };
};

export default useGetDetailRefinedFeature;
