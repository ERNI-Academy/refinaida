import { useMemo } from "react";

import { useAppStore } from "@/hooks/use-app-store";

const useGetDetailRefinedFeature = () => {
  const { refinedBacklog, currentCodeRefinedStory } = useAppStore();

  const detailRefinedBacklog = useMemo(
    () => refinedBacklog.find((rb) => rb.code === currentCodeRefinedStory),
    [currentCodeRefinedStory, refinedBacklog]
  );

  return { detailRefinedBacklog };
};

export default useGetDetailRefinedFeature;
