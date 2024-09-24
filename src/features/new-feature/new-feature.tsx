import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/hooks/use-app-store";
import { useNavigate } from "react-router-dom";

const NewFeature = () => {
  const navigate = useNavigate();
  const { setFeature } = useAppStore();

  return (
    <Container>
      <Card>
        <CardHeader className="mb-4">
          <CardTitle className="text-5xl font-semibold text-center">
            Let's refine a feature
          </CardTitle>
          <CardDescription className="text-lg text-gray-500 text-center">
            What feature does your solution need?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 items-center">
            <Input
              className="w-3/5"
              placeholder="Adding user authentication"
              onChange={(e) => setFeature(e.target.value)}
            />
            <Button className="w-2/6" onClick={() => navigate("/refine")}>
              Start refining
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewFeature;
