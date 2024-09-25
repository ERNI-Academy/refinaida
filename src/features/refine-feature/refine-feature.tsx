import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import RefineFeatureChat from "@/features/refine-feature/refine-feature-chat/refine-feature-chat";
import RefineFeatureRequirements from "@/features/refine-feature/refine-feature-requirements/refine-feature-requirements";
import { useAppStore } from "@/hooks/use-app-store";
import { useNavigate } from "react-router-dom";
import { routes } from "@/router.tsx";

const RefineFeature = () => {
  const navigate = useNavigate();

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
        <div className="w-full flex gap-4">
          <div className="w-2/4 flex justify-between">
            <Button
              className="w-2/6 bg-white text-black border border-black rounded hover:bg-black hover:text-white  transition duration-300"
              onClick={() => navigate(routes.default)}
            >
              Back
            </Button>
            <Button className="w-7/12 bg-black text-white border border-black rounded hover:bg-white hover:text-black transition duration-300">
              Send
            </Button>
          </div>
          <div className="w-2/4 flex">
            <Button
              className="w-7/12 ml-auto bg-black text-white border border-black rounded hover:bg-white hover:text-black transition duration-300"
              onClick={() => navigate(routes.backlogFeature)}
            >
              Get Requirements
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RefineFeature;
