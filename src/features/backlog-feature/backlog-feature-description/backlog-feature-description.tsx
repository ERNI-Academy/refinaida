import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";

const BacklogFeatureDescription = () => (
  <Card className="w-2/5">
    <CardHeader>
      <CardTitle>Refine a feature</CardTitle>
      <CardDescription>What feature does your solution need?</CardDescription>
    </CardHeader>
  </Card>
);

export default BacklogFeatureDescription;
