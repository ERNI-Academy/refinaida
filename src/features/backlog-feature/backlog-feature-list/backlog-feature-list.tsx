import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";

const BacklogFeatureList = () => (
  <Card className="w-3/5">
    <CardHeader>
      <CardTitle>Refine a feature</CardTitle>
      <CardDescription>What feature does your solution need?</CardDescription>
    </CardHeader>
  </Card>
);

export default BacklogFeatureList;
