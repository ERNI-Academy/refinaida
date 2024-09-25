import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/hooks/use-app-store";
import BacklogFeatureList from "@/features/backlog-feature/backlog-feature-list/backlog-feature-list";
import BacklogFeatureDescription from "@/features/backlog-feature/backlog-feature-description/backlog-feature-description";

const BacklogFeature = () => {
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
        <div className="w-full">
          <span className="text-2xl font-bold text-gray-500">Backlog</span>
        </div>
        <div className="w-full flex gap-4">
          <BacklogFeatureList />
          <BacklogFeatureDescription />
        </div>
        <div className="w-full flex gap-4">
          <div className="w-3/5 flex justify-between">
            <Button className="w-5/12 bg-black text-white border border-black rounded hover:bg-white hover:text-black transition duration-300">
              Export
            </Button>
            <Button className="w-5/12 bg-black text-white border border-black rounded hover:bg-white hover:text-black transition duration-300">
              Think more
            </Button>
          </div>
          <div className="w-2/5 flex">
            <Button className="w-7/12 ml-auto bg-black text-white border border-black rounded hover:bg-white hover:text-black transition duration-300">
              Refine Requirements
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BacklogFeature;
