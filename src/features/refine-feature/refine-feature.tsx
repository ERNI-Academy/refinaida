import { Container } from "@/components/layout/container";
import RefineFeatureChat from "@/features/refine-feature/refine-feature-chat/refine-feature-chat";
import RefineFeatureRequirements from "@/features/refine-feature/refine-feature-requirements/refine-feature-requirements";
import { useAppStore } from "@/hooks/use-app-store";

const RefineFeature = () => {
  const { feature } = useAppStore();

  return (
    <Container size="lg">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col w-full items-center justify-center">
          <span className="text-lg font-bold text-gray-500">Feature</span>
          <span className="text-5xl text-ellipsis whitespace-nowrap w-full text-center overflow-hidden">
            {feature}
          </span>
        </div>
        <div className="w-full flex gap-4">
          <RefineFeatureChat />
          <RefineFeatureRequirements />
        </div>
      </div>
    </Container>
  );
};

export default RefineFeature;
