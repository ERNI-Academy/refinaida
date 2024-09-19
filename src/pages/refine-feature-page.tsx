import { Container } from "@/components/layout/container";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppStore } from "@/hooks/use-app-store";

export const RefineFeaturePage = () => {
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
          <Card className="w-2/5">
            <CardHeader>
              <CardTitle>Refine a feature</CardTitle>
              <CardDescription>
                What feature does your solution need?
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-3/5">
            <CardHeader>
              <CardTitle>Refine a feature</CardTitle>
              <CardDescription>
                What feature does your solution need?
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </Container>
  );
};
